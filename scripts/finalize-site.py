"""One-time production migration; generated SEO files can be maintained here."""
from pathlib import Path
import re,json
ROOT=Path(__file__).resolve().parents[1];dist=ROOT/'dist'
URL='https://julia-maschietto-estudio.classyscout131.chatgpt.site'
p=dist/'index.html';s=p.read_text(encoding='utf-8')
s=s.replace('noindex,nofollow','index,follow,max-image-preview:large')
s=s.replace('assets/social-preview.jpg',URL+'/assets/social-preview-final.jpg')
s=s.replace('<meta property="og:title" content="Julia Maschietto | Da estratégia à expressão">','<meta property="og:title" content="Julia Maschietto · Estratégia, conteúdo e direção criativa">')
s=s.replace('<link rel="icon" href="favicon.svg" type="image/svg+xml">','''<link rel="icon" href="favicon.svg?v=final" type="image/svg+xml">
  <link rel="icon" href="favicon.ico?v=final" sizes="16x16 32x32 48x48">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <link rel="canonical" href="'''+URL+'''/">
  <link rel="alternate" type="text/markdown" href="index.md" title="Conteúdo do site em Markdown">
  <link rel="describedby" href="llms.txt">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="Julia Maschietto">
  <meta property="og:url" content="'''+URL+'''/">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Julia Maschietto — Estratégia para posicionar. Criatividade para comunicar.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Julia Maschietto · Estratégia, conteúdo e direção criativa">
  <meta name="twitter:description" content="Estratégia para posicionar. Criatividade para comunicar.">
  <meta name="twitter:image" content="'''+URL+'''/assets/social-preview-final.jpg">''')
s=s.replace('manrope.ttf','manrope.woff2').replace('instrument-serif-italic.ttf','instrument-serif-italic.woff2').replace('type="font/ttf"','type="font/woff2"')
for label in ['desktop','tablet','mobile']:s=s.replace(f'hero-{label}-v10.webp',f'hero-{label}-final.webp')
s=re.sub(r'  <link rel="stylesheet"[^>]+>\n','',s)
s=s.replace('  <script src="assets/lenis.min.js" defer></script>','  <link rel="stylesheet" href="site.min.css?v=final-20261031">\n  <script src="assets/lenis.min.js" defer></script>')
s=re.sub(r'(src="(?:config|app|second-round|testimonials-carousel)\.js)\?[^" ]+',r'\1?v=final-20261031',s)
s=s.replace('<span class="demo-badge">Versão de apresentação</span>','')
s=re.sub(r'<dialog class="contact-dialog".*?</dialog>\n','',s,flags=re.S)
s=s.replace('Para visualizar uma contratação nesta demonstração, podemos considerar de 4 a 6 semanas para um projeto de estratégia. <small class="demo-inline">Estimativa ilustrativa, sujeita à validação.</small>','O prazo é definido na proposta, conforme as entregas e a disponibilidade.')
s=s.replace('assets/leticia-book-video-v10.mp4','assets/leticia-book-video-final.mp4')
s=s.replace('''<div class="hover-preview" aria-hidden="true"><img src="assets/bruna-profile-v9.webp"''','''<div class="hover-preview" aria-hidden="true"><img loading="lazy" src="assets/bruna-cover-v10.webp"''')
s=s.replace('alt="Retrato de Julia Maschietto com batom vermelho.">','alt="Retrato de Julia Maschietto com batom vermelho." loading="lazy">')
s=re.sub(r'<!-- THESIS:.*?-->\n','',s,flags=re.S)
person=URL+'/#julia';site=URL+'/#site';page=URL+'/#pagina'
graph=[{'@type':'Person','@id':person,'name':'Julia Maschietto','url':URL+'/','image':URL+'/assets/hero-desktop-final.webp','jobTitle':'Estrategista de marca e conteúdo','description':'Estrategista de marca e conteúdo, com atuação em direção criativa.','email':'jumaschietto3@gmail.com','sameAs':['https://www.linkedin.com/in/jumaschietto/'],'knowsAbout':['Estratégia de marca','Posicionamento de marca','Conteúdo estratégico','Direção criativa','Storytelling']},
{'@type':'WebSite','@id':site,'url':URL+'/','name':'Julia Maschietto','inLanguage':'pt-BR','publisher':{'@id':person}},
{'@type':'WebPage','@id':page,'url':URL+'/','name':'Julia Maschietto · Estratégia, conteúdo e direção criativa','inLanguage':'pt-BR','isPartOf':{'@id':site},'about':{'@id':person},'mainEntity':{'@id':person}}]
for name,description in [('Estratégia de marca','Posicionamento e essência, expressão visual e verbal e estratégia de comunicação.'),('Conteúdo estratégico','Planejamento editorial, roteiros, storytelling e rituais de conteúdo.'),('Direção criativa','Conceito de campanha, direção de ensaios e narrativa de lançamento.')]:
 graph.append({'@type':'Service','name':name,'description':description,'provider':{'@id':person},'url':URL+'/#servicos'})
s=s.replace('</head>','  <script type="application/ld+json">'+json.dumps({'@context':'https://schema.org','@graph':graph},ensure_ascii=False,separators=(',',':'))+'</script>\n</head>')
p.write_text(s,encoding='utf-8')
(dist/'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: '+URL+'/sitemap.xml\n',encoding='utf-8')
(dist/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+URL+'/</loc></url></urlset>\n',encoding='utf-8')
(dist/'llms.txt').write_text('''# Julia Maschietto

> Estratégia de marca, conteúdo estratégico e direção criativa. Site profissional e portfólio de Julia Maschietto, com atendimento remoto.

Julia cursa Publicidade e Propaganda na PUC Minas — 7º semestre — e tem formação Estrategista de Marca (FEM). Desde 2024, desenvolveu trabalhos para mais de 30 marcas e perfis, conforme sua apresentação profissional.

## Conteúdo principal

- [Apresentação, serviços e projetos em Markdown]('''+URL+'''/index.md): conteúdo factual do site, resultados contextualizados e contatos.
- [Serviços]('''+URL+'''/#servicos): estratégia de marca, conteúdo e direção criativa.
- [Projetos e resultados]('''+URL+'''/#projetos): participação e indicadores de cada projeto, com atribuições e contexto.
- [Sobre Julia]('''+URL+'''/#sobre): trajetória e formação.
- [Perguntas frequentes]('''+URL+'''/#duvidas): atendimento, escopo e contratação.

## Contato

- [LinkedIn](https://www.linkedin.com/in/jumaschietto/)
- [WhatsApp](https://wa.me/5515997486580)
- E-mail: jumaschietto3@gmail.com

Os depoimentos identificados como fictícios no site são ilustrativos; não são avaliações reais. Os indicadores dos cases se referem a projetos específicos, conforme as fontes e atribuições descritas na página.
''',encoding='utf-8')
(dist/'index.md').write_text('''# Julia Maschietto

Estratégia para posicionar. Criatividade para comunicar.

Defino o que sua marca precisa dizer e transformo esse posicionamento em conteúdo, campanhas e direção criativa.

## Serviços

### Estratégia de marca
Posicionamento e essência, expressão visual e verbal e estratégia de comunicação.

### Conteúdo com intenção
Planejamento editorial, roteiros e storytelling e rituais de conteúdo.

### Direção criativa
Conceito de campanha, direção de ensaios e narrativa de lançamento.

## Projetos

### Bahari
Direção criativa do lançamento da marca de biquínis de Bia França, em dupla com Larissa Gomes, na campanha de verão 2025/2026. Participação: conceito artístico, press kit, direção dos ensaios e roteiros. Publicações entre 249 mil e 411 mil visualizações, conforme as capturas do portfólio. Direção criativa: Julia Maschietto e Larissa Gomes.

### Sepulveda Chocolates
Estratégia de comunicação para a Páscoa. De R$ 10 mil para R$ 30 mil em 2024, segundo o relato da cliente sobre a Páscoa anterior e a campanha trabalhada. O indicador é um resultado relatado pela cliente.

### Delegada Júlia Nunes
Participação na equipe multidisciplinar de comunicação da pré-campanha e campanha de 2026: estratégia, roteiros e gestão de redes. Mais de 100 vídeos em 45 dias e crescimento de cerca de 27% da base de seguidores, conforme os resultados relatados no perfil profissional.

### Bruna Mariana
Estratégia de conteúdo e lançamento digital de curso. Conteúdos com até 3,4 mil curtidas e 1 mil salvamentos, conforme os indicadores apresentados no portfólio.

### Novo Método
Conceito “Da questão à nota” e apresentação comercial B2B para uma operação de gestão de avaliações escolares. O resultado apresentado é a entrega de conceito e narrativa, sem alegação de faturamento.

### Copa das Seleções: Vozes da Amazônia
Criação de peças para Instagram como integrante da equipe de design da primeira edição, realizada em São Luís. As instituições apoiadoras do evento não são clientes diretas de Julia.

Os indicadores têm os períodos e atribuições descritos em cada case. Os depoimentos da seção correspondente são exemplos fictícios, identificados na página.

## Processo

1. Entender: conversa sobre negócio, momento da marca e objetivo.
2. Definir: proposta com escopo, entregas e cronograma.
3. Desenvolver: pesquisa, estratégia e criação dos materiais.
4. Dar forma: apresentação das decisões e entregas.

## Sobre Julia

Estrategista de marca e conteúdo, com atuação em direção criativa. Publicidade e Propaganda, PUC Minas — 7º semestre; Formação Estrategista de Marca (FEM). Desde 2024, desenvolveu trabalhos para mais de 30 marcas e perfis, conforme sua apresentação profissional.

## Atendimento

As frentes de trabalho podem ser contratadas conforme a necessidade. Julia atua de forma remota; captação e presença em campo têm a logística definida na proposta. Escopo, prazo e investimento são definidos a partir do objetivo, das entregas e da disponibilidade.

## Contato

- WhatsApp: https://wa.me/5515997486580
- E-mail: jumaschietto3@gmail.com
- LinkedIn: https://www.linkedin.com/in/jumaschietto/
- Site: '''+URL+'''/
''',encoding='utf-8')
print('Production metadata, crawl files and contact cleanup prepared.')
