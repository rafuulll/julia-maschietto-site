# Imagens, fontes, movimento e evidências

## Fotografias e mídia criativa

- `hero-julia.webp`: edição com GPT Images da foto fornecida `grdr 2025-08-01 163616.323.jpg`. Preserva a identidade e troca a parede por um fundo editorial neutro, com correções fotográficas discretas.
- `about-julia.webp`: edição com GPT Images da fotografia `IMG_8421_Original.HEIC`. Ambiente, pose, notebook e roupa preservados; correção de luz e limpeza da mesa.
- `bahari-cover.webp`: composição de moda praia gerada com GPT Images, criada para a apresentação. Não é uma fotografia original de campanha. Identificada na própria seção e no detalhe do case.
- `footer-silk.webp` e `footer-silk-poster.webp`: tecido bordô gerado com GPT Images. O MP4 usa essa textura com deformação espacial suave em um ciclo de 10 segundos, sem áudio. Nenhuma mídia da clínica de referência foi reutilizada.
- `notebook-frame.webp`: moldura de notebook fornecida na pasta de materiais da Julia. Na tela entram as páginas reais dos PDFs.
- Composições A/B/C em `.impeccable/mocks/`: estudos, não publicados como página ou prova de clientes. Escolha A sob direção delegada do usuário; os logos fictícios surgidos em outros estudos foram descartados.

Prompts exatos em `image-prompts.json` e `supporting-asset-prompts.json`; arquivos WebP têm sidecars com os prompts. Uso do recurso integrado GPT Images, sem API externa ou chave do usuário. Detalhes técnicos do rodapé em `supporting-assets-provenance.md` e `footer-video-validation.json`.

## Evidências e entregas

- Bahari, Sepulveda, Bruna Mariana e depoimento de posicionamento: imagens extraídas do portfólio fornecido. Indicadores preservados como relatados, com atribuição contextual. A métrica de faturamento é um relato da cliente sobre a Páscoa, não uma garantia.
- Delegada Júlia Nunes: resultados e participação descritos no material profissional fornecido. Atribuição à equipe de comunicação preservada.
- Copa das Seleções: participação na equipe de design; a entrega é o resultado exibido. Nenhum indicador de desempenho foi inventado.
- Novo Método: páginas da apresentação comercial fornecida. O fluxo é a página 5; a capa é a página 1. Métricas comerciais da própria empresa não são atribuídas à Julia.
- Leticia Isse: capa do book de estratégia. Crédito de alinhamento visual para Larissa Gomes.
- Dra. Nathalia: capa do book de estratégia; seis pilares e rituais são propostas do material, sem alegação de resultado comercial medido.

## Recursos de interface

- Manrope variável: Google Fonts, licença SIL Open Font License.
- Instrument Serif Italic: Google Fonts, licença SIL Open Font License.
- Phosphor Icons regular: biblioteca oficial, licença MIT.
- Lenis 1.3.17: biblioteca oficial, licença MIT; carregada localmente. Rolagem nativa no celular e com movimento reduzido.

Licenças em `dist/assets/licenses/`. As fotografias e materiais enviados continuam pertencendo aos seus respectivos titulares; esta entrega não altera sua titularidade.


## Atualização da segunda execução

O retrato já tratado `hero-julia.webp` também é a textura fotográfica do crachá 3D, recortada em tempo de execução. O cartão e o cordão são geometria WebGL, sem novo retrato gerado e sem React. Three.js 0.180.0 é distribuído em `dist/assets/vendor`, com licença MIT em `dist/assets/licenses/Three-MIT.txt`. A interação toma o React Bits Lanyard como referência, com implementação própria para esta página.

Os depoimentos da parede animada são exemplos fictícios aprovados para apresentação e identificados no bloco e em cada cartão; não são novos relatos ou provas de clientes reais. Os arquivos das evidências originais continuam em assets e no histórico.

## Quinta execução

`hero-julia-v5.webp`: retrato com transparência gerado pelo image_gen integrado, preservando a identidade das fotografias fornecidas. Prompt integral e fontes em `docs/hero-v5-prompt.json`. Original gerado permanece no diretório de geração do Codex; a versão otimizada usada pelo site está no projeto. Não substitui a textura anterior do crachá.

`hero-story-julia.webp`: versão WebP otimizada da foto original sorrindo com batom, sem retoque criativo adicional. Os outros stories usam o retrato já existente `about-julia.webp` e a capa real `nathalia-book.webp`. Molduras, barras, legendas e links são HTML/CSS; não são capturas autênticas de stories publicados.

## Sexta execução — composição atual

O retrato gerado na quinta rodada deixou de ser usado pela hero. `hero-julia-original-cutout.webp` deriva da fotografia anteriormente aprovada `hero-julia.webp`: máscara de fundo e enquadramento, exportação lossless, sem geração de rosto/corpo e com RGB facial conferido contra o arquivo anterior. A foto do crachá foi preservada.

Os stories atuais são `hero-story-julia.webp` (sorrindo com batom), `hero-story-lipstick.webp` (original grdr 2025-08-01 170528.175.jpg, atrás) e `hero-story-profile.webp` (original grdr 2025-08-01 164250.415.jpg, à frente). Todas as fotografias ficam em preto e branco por CSS. Os frames são HTML/CSS/SVG decorativos, não possuem links e não simulam interações funcionais. Referência de moldura: https://snaplytics.io/tools/instagram-story-generator/.

## Nona execução — fontes atuais

A hero usa `hero-desktop-v9.webp`, `hero-tablet-v9.webp` e `hero-mobile-v9.webp`. Retrato exportado de `Julia-recorte.psd`, fornecido pelo usuário; o RGB do recorte original é preservado antes da reamostragem/compressão. Somente alpha da borda e da base foi tratado. Stories raster reaproveitados da proposta aprovada da oitava rodada, documentada em `hero-desktop-round8-prompt.json`. Não houve nova geração facial.

Mídia real da pasta `arquivos de midia`: `IMG_3357.JPG.jpeg` → `bahari-campaign-v9.webp`; `IMG_3358.PNG` → `bahari-story-v9.webp`; `IMG_3363.MOV` → vídeo `bahari-founder-v9.mp4` e poster; `IMG_3368.PNG` → `julia-nunes-results-v9.webp`; `IMG_3372.PNG` → `julia-nunes-reel-v9.webp`. Somente redimensionamento/compressão, sem retocar pessoas ou números. O vídeo mantém a duração completa e áudio.

Bruna: perfil correto extraído da página8/índice3 e resultado3,4mil/1mil da página9/índice4 (índices zero-based do portfólio PDF fornecido), em `bruna-profile-v9.webp` e `bruna-result-v9.webp`. A imagem KR InsightFlow deixou de ser usada no case e na prévia. `bahari-cover.webp` e antigos retratos gerados permanecem apenas no histórico/arquivos legados; não são a abertura atual da Bahari ou o retrato atual da hero.


## Rodada 10 — fonte atual da hero

O PNG transparente original fornecido pelo cliente (`grdr 2025-08-01 163616.323 1.png`, 4058×4209) substitui o PSD e qualquer retrato gerado. Crop [160,600,3880,4209], RGB sem retoque, escala proporcional e fade apenas na base. Hash e procedência em `hero-round10-source.json`. As três fotos dos stories vêm dos assets fotográficos originais hero-story-julia.webp, hero-story-lipstick.webp e hero-story-profile.webp, convertidas em preto e branco e compostas em raster com interface decorativa. Não foram gerados novos rostos.

A alternativa `output/imagegen/hero-textura-round10.png` utiliza somente um fundo gerado por image_gen integrado e o mesmo PNG e stories. O fundo sugere tecido de palco/papel fosco em tons claros; prompt em `hero-texture-round10-prompt.json`. Alternativa entregue separadamente, sem aplicação no site.


### Complemento de mídia da rodada 10

Arquivos originais das pastas videos mockup, copa, sepulveda, julia nunes e bruna foram fornecidos pelo cliente. As fotografias e peças foram dimensionadas para WebP, sem geração. Os três vídeos foram convertidos para H.264 1280×720, áudio removido e faststart. Fontes, nomes finais e dimensões em `media-update-round10.json`.
