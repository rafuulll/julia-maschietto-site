"""One-time removal of demo paths and event-driven animation scheduling."""
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
p=ROOT/'dist/app.js';s=p.read_text(encoding='utf-8')
start=s.index("  $$('[data-contact]')")
end=s.index('\n  const books =',start)
s=s[:start]+'''  // Native contact links remain usable even when JavaScript is unavailable.
  $$('a[data-contact]').forEach(link => {
    const phone = String(config.whatsapp || '').replace(/\\D/g, '');
    if (!/^\\d{10,15}$/.test(phone)) return;
    const message = link.dataset.service
      ? `Olá, Julia! Vim pelo seu site e quero conversar sobre ${link.dataset.service.toLocaleLowerCase('pt-BR')} para a minha marca.`
      : config.defaultMessage;
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.addEventListener('click', () => { if (menuOpen) setMenu(false, false); });
  });
''' + s[end:]
s=s.replace("let activeNav = $('.desktop-nav a');","let activeNav = $('.desktop-nav a');\n  let appFrame = 0;")
s=s.replace("const stops = [toggle, ...$$('a', menu)];","const stops = [$('.nav-contact', nav), toggle, ...$$('a', menu)];")
s=s.replace('-book-video-v10.mp4','-book-video-final.mp4')
s=s.replace('  let conceptTime = 0;\n  let lastFrameTime = 0;\n','')
s=s.replace("concept.classList.toggle('is-in-view', conceptVisible);","concept.classList.toggle('is-in-view', conceptVisible);\n    requestFrame();")
s=s.replace("preview.classList.add('is-visible');","preview.classList.add('is-visible');\n        requestFrame();")
s=s.replace("  function frame(time) {\n    const delta = lastFrameTime ? Math.min(64, time - lastFrameTime) : 0;\n    lastFrameTime = time;","  function requestFrame() {\n    if (!appFrame && !document.hidden) appFrame = requestAnimationFrame(frame);\n  }\n  function frame(time) {\n    appFrame = 0;")
s=s.replace("    requestAnimationFrame(frame);\n  }\n  requestAnimationFrame(frame);","    if (lenis?.isScrolling || previewShown) requestFrame();\n  }\n  ['scroll', 'resize', 'wheel'].forEach(type => window.addEventListener(type, requestFrame, { passive: true }));\n  ['click', 'keydown'].forEach(type => document.addEventListener(type, requestFrame, { passive: true }));\n  document.addEventListener('visibilitychange', () => {\n    if (document.hidden) { cancelAnimationFrame(appFrame); appFrame = 0; expandedVideo.pause(); }\n    else requestFrame();\n  });\n  requestFrame();")
s=s.replace("if (videoVisible && !document.hidden && !userPaused) {","if (videoVisible && !document.hidden && !userPaused && !$('dialog[open]')) {")
s=s.replace("  videoButton.addEventListener('click',", "  $$('dialog').forEach(dialog => dialog.addEventListener('toggle', syncVideo));\n  video.addEventListener('error', () => { videoButton.hidden = true; });\n  videoButton.addEventListener('click',")
s=s.replace("  bookPause.hidden = reduced.matches;","  bookVideo.addEventListener('error', () => { bookVideo.hidden = true; bookPause.hidden = true; });\n  bookPause.hidden = reduced.matches;")
s=s.replace("  function selectBook(tab) {\n    currentBook", "  function selectBook(tab) {\n    bookPaused = false;\n    bookPause.hidden = reduced.matches;\n    bookPause.setAttribute('aria-pressed', 'false');\n    bookPause.textContent = 'Pausar prévia';\n    currentBook")
p.write_text(s,encoding='utf-8')
p=ROOT/'dist/second-round.js';s=p.read_text(encoding='utf-8')
s=s.replace('needsPaint = true;','needsPaint = true, paintFrame = 0;',1)
s=s.replace('processVisible = entries[0].isIntersecting;needsPaint=true;','processVisible = entries[0].isIntersecting;needsPaint=true;requestPaint();')
s=s.replace("window.addEventListener('scroll', () => {needsPaint=true;},", "window.addEventListener('scroll', () => {needsPaint=true;requestPaint();},")
s=s.replace('function frame() { if (processVisible || needsPaint) paintProcess(); requestAnimationFrame(frame); }\nlayoutProcess();requestAnimationFrame(frame);','''function requestPaint() {
  if (!paintFrame && !document.hidden) paintFrame=requestAnimationFrame(() => {
    paintFrame=0;
    if (processVisible || needsPaint) paintProcess();
  });
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { cancelAnimationFrame(paintFrame);paintFrame=0; }
  else requestPaint();
});
layoutProcess();requestPaint();''')
s=s.replace("  loadBadge.disconnect();\n  try {", """  loadBadge.disconnect();
  if (reduced.matches || navigator.connection?.saveData) {
    badge.dataset.state='fallback';
    document.getElementById('badge-help').textContent='Julia Maschietto · Estratégia, conteúdo e direção criativa';
    return;
  }
  try {""")
s=s.replace('badge-3d.js?v=20261030-round6','badge-3d.js?v=final-20261031')
p.write_text(s,encoding='utf-8')
print('Native contacts, robust menu focus and demand-driven animation frames prepared.')
