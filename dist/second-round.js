const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const desktop = matchMedia('(min-width: 1001px) and (min-height: 480px)');
const process = document.getElementById('processo');
const scene = process.querySelector('.process-scene');
const windowEl = process.querySelector('.process-window');
const track = process.querySelector('.process-steps');
const bar = process.querySelector('.process-progress');
const journey = process.closest('.journey');
let pinned = false, travel = 0, processVisible = false, lastProgress = -1, needsPaint = true;

function layoutProcess() {
  pinned = desktop.matches && !reduced.matches;
  process.classList.toggle('is-pinned', pinned);
  const cardWidth = track.firstElementChild.getBoundingClientRect().width;
  track.style.setProperty('--process-side', `${Math.max(0,(windowEl.clientWidth-cardWidth)/2)}px`);
  travel = Math.max(0, track.scrollWidth - windowEl.clientWidth);
  process.style.setProperty('--process-height', `${innerHeight + travel}px`);
  journey.style.setProperty('--wave-travel', pinned ? `${travel}px` : '0px');
  if (pinned) windowEl.scrollLeft = 0;
  else track.style.removeProperty('--process-x');
  lastProgress = -1;
  paintProcess();
}
function paintProcess() {
  const distance = pinned ? -process.getBoundingClientRect().top : windowEl.scrollLeft;
  const progress = travel ? Math.min(1, Math.max(0, distance / travel)) : 1;
  // Compensate only the pinned traversal. After its end the offset is constant,
  // so the decoration resumes ordinary page movement alongside About.
  journey.style.setProperty('--wave-offset', pinned ? `${Math.min(travel,Math.max(0,distance)).toFixed(2)}px` : '0px');
  if (pinned) track.style.setProperty('--process-x', `${(-progress * travel).toFixed(2)}px`);
  if (progress !== lastProgress) {
    bar.style.setProperty('--process-progress', progress.toFixed(4));
    bar.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    lastProgress = progress;
  }
  needsPaint = false;
}
new ResizeObserver(layoutProcess).observe(windowEl);
new IntersectionObserver(entries => { processVisible = entries[0].isIntersecting;needsPaint=true; }).observe(process);
window.addEventListener('scroll', () => {needsPaint=true;}, {passive:true});
desktop.addEventListener('change', layoutProcess);
reduced.addEventListener('change', layoutProcess);
window.addEventListener('resize', layoutProcess, {passive:true});
windowEl.addEventListener('keydown', event => {
  if (!pinned || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  event.preventDefault();
  let target = Math.round((+bar.getAttribute('aria-valuenow') / 100) * 3);
  if (event.key === 'ArrowRight') target++;
  if (event.key === 'ArrowLeft') target--;
  if (event.key === 'Home') target = 0;
  if (event.key === 'End') target = 3;
  const top = scrollY + process.getBoundingClientRect().top + Math.max(0,Math.min(3,target)) / 3 * travel;
  scrollTo({top,behavior:'smooth'});
});
function frame() { if (processVisible || needsPaint) paintProcess(); requestAnimationFrame(frame); }
layoutProcess();requestAnimationFrame(frame);

const badge = document.getElementById('badge-scene');
const loadBadge = new IntersectionObserver(async entries => {
  if (!entries[0].isIntersecting) return;
  loadBadge.disconnect();
  try {
    await document.fonts.ready;
    const {createBadge} = await import('./badge-3d.js?v=20261030-round6');
    await createBadge(badge);
  } catch (error) {
    badge.dataset.state = 'fallback';
    badge.querySelector('.badge-handle').hidden=true;
    document.getElementById('badge-help').textContent='Julia Maschietto · Estratégia, conteúdo e direção criativa';
    console.warn('Crachá: exibindo alternativa estática.',error.message);
  }
}, {rootMargin:'350px'});
loadBadge.observe(badge);
