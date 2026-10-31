(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const config = window.JULIA_SITE || { demo: true };
  const nav = $('#site-nav');
  const menu = $('#mobile-menu');
  const toggle = $('.menu-toggle');
  const main = $('main');
  let menuOpen = false;
  let dialogOrigin = null;
  let activeNav = $('.desktop-nav a');
  let appFrame = 0;
  const lenis = !reduced.matches && fine.matches && window.Lenis
    ? new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true }) : null;

  function syncScrollLock() {
    const locked = menuOpen || !!$('dialog[open]');
    document.body.classList.toggle('dialog-open', !!$('dialog[open]'));
    if (locked) lenis?.stop(); else lenis?.start();
  }
  function setMenu(open, restore = true) {
    menuOpen = open;
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', open);
    main.inert = open;
    $('.floating-contact').inert = open;
    syncScrollLock();
    if (open) $('a', menu).focus(); else if (restore) toggle.focus();
  }
  toggle.addEventListener('click', () => setMenu(!menuOpen));
  $$('a', menu).forEach(link => link.addEventListener('click', () => setMenu(false, false)));
  document.addEventListener('keydown', event => {
    if (!menuOpen) return;
    if (event.key === 'Escape') setMenu(false);
    if (event.key === 'Tab') {
      const stops = [$('.nav-contact', nav), toggle, ...$$('a', menu)];
      const index = stops.indexOf(document.activeElement);
      if (event.shiftKey && index === 0) { event.preventDefault(); stops.at(-1).focus(); }
      else if (!event.shiftKey && index === stops.length - 1) { event.preventDefault(); toggle.focus(); }
    }
  });
  matchMedia('(min-width: 761px)').addEventListener('change', e => { if (e.matches && menuOpen) setMenu(false, false); });

  function openDialog(dialog, origin = document.activeElement) {
    $$('dialog[open]').forEach(item => item.close());
    dialogOrigin = origin;
    dialog.showModal();
    syncScrollLock();
  }
  $$('dialog').forEach(dialog => {
    $$('[data-close-dialog]', dialog).forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', e => {
      if (e.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      syncScrollLock();
      if (!$('dialog[open]') && dialogOrigin?.isConnected) dialogOrigin.focus({ preventScroll: true });
    });
  });
  // Native contact links remain usable even when JavaScript is unavailable.
  $$('a[data-contact]').forEach(link => {
    const phone = String(config.whatsapp || '').replace(/\D/g, '');
    if (!/^\d{10,15}$/.test(phone)) return;
    const message = link.dataset.service
      ? `Olá, Julia! Vim pelo seu site e quero conversar sobre ${link.dataset.service.toLocaleLowerCase('pt-BR')} para a minha marca.`
      : config.defaultMessage;
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.addEventListener('click', () => { if (menuOpen) setMenu(false, false); });
  });

  const books = {
    leticia: { image: 'leticia-book.webp', video: 'leticia-book-video-final.mp4', name: 'Estratégia de marca', description: 'Negócio, posicionamento e comunicação para uma consultora de branding e estilo.', credit: 'Alinhamento visual do book: Larissa Gomes.', alt: 'Capa do book de estratégia de marca de Leticia Isse.' },
    nathalia: { image: 'nathalia-book.webp', video: 'nathalia-book-video-final.mp4', name: 'Posicionamento e conteúdo', description: 'Uma direção de marca traduzida em seis pilares editoriais e rituais de conteúdo para Dra. Nathalia.', credit: 'Recorte do material de estratégia fornecido por Julia.', alt: 'Capa da estratégia de marca desenvolvida para Dra. Nathalia.' },
    novo: { image: 'novo-cover.webp', video: 'novo-book-video-final.mp4', name: 'Narrativa comercial B2B', description: '“Da questão à nota”: uma apresentação que organiza a proposta e o funcionamento de uma operação de avaliações escolares.', credit: 'Conceito e apresentação comercial: Julia Maschietto.', alt: 'Capa da apresentação comercial Novo Método.' }
  };
  let currentBook = books.leticia;
  const tabs = $$('[data-book]');
  const bookVideo = $('#book-video');
  const bookPause = $('[data-pause-book]');
  let bookVisible = false;
  let bookPaused = false;
  function syncBookVideo() {
    if (bookVisible && !bookPaused && !document.hidden && !reduced.matches && !$('dialog[open]')) {
      bookVideo.muted = true;
      bookVideo.play().then(() => { bookVideo.hidden = false; bookPause.hidden = false; }).catch(() => { bookVideo.hidden = true; bookPause.hidden = true; });
    } else bookVideo.pause();
  }
  new IntersectionObserver(entries => {
    bookVisible = entries[0].isIntersecting;
    syncBookVideo();
  }, { threshold: .15 }).observe($('#book-panel'));
  bookVideo.addEventListener('error', () => { bookVideo.hidden = true; bookPause.hidden = true; });
  bookPause.hidden = reduced.matches;
  bookPause.addEventListener('click', () => {
    bookPaused = !bookPaused;
    bookPause.setAttribute('aria-pressed', String(bookPaused));
    bookPause.textContent = bookPaused ? 'Retomar prévia' : 'Pausar prévia';
    syncBookVideo();
  });
  document.addEventListener('visibilitychange', syncBookVideo);
  reduced.addEventListener('change', () => { bookPause.hidden = reduced.matches; syncBookVideo(); });
  $$('dialog').forEach(dialog => dialog.addEventListener('toggle', syncBookVideo));
  function selectBook(tab) {
    bookPaused = false;
    bookPause.hidden = reduced.matches;
    bookPause.setAttribute('aria-pressed', 'false');
    bookPause.textContent = 'Pausar prévia';
    currentBook = books[tab.dataset.book];
    tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
    $('#book-name').textContent = currentBook.name;
    $('#book-description').textContent = currentBook.description;
    $('#book-credit').textContent = currentBook.credit;
    $('#book-panel').setAttribute('aria-labelledby', tab.id);
    $('#book-image').src = `assets/${currentBook.image}`;
    $('#book-image').alt = currentBook.alt;
    bookVideo.pause();
    bookVideo.hidden = true;
    bookVideo.src = `assets/${currentBook.video}`;
    bookVideo.setAttribute('aria-label', `Prévia em vídeo: ${currentBook.name}.`);
    syncBookVideo();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectBook(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectBook(tabs[next]); tabs[next].focus(); }
    });
  });
  const mediaDialog = $('#image-dialog');
  const expandedVideo = $('#expanded-video');
  const expandedPause = $('[data-pause-expanded]');
  function prepareImage(src, alt) {
    expandedVideo.pause();
    expandedVideo.hidden = true;
    expandedPause.hidden = true;
    const image = $('#image-dialog img');
    image.hidden = false;
    image.src = src;
    image.alt = alt;
  }
  $('[data-enlarge-book]').addEventListener('click', event => {
    prepareImage(`assets/${currentBook.image}`, currentBook.alt);
    openDialog(mediaDialog, event.currentTarget);
    if (!reduced.matches) {
      $('#image-dialog img').hidden = true;
      expandedVideo.src = `assets/${currentBook.video}`;
      expandedVideo.muted = true;
      expandedVideo.hidden = false;
      expandedPause.hidden = false;
      expandedPause.textContent = 'Pausar prévia';
      expandedVideo.play().catch(() => prepareImage(`assets/${currentBook.image}`, currentBook.alt));
    }
  });
  expandedPause.addEventListener('click', () => {
    if (expandedVideo.paused) { expandedVideo.play().catch(() => {}); expandedPause.textContent = 'Pausar prévia'; }
    else { expandedVideo.pause(); expandedPause.textContent = 'Retomar prévia'; }
  });
  mediaDialog.addEventListener('close', () => { expandedVideo.pause(); syncBookVideo(); });
  $$('[data-open-media]').forEach(button => button.addEventListener('click', () => {
    prepareImage(button.dataset.openMedia, button.dataset.mediaAlt);
    openDialog(mediaDialog, button);
  }));
  $$('.case-media-item video').forEach(video => {
    new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) video.pause();
    }).observe(video);
    video.closest('details')?.addEventListener('toggle', event => {
      if (!event.target.open) video.pause();
      else if (video.dataset.poster && !video.poster) video.poster=video.dataset.poster;
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
  });

  // Split only text nodes so emphasis, breaks and accessible heading names survive.
  function wrapWords(element, className, inner = false) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let index = 0;
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(token => {
        if (!token || /^\s+$/.test(token)) { fragment.append(token); return; }
        const span = document.createElement('span');
        span.className = className;
        span.style.setProperty('--word', index++);
        if (inner) { const content = document.createElement('span'); content.className = 'split-word-inner'; content.textContent = token; span.append(content); }
        else span.textContent = token;
        fragment.append(span);
      });
      node.replaceWith(fragment);
    });
  }
  if (!reduced.matches) {
    document.body.classList.add('motion-enabled');
    $$('[data-split]').forEach(element => wrapWords(element, 'split-word', true));
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      if (entry.target.matches('[data-split]')) entry.target.classList.add('split-animate');
      $$('[data-split]', entry.target).forEach(item => item.classList.add('split-animate'));
      revealObserver.unobserve(entry.target);
    }), { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    $$('.reveal').forEach(element => { element.classList.add('will-reveal'); revealObserver.observe(element); });
    requestAnimationFrame(() => $('#hero-title').classList.add('split-animate'));
    revealObserver.observe($('#closing-title'));
    wrapWords($('#concept-title'), 'concept-word');
  }
  const concept = $('#conceito');
  const conceptWords = $$('.concept-word');
  const pills = $$('.concept-pill');
  let conceptVisible = false;
  let litWords = -1;
  let lastTagPassage = NaN;
  let lastTagWidth = 0;
  new IntersectionObserver(entries => {
    conceptVisible = entries[0].isIntersecting;
    concept.classList.toggle('is-in-view', conceptVisible);
    requestFrame();
  }).observe(concept);

  const navLinks = $$('.desktop-nav a');
  const navPill = $('.nav-pill');
  function positionPill(link) {
    if (!link || !navPill) return;
    navPill.style.opacity = '1';
    navPill.style.transformOrigin = 'left center';
    navPill.style.transform = `translateX(${link.offsetLeft}px) scaleX(${link.offsetWidth / 100})`;
  }
  navLinks.forEach(link => {
    link.addEventListener('pointerenter', () => positionPill(link));
    link.addEventListener('focus', () => positionPill(link));
  });
  $('.desktop-nav').addEventListener('pointerleave', () => positionPill(activeNav));
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { activeNav = navLinks.find(link => link.hash === `#${entry.target.id}`); positionPill(activeNav); }
  }), { rootMargin: '-20% 0px -60% 0px' });
  ['servicos', 'projetos', 'sobre'].forEach(id => sectionObserver.observe(document.getElementById(id)));
  document.fonts.ready.then(() => positionPill(activeNav));
  window.addEventListener('resize', () => positionPill(activeNav), { passive: true });
  new IntersectionObserver(entries => entries.forEach(entry => {
    nav.classList.toggle('on-image', entry.isIntersecting);
    document.body.classList.toggle('hero-in-view', entry.isIntersecting);
  }), { rootMargin: '-60px 0px -65% 0px' }).observe($('#inicio'));

  const preview = $('.hover-preview');
  let previewShown = false;
  let pointerX = 0, pointerY = 0, previewX = 0, previewY = 0;
  if (fine.matches && !reduced.matches) {
    $$('.project').forEach(project => {
      const summary = $('summary', project);
      summary.addEventListener('pointerenter', event => {
        if (project.open) return;
        const hasImage = !!project.dataset.preview;
        preview.classList.toggle('is-text-preview', !hasImage);
        if (hasImage) $('img', preview).src = project.dataset.preview;
        $('.preview-name', preview).textContent = $('.project-name', project).firstChild.textContent;
        $('.preview-result', preview).textContent = $('.project-result strong', project).textContent;
        $('.preview-note', preview).textContent = project.dataset.previewNote || '';
        pointerX = event.clientX; pointerY = event.clientY;
        previewX = pointerX + 25; previewY = pointerY - 130;
        previewShown = true;
        preview.classList.add('is-visible');
        requestFrame();
      });
      summary.addEventListener('pointermove', e => { pointerX = e.clientX; pointerY = e.clientY; });
      summary.addEventListener('pointerleave', hidePreview);
      project.addEventListener('toggle', hidePreview);
    });
  }
  function hidePreview() { previewShown = false; preview.classList.remove('is-visible'); }
  window.addEventListener('blur', hidePreview);

  const video = $('#footer-video');
  const videoButton = $('#video-toggle');
  let videoVisible = false;
  let userPaused = reduced.matches;
  function syncVideo() {
    if (videoVisible && video.dataset.poster && !video.poster) video.poster=video.dataset.poster;
    if (videoVisible && !document.hidden && !userPaused && !$('dialog[open]')) {
      if (!video.getAttribute('src')) video.src = video.dataset.video;
      video.play().catch(() => { userPaused = true; updateVideoButton(); });
    } else video.pause();
    updateVideoButton();
  }
  function updateVideoButton() {
    videoButton.setAttribute('aria-pressed', String(userPaused));
    $('span:last-child', videoButton).textContent = userPaused ? 'Reproduzir vídeo' : 'Pausar vídeo';
    $('.icon', videoButton).className = `icon ${userPaused ? 'i-play' : 'i-pause'}`;
  }
  $$('dialog').forEach(dialog => dialog.addEventListener('toggle', syncVideo));
  video.addEventListener('error', () => { videoButton.hidden = true; });
  videoButton.addEventListener('click', () => { userPaused = !userPaused; syncVideo(); });
  new IntersectionObserver(entries => {
    videoVisible = entries[0].isIntersecting;
    document.body.classList.toggle('closing-in-view', videoVisible);
    nav.classList.toggle('over-footer', videoVisible && $('#contato').getBoundingClientRect().top < 90);
    syncVideo();
  }, { threshold: [0, 0.1, 0.5, 0.9] }).observe($('#contato'));
  document.addEventListener('visibilitychange', syncVideo);
  reduced.addEventListener('change', () => { if (reduced.matches) { userPaused = true; document.body.classList.remove('motion-enabled'); lenis?.destroy(); syncVideo(); } });
  $('#year').textContent = String(new Date().getFullYear());

  function requestFrame() {
    if (!appFrame && !document.hidden) appFrame = requestAnimationFrame(frame);
  }
  function frame(time) {
    appFrame = 0;
    if (!reduced.matches) lenis?.raf(time);
    if (videoVisible) nav.classList.toggle('over-footer', $('#contato').getBoundingClientRect().top < 90);
    if (conceptVisible && conceptWords.length && !reduced.matches && !document.hidden) {
      const rect = concept.getBoundingClientRect();
      const passage = (innerHeight - rect.top) / (innerHeight + rect.height);
      const progress = Math.min(1, Math.max(0, (passage - 0.12) / 0.42));
      const count = Math.min(conceptWords.length, Math.round(progress * (conceptWords.length + 2)));
      if (count !== litWords) {
        conceptWords.forEach((word, i) => word.classList.toggle('on', i < count));
        litWords = count;
      }
      if (!Number.isFinite(lastTagPassage) || Math.abs(passage - lastTagPassage) > .0001 || lastTagWidth !== innerWidth) {
        const compactTags = innerWidth <= 1000;
        const clamp = value => Math.min(1, Math.max(0, value));
        pills.forEach((pill, i) => {
          const delayed = i > 1;
          const entry = clamp((passage - (delayed ? .28 : .16)) / (delayed ? .30 : .32));
          const eased = 1 - Math.pow(1 - entry, 3);
          const side = i % 2 ? 1 : -1;
          const travel = compactTags ? 22 : 62;
          const x = side * ((1 - eased) * travel + entry * (delayed ? 3 : 8));
          const y = (1 - eased) * (compactTags ? 22 : delayed ? 58 : 40) - entry * (compactTags ? 5 : delayed ? 12 : 22);
          const angle = side * ((1 - eased) * 7 + entry * 1.5);
          pill.style.setProperty('--dx', `${x.toFixed(2)}px`);
          pill.style.setProperty('--dy', `${y.toFixed(2)}px`);
          pill.style.setProperty('--drift-rot', `${angle.toFixed(2)}deg`);
          pill.style.setProperty('--tag-opacity', clamp(entry * 3).toFixed(3));
        });
        lastTagPassage = passage;
        lastTagWidth = innerWidth;
      }
    }
    if (previewShown) {
      const targetX = Math.min(innerWidth - 225, Math.max(15, pointerX + 30));
      const targetY = Math.min(innerHeight - 275, Math.max(15, pointerY - 130));
      previewX += (targetX - previewX) * 0.15;
      previewY += (targetY - previewY) * 0.15;
      preview.style.transform = `translate3d(${previewX}px,${previewY}px,0) rotate(${Math.max(-4, Math.min(4, (targetX - previewX) * 0.03))}deg)`;
    }
    if (lenis?.isScrolling || previewShown) requestFrame();
  }
  ['scroll', 'resize', 'wheel'].forEach(type => window.addEventListener(type, requestFrame, { passive: true }));
  ['click', 'keydown'].forEach(type => document.addEventListener(type, requestFrame, { passive: true }));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(appFrame); appFrame = 0; expandedVideo.pause(); }
    else requestFrame();
  });
  requestFrame();
})();
