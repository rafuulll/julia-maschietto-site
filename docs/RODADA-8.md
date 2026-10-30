# Oitava execução

## Proposta desktop da hero

Criada uma imagem raster única com a composição fotográfica e os três stories incorporados, usando a ferramenta nativa image_gen e as fotografias fornecidas como referências. Uma revisão reduziu os stories e refinou as sobreposições. Fundo cinza quente e fade inferior preservam a direção visual anterior. Arquivo de revisão: `output/imagegen/hero-desktop-round8.png`; prompts completos em `docs/hero-desktop-round8-prompt.json`.

Esta imagem é uma proposta desktop para aprovação. Não substitui a hero publicada e não foram criadas variantes mobile/tablet. Como a composição passa por geração, a fidelidade visual é inspecionada, mas não se afirma preservação pixel a pixel. Copy, navegação e botões não foram incorporados à imagem; continuam elementos semânticos da página.

## Bahari

Retorna como projeto em destaque, com imagem ampla, narrativa compacta, resultado contextualizado e detalhes nativos expansíveis contendo participação, crédito compartilhado e capturas reais do portfólio. A abertura continua identificada como composição ilustrativa. Os cinco projetos restantes mantêm suas linhas expansíveis. Não foram alterados números, atribuições ou fontes.

## Processo e rolagem

A base CSS agora é uma sequência vertical em fluxo normal, com progresso à esquerda. Funciona sem o módulo de animação: todas as quatro etapas permanecem visíveis, sem exigir arraste lateral. Com JavaScript, o preenchimento acompanha a passagem da lista pelo viewport.

O percurso lateral fixado continua apenas para largura mínima1001px, altura mínima480px, ponteiro fino/hover, movimento permitido e suporte a sticky. Mobile, touch e movimento reduzido usam a sequência vertical. As ondas mantêm a compensação restrita ao pin desktop e a liberação ao final.

## Depoimentos

Removida a exclusão ampla `data-lenis-prevent` do rail, que afastava a roda vertical do controle de rolagem da página. Mantida a exclusão apenas para eventos touch, deixando a roda vertical chegar ao Lenis e o gesto horizontal nativo funcionar. Overscroll volta ao comportamento normal; nenhuma nova captura de wheel foi adicionada. O fade lateral diminuiu de até72px para até28px.

## Tags

As quatro tags ocupam as quatro pontas do bloco, com faixas superiores/inferiores reservadas fora do texto. No mobile, ficam próximas das bordas, podendo sangrar discretamente, sem virar uma fileira inferior. O movimento foi limitado para preservar a separação; `overflow:clip` impede barra horizontal da página.

## Verificação

Dez tamanhos de320×568 a2560×1440, incluindo740×360. Sem overflow horizontal de página ou erro JavaScript. Testes da roda sobre primeiro/último cartão nos dois sentidos, gesto touch vertical e swipe horizontal; fluxo vertical do processo sem JS e com movimento reduzido; barra em0/50/100; abertura de Bahari; ausência de interseção entre tags e retângulo do texto. Emulação Edge/Chromium em Windows, sem dispositivos físicos ou Safari.
