# Nona execução — fotografia, mídia real e composição responsiva

## Hero aplicada

A direção raster da oitava proposta foi aprovada, com a condição de preservar o rosto. Em vez de gerar novamente a pessoa, foi exportado o retrato do arquivo nativo `Julia-recorte.psd`, fornecido pelo usuário. Limpeza apenas da máscara na borda e transição de transparência na parte inferior; nenhum desenho ou retoque de olhos, boca, nariz, pele ou expressão. O RGB do recorte foi comparado ao PSD antes do redimensionamento e da compressão. Os arquivos web passam por reamostragem e WebP; não se afirma identidade binária entre formatos.

Mantidos os stories e o fundo cinza quente da direção aprovada. As três composições são bitmaps únicos, com dois stories atrás e um à frente: `hero-desktop-v9.webp`1920×1000, `hero-tablet-v9.webp`1400×1100 e `hero-mobile-v9.webp`900×1050. Seleção por picture e preload condicionado à largura. Títulos, botões e navegação seguem em HTML acessível. Não houve nova geração de rosto nesta rodada; o PSD já editável permitiu a composição sem síntese facial. Origem e verificação em `media-round9.json`.

## Sobre e ondas

Texto antes do crachá no DOM e no layout até1000px. Desktop mantém crachá à esquerda e texto à direita. O comportamento de arraste não mudou. Duas novas ondas, estáticas e suaves, entram apenas nas bordas de Serviços e Depoimentos; as já existentes no Processo/Sobre permanecem. Os SVGs deixam o traço contínuo, com recorte somente no limite externo da seção.

## Cases com mídias reais

- Bahari: a foto real `IMG_3357.JPG.jpeg` substitui o still life ilustrativo do destaque. Nas evidências, vídeo completo de Bia França (`IMG_3363.MOV`, convertido para MP4), um story (`IMG_3358.PNG`) e as capturas originais de resultados. Mantidos créditos compartilhados e contexto dos indicadores. Vídeo540×960, cerca de3,8MB, sem autoplay, preload none, controles nativos e pausa ao sair da área ou fechar o case.
- Delegada Júlia Nunes: selecionadas `IMG_3368.PNG` e `IMG_3372.PNG`. Mostradas em duas miniaturas de altura controlada e ampliáveis; não foram somadas métricas de períodos diferentes nem inventados resultados.
- Bruna Mariana: a imagem anterior era de KR InsightFlow. Foi substituída pela evidência correta do portfólio, página9/índice4 na extração zero-based, com3,4mil curtidas e1mil salvamentos. A prévia usa o perfil correto da página8/índice3. A estrutura agora mostra prova horizontal, evitando o vazio ao lado da tipografia.

Capturas abrem no diálogo existente e devolvem foco ao botão de origem ao fechar. Demais imagens verticais dos cases limitadas a300px no desktop e280px no mobile, mantendo enquadramento completo. Não foram utilizadas todas as mídias enviadas.

## Depoimentos

Removidas as duas camadas de fade. Cartões legíveis até as bordas, sem véu sobre o texto. Mantidos navegação manual, swipe, teclado, identificação ilustrativa e passagem vertical pela página.

## Validação

Dez telas, de320×568 a2560×1440, incluindo paisagem740×360. Fontes e imagens carregadas; sem erro JavaScript, HTTP com falha ou overflow horizontal, inclusive com cases e FAQ abertos. Conferidos picture por resolução, ordem do Sobre, altura dos CTAs, ampliação de prova, foco/fechamento, reprodução real do vídeo e pausa ao fechar. Inspeção conjunta desktop/mobile e uma correção de acabamento na base da foto/contorno das ondas. Evidências em `docs/qa/round-nine/`.

Limite de teste: Edge/Chromium emulado em Windows, sem aparelhos físicos ou Safari/iOS.
