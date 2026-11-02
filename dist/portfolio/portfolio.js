/* Native navigation and progressive media for the separate portfolio surface. */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('#mobile-menu');
 let previousFocus;
 function lockContent(locked){document.querySelector('main').inert=locked;document.querySelector('.floating-contact').inert=locked;}
 function closeMenu(){menu.hidden=true;document.body.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');lockContent(false);}
 toggle.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;document.body.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');lockContent(open);if(open)menu.querySelector('a').focus();});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 addEventListener('resize',()=>{if(innerWidth>1000)closeMenu();},{passive:true});
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&!menu.hidden){closeMenu();toggle.focus();}
  if(e.key==='Tab'&&!menu.hidden){const nodes=[...document.querySelectorAll('.site-nav a,.site-nav button,#mobile-menu a')].filter(x=>x.getClientRects().length);const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
 });
 const dialog=document.querySelector('.portfolio-dialog'),image=dialog.querySelector('img'),video=dialog.querySelector('video');
 function closeDialog(){dialog.close();}
 document.querySelectorAll('[data-zoom]').forEach(link=>link.addEventListener('click',e=>{
  if(!dialog.showModal)return;
  e.preventDefault();previousFocus=link;
  const isVideo=link.hasAttribute('data-video');image.hidden=isVideo;video.hidden=!isVideo;
  if(isVideo){video.src=link.href;if(!reduced.matches)video.play().catch(()=>{});}
  else{image.src=link.href;image.alt=link.querySelector('img')?.alt||link.dataset.alt||'Imagem do projeto';}
  dialog.showModal();previews.forEach(updatePreview);document.body.classList.add('dialog-open');dialog.querySelector('button').focus();
 }));
 dialog.querySelector('button').addEventListener('click',closeDialog);
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)closeDialog();});
 dialog.addEventListener('close',()=>{video.pause();video.removeAttribute('src');video.load();document.body.classList.remove('dialog-open');previousFocus?.focus({preventScroll:true});previews.forEach(updatePreview);});
 const previews=[...document.querySelectorAll('[data-preview]')];
 async function updatePreview(host){
  const movie=host.querySelector('video'),poster=host.querySelector('.notebook-screen>img'),button=host.querySelector('.preview-pause');
  const shouldPlay=host.dataset.visible==='true'&&!document.hidden&&!dialog.open&&!reduced.matches&&!navigator.connection?.saveData&&host.dataset.paused!=='true';
  if(!shouldPlay){movie.pause();return;}
  if(!movie.src)movie.src=movie.dataset.src;
  try{await movie.play();if(host.dataset.visible==='true'&&!document.hidden&&!reduced.matches){movie.hidden=false;poster.hidden=true;button.hidden=false;}else movie.pause();}catch{movie.hidden=true;poster.hidden=false;button.hidden=true;}
 }
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.dataset.visible=String(entry.isIntersecting);updatePreview(entry.target);}),{threshold:.2});
 previews.forEach(host=>{observer.observe(host);host.querySelector('.preview-pause').addEventListener('click',()=>{const paused=host.dataset.paused!=='true';host.dataset.paused=String(paused);const button=host.querySelector('.preview-pause');button.setAttribute('aria-pressed',String(paused));button.textContent=paused?'Retomar prévia':'Pausar prévia';updatePreview(host);});});
 document.addEventListener('visibilitychange',()=>{previews.forEach(updatePreview);if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause());});
 reduced.addEventListener('change',()=>{previews.forEach(host=>{if(reduced.matches){host.querySelector('video').hidden=true;host.querySelector('.notebook-screen>img').hidden=false;host.querySelector('.preview-pause').hidden=true;}updatePreview(host);});});
 const badge=document.getElementById('badge-scene');
 if(badge){const badgeObserver=new IntersectionObserver(async entries=>{
  if(!entries[0].isIntersecting)return;badgeObserver.disconnect();
  const fallback=()=>{badge.dataset.state='fallback';badge.querySelector('.badge-handle').hidden=true;document.getElementById('badge-help').textContent='Julia Maschietto · Estratégia, conteúdo e direção criativa';};
  if(reduced.matches||navigator.connection?.saveData){fallback();return;}
  try{await document.fonts.ready;const {createBadge}=await import('/badge-3d.js?v=final-20261031');await createBadge(badge);}catch{fallback();}
 },{rootMargin:'200px'});badgeObserver.observe(badge);}
})();
