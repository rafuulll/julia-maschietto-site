(() => {
  const quotes=[
    {name:'Marina A.',role:'Marca pessoal',text:'“Eu tinha muitas ideias, mas faltava uma direção. Hoje consigo explicar meu trabalho com clareza e <em>reconhecer minha voz</em> no conteúdo.”'},
    {name:'Paula L.',role:'Marca pessoal',text:'“A comunicação ganhou unidade. Ficou mais fácil escolher os temas e entender como eu quero <em>me apresentar para o meu público.</em>”'},
    {name:'Renata C.',role:'Projeto autoral',text:'“Gostei de sentir que minha história foi ouvida. O resultado tem personalidade e se conecta com <em>o que eu queria construir.</em>”'}
  ];
  const carousel=document.querySelector('.editorial-carousel'),figure=document.getElementById('editorial-quote');
  const buttons=[...document.querySelectorAll('[data-quote]')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let active=0,animation;
  function show(index){
    active=(index+quotes.length)%quotes.length;const q=quotes[active];
    document.getElementById('editorial-text').innerHTML=q.text;
    document.getElementById('editorial-author').textContent=q.name;
    document.getElementById('editorial-role').textContent=`${q.role} · exemplo fictício`;
    document.getElementById('editorial-count').textContent=`0${active+1} / 03`;
    document.getElementById('editorial-status').textContent=`Depoimento ${active+1} de 3: ${q.name}. Exemplo fictício.`;
    buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===active)));
    animation?.cancel();if(!reduced.matches)animation=figure.animate([{opacity:0,transform:'translateY(7px)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.16,1,.3,1)'});
  }
  buttons.forEach((button,i)=>button.addEventListener('click',()=>show(i)));
  document.getElementById('quote-prev').addEventListener('click',()=>show(active-1));
  document.getElementById('quote-next').addEventListener('click',()=>show(active+1));
  carousel.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();show(e.key==='Home'?0:e.key==='End'?2:active+(e.key==='ArrowRight'?1:-1));});
  let start;
  carousel.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')start={x:e.clientX,y:e.clientY};},{passive:true});
  carousel.addEventListener('pointerup',e=>{if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.3)show(active+(dx<0?1:-1));},{passive:true});
  carousel.addEventListener('pointercancel',()=>{start=null;});
  reduced.addEventListener('change',()=>animation?.cancel());
})();
