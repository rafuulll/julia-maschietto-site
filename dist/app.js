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
      const stops = [toggle, ...$$('a', menu)];
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
  $$('[data-open-case]').forEach(button => button.addEventListener('click', () => openDialog($('#case-dialog'), button)));
  $$('[data-contact]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    if (menuOpen) setMenu(false, false);
    const message = link.dataset.service
      ? `Olá, Julia! Quero conversar sobre ${link.dataset.service.toLocaleLowerCase('pt-BR')} para a minha marca.`
      : config.defaultMessage || 'Olá, Julia! Quero conversar sobre um projeto para a minha marca.';
    const phone = String(config.whatsapp || '').replace(/\D/g, '');
    if (config.demo === false && /^\d{10,15}$/.test(phone)) {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      return;
    }
    $('#contact-message').value = message;
    $('.copy-status').textContent = '';
    openDialog($('#contact-dialog'), link);
  }));
  $('#copy-message').addEventListener('click', async () => {
    const field = $('#contact-message');
    try {
      await navigator.clipboard.writeText(field.value);
      $('.copy-status').textContent = 'Mensagem copiada. Nenhuma mensagem foi enviada.';
    } catch {
      field.focus(); field.select();
      $('.copy-status').textContent = 'Selecione e copie a mensagem com Ctrl+C ou pelo menu do seu celular.';
    }
  });

  const books = {
    leticia: { image: 'leticia-book.webp', name: 'Estratégia de marca', description: 'Negócio, posicionamento e comunicação para uma consultora de branding e estilo.', credit: 'Alinhamento visual do book: Larissa Gomes.', alt: 'Capa do book de estratégia de marca de Leticia Isse.' },
    nathalia: { image: 'nathalia-book.webp', name: 'Posicionamento e conteúdo', description: 'Uma direção de marca traduzida em seis pilares editoriais e rituais de conteúdo para Dra. Nathalia.', credit: 'Recorte do material de estratégia fornecido por Julia.', alt: 'Capa da estratégia de marca desenvolvida para Dra. Nathalia.' },
    novo: { image: 'novo-cover.webp', name: 'Narrativa comercial B2B', description: '“Da questão à nota”: uma apresentação que organiza a proposta e o funcionamento de uma operação de avaliações escolares.', credit: 'Conceito e apresentação comercial: Julia Maschietto.', alt: 'Capa da apresentação comercial Novo Método.' }
  };
  let currentBook = books.leticia;
  const tabs = $$('[data-book]');
  function selectBook(tab) {
    currentBook = books[tab.dataset.book];
    tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
    $('#book-name').textContent = currentBook.name;
    $('#book-description').textContent = currentBook.description;
    $('#book-credit').textContent = currentBook.credit;
    $('#book-panel').setAttribute('aria-labelledby', tab.id);
    $('#book-image').src = `assets/${currentBook.image}`;
    $('#book-image').alt = currentBook.alt;
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
  $('[data-enlarge-book]').addEventListener('click', event => {
    const image = $('#image-dialog img');
    image.src = `assets/${currentBook.image}`;
    image.alt = currentBook.alt;
    openDialog($('#image-dialog'), event.currentTarget);
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
  new IntersectionObserver(entries => { conceptVisible = entries[0].isIntersecting; }).observe(concept);

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
    $$('.project[data-preview]').forEach(project => {
      const summary = $('summary', project);
      summary.addEventListener('pointerenter', event => {
        if (project.open) return;
        $('img', preview).src = project.dataset.preview;
        pointerX = event.clientX; pointerY = event.clientY;
        previewX = pointerX + 25; previewY = pointerY - 130;
        previewShown = true;
        preview.classList.add('is-visible');
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
    if (videoVisible && !document.hidden && !userPaused) {
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

  function frame(time) {
    if (!reduced.matches) lenis?.raf(time);
    if (videoVisible) nav.classList.toggle('over-footer', $('#contato').getBoundingClientRect().top < 90);
    if (conceptVisible && conceptWords.length && !reduced.matches) {
      const rect = concept.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (innerHeight * 0.85 - rect.top) / (innerHeight * 0.6)));
      conceptWords.forEach((word, i) => { word.style.opacity = String(0.55 + 0.45 * Math.min(1, Math.max(0, progress * conceptWords.length - i))); });
      pills.forEach((pill, i) => { pill.style.setProperty('--dy', `${(progress - 0.5) * (i % 2 ? -18 : 18)}px`); });
    }
    if (previewShown) {
      const targetX = Math.min(innerWidth - 225, Math.max(15, pointerX + 30));
      const targetY = Math.min(innerHeight - 275, Math.max(15, pointerY - 130));
      previewX += (targetX - previewX) * 0.15;
      previewY += (targetY - previewY) * 0.15;
      preview.style.transform = `translate3d(${previewX}px,${previewY}px,0) rotate(${Math.max(-4, Math.min(4, (targetX - previewX) * 0.03))}deg)`;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
