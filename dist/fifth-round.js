(() => {
  const hero=document.getElementById('inicio');
  const cards=[...hero.querySelectorAll('.hero-story')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover:hover) and (pointer:fine)');
  let pending=0,x=0,y=0;
  function paint(){pending=0;cards.forEach((card,i)=>{const factor=i%2?-1:1;card.style.setProperty('--story-x',`${x*factor*4}px`);card.style.setProperty('--story-y',`${y*factor*3}px`)});}
  hero.addEventListener('pointermove',event=>{if(reduced.matches||!fine.matches)return;const r=hero.getBoundingClientRect();x=(event.clientX-r.left)/r.width-.5;y=(event.clientY-r.top)/r.height-.5;if(!pending)pending=requestAnimationFrame(paint);},{passive:true});
  hero.addEventListener('pointerleave',()=>{x=0;y=0;if(!pending)pending=requestAnimationFrame(paint);});
  reduced.addEventListener('change',()=>{x=0;y=0;paint();});
})();
