from pathlib import Path
root=Path(__file__).resolve().parents[1]
html=root/'dist/index.html'
text=html.read_text(encoding='utf-8').replace('<br>', '<br> ')
html.write_text(text,encoding='utf-8')
css=root/'dist/styles.css'
text=css.read_text(encoding='utf-8')
text=text.replace('left:0;width:0;border-radius:999px;background:rgba(114,25,25,.08)', 'left:0;width:100px;border-radius:999px;background:rgba(114,25,25,.08)')
text=text.replace('transition:width .45s var(--spring),transform .45s var(--spring),opacity .2s', 'transition:transform .45s var(--spring),opacity .2s')
text=text.replace('transition:padding .5s var(--ease),color .3s', 'transition:color .3s')
text=text.replace('.project>summary:hover{padding-inline:15px;color:var(--wine)}', '.project>summary:hover{color:var(--wine)}')
text+='''
/* Final responsive refinements: readable portrait, truthful proof, unobstructed actions. */
.hero-in-view .floating-contact{opacity:0;pointer-events:none;visibility:hidden}
.hero-signature{letter-spacing:-.025em}
.featured-brand,.trust-number strong,.word-bahari,.footer-wordmark{letter-spacing:-.04em}
@media(max-width:760px){
  .hero-signature,.hero-note{display:none}
  .service p,.section-heading p,.about-copy>p:not(.about-intro),.deliverables-copy>p,.closing-top p,.faq-heading p{font-size:14px}
  .service ul,.process-steps p,.project-detail p,.faq-list details>p{font-size:13px}
  .project-name small,.project-result small,.book-description small,.quote-grid figcaption span{font-size:10px}
  .process-steps p{line-height:1.65}
}
'''
css.write_text(text,encoding='utf-8')
