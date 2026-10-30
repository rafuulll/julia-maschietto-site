from pathlib import Path
root=Path(__file__).resolve().parents[1]
file=root/'dist/index.html'
text=file.read_text(encoding='utf-8')
for target in ['<p class="concept-label">Um olhar para a marca inteira</p>','<p class="about-intro">Prazer, eu sou a Julia.</p>']:
    assert target in text, target
    text=text.replace(target,'')
tag='<span class="project-category">Direção criativa · Lançamento</span>'
assert text.count(tag)==1
text=text.replace(tag,'')
heading='<h3>Um lançamento com<br> <em>conceito, imagem e narrativa.</em></h3>'
assert text.count(heading)==1
text=text.replace(heading,heading+tag)
tag='<span class="project-category">Bahari · Direção criativa</span>'
assert text.count(tag)==1
text=text.replace(tag,'')
heading='<h2 id="case-dialog-title">Um lançamento com<br> <em>conceito, imagem e narrativa.</em></h2>'
assert text.count(heading)==1
text=text.replace(heading,heading+tag)
file.write_text(text,encoding='utf-8')
css=root/'dist/styles.css'
text=css.read_text(encoding='utf-8')
text+='\n.featured-copy .project-category,.case-dialog-content .project-category{margin-top:18px;margin-bottom:0}\n'
css.write_text(text,encoding='utf-8')
print('Review fix: redundant kickers removed; classification moved below project headings.')
