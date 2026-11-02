# Portfólio para empresas

Versão criada a partir do documento da cliente, consultado pelo Google Drive em 2 de novembro de 2026. A página comercial continua em `/`; a nova versão fica em `/portfolio/`.

## Conteúdo e navegação

- Biografia atualizada, fundadora da [RE]VERSA, formação FEM com Brenda Scalco e 7º semestre de Publicidade e Propaganda na PUC Minas.
- Os três books aparecem na página, com índice visível, prévias automáticas ao entrar na tela, pausa e ampliação. Cada escopo abre em um disclosure nativo, acessível sem JavaScript.
- Bahari em destaque; Sepulveda, Delegada Júlia Nunes e Bruna Mariana têm páginas próprias com participação, evidências, créditos e navegação para o próximo projeto.
- Novo Método permanece nos books de branding; Novo Método e Copa saem somente da lista de cases desta versão.
- WhatsApp com mensagem específica para oportunidades profissionais, e-mail e LinkedIn preservados.

## Imagens e vídeos

A composição da hero mantém o rosto, o enquadramento e os stories aprovados. Foram exportadas novas versões de celular e tablet sem o desvanecimento do recorte sobre o fundo cinza. Uma única camada CSS escurece a região inferior da foto até chegar ao tom sólido da área de texto. A fotografia e o fade de desktop permanecem iguais.

Imagens reais convertidas para WebP, sem síntese ou retoque do rosto: foto da equipe Bahari, feed de resultados, cronograma, foto da equipe Júlia Nunes e capturas de Insights. A montagem de quatro publicações da Bruna foi extraída do documento original: a fonte fornecida tem 371×244 px; mantida em sua resolução para não inventar detalhes nos indicadores.

Os vídeos da Júlia Nunes já estavam na pasta de mídia: `IMG_3380.MOV` (esporte) e `IMG_1512.MOV` (mulher na política). Exportados em H.264, 540 px, 24 fps, CRF 27, áudio AAC e fast start. Possuem controles nativos e carregam por demanda. Os três mockups continuam silenciosos, em loop, com reprodução condicionada à presença na tela. Movimento reduzido, economia de dados e bloqueio de autoplay exibem capas estáticas.

`scripts/build-portfolio.py` gera as cinco páginas e conserva a página comercial. `scripts/portfolio-assets.py` documenta os arquivos-fonte e os parâmetros de exportação. As fotografias originais ficam nos caminhos locais fornecidos pela usuária; a montagem do documento foi preservada em `assets-source/portfolio-bruna-results.png`.

## Contexto dos resultados

- Bahari: 1,1 milhão em uma publicação. Os demais números são exemplos de publicações; não representam a soma ou o total da campanha. Codireção creditada a Julia Maschietto e Larissa Gomes.
- Sepulveda: R$ 10 mil para R$ 30 mil, segundo relato da cliente.
- Júlia Nunes: mais de 100 vídeos produzidos pela equipe em 45 dias. Crescimento de cerca de 27% no período da campanha; o print de +7,5% refere-se a um recorte separado de 30 dias. Identificação da campanha incluída conforme documento.
- Bruna: estratégia, social media, coordenação criativa e automação por Julia; produção textual pela cliente.

## Verificação

- `scripts/check-site.cjs`: validação da LP comercial.
- `scripts/check-portfolio.cjs`: HTML, JavaScript, arquivos, fragmentos, IDs e metadados das cinco páginas novas.
- Matriz em Chromium: 6 páginas × 5 larguras (320, 390, 768, 1024 e 1440 px), sem overflow horizontal ou erros de execução detectados.
- 31 verificações de interação: menu, escopos, vídeos automáticos, pausa, ampliação, fechamento e navegação entre projetos.
- 10 verificações axe-core/WCAG nas cinco páginas, em celular e desktop: nenhuma violação automatizada. Contraste sobre imagem e legendagem de vídeos exigem verificação manual; esse resultado não equivale a uma certificação completa de acessibilidade.
- Alternativas verificadas: movimento reduzido, indisponibilidade de WebGL e reprodução automática bloqueada.
- Canonicals individuais, dados estruturados, sitemap e llms.txt atualizados.

Relatórios e capturas em `docs/qa/portfolio/`. Os testes de tamanho usam Chromium; não equivalem a execução física em todos os modelos de iPhone, iPad e Android. Não foram medidos dados de campo de Core Web Vitals nesta versão.
