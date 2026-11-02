/* Clarity is loaded only after an explicit visitor choice. */
(() => {
  const projectId = 'z7jn58ca4k';
  const storageKey = 'julia_analytics_consent_v1';
  let memoryChoice = null;
  let started = false;
  function readChoice() {
    try { return localStorage.getItem(storageKey) || memoryChoice; }
    catch { return memoryChoice; }
  }
  function saveChoice(value) {
    memoryChoice = value;
    try { localStorage.setItem(storageKey, value); } catch { /* The choice applies to this page only. */ }
  }
  function startClarity() {
    if (started || readChoice() !== 'accepted') return;
    started = true;
    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
    window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.clarity.ms/tag/' + projectId;
    document.head.appendChild(tag);
  }
  const box = document.createElement('section');
  box.className = 'analytics-consent';
  box.setAttribute('aria-label', 'Preferências de análise');
  box.hidden = true;
  box.innerHTML = '<h2>Análise de uso</h2><p>Com sua permissão, usamos o Microsoft Clarity para analisar cliques, rolagem e gravações de navegação e melhorar o site. Você pode alterar sua escolha no rodapé. <a href="https://privacy.microsoft.com/pt-br/privacystatement" target="_blank" rel="noopener noreferrer">Privacidade da Microsoft</a>.</p><div class="analytics-consent__actions"><button type="button" data-choice="rejected">Recusar análise</button><button type="button" data-choice="accepted">Aceitar análise</button></div>';
  document.body.appendChild(box);
  const footer = document.querySelector('.footer-bottom');
  const preferences = document.createElement('button');
  preferences.type = 'button';
  preferences.className = 'analytics-preferences';
  preferences.textContent = 'Preferências de privacidade';
  preferences.addEventListener('click', () => { box.hidden = false; box.querySelector('button').focus(); });
  if (footer) footer.appendChild(preferences);
  box.addEventListener('click', event => {
    const button = event.target.closest('button[data-choice]');
    if (!button) return;
    const previous = readChoice();
    const choice = button.dataset.choice;
    saveChoice(choice);
    box.hidden = true;
    if (choice === 'accepted') startClarity();
    else if (previous === 'accepted' && started) {
      window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
      location.reload();
    }
  });
  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : event.target.parentElement;
    const link = target && target.closest('a[href]');
    if (!link || readChoice() !== 'accepted' || typeof window.clarity !== 'function') return;
    const url = new URL(link.href, location.href);
    if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') window.clarity('event', 'whatsapp_click');
  });
  if (readChoice() === 'accepted') startClarity();
  else if (readChoice() !== 'rejected') box.hidden = false;
})();
