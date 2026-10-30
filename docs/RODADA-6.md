# Sexta execução e correção da hero

Escopo integralmente autorizado pelo usuário: restaurar a composição anterior da hero e executar a sexta rodada editorial, crachá livre e ondas fixas.

## Hero e fotografia
Restaurados fundo cinza quente, frame arredondado e fade escuro inferior, com copy branca e controles do sistema anterior. A foto aprovada `hero-julia.webp` foi reutilizada, centralizada e com escala controlada. Não houve nova geração de rosto/corpo. A derivação `hero-julia-original-cutout.webp` altera somente transparência e enquadramento; uma comparação de pixels confirma que o RGB do rosto foi preservado. Fundo foi separado por máscara de cor, com proteção da região facial. Exportação WebP lossless. O PSD existente foi inspecionado como alternativa, mas a foto da hero anterior foi a escolhida para respeitar o pedido.

Três stories estáticos 9:16, todos em preto e branco: foto sorrindo com batom atrás à esquerda; mão com batom atrás à direita; retrato de perfil na frente. As duas novas fontes são as fotos originais indicadas pelo usuário, apenas otimizadas para WebP. Não há links, eventos de clique, campos funcionais ou deslocamento ao mover o mouse. Duas camadas ficam atrás do retrato e uma acima, inclusive no celular.

Referência de UI pesquisada: https://snaplytics.io/tools/instagram-story-generator/ — proporção 9:16, avatar, barras de progresso e campo de mensagem com ícones. Moldura própria em HTML/CSS/SVG, sem baixar ou embutir um mockup com watermark. Os elementos são decorativos; não representam stories efetivamente publicados.

## Sexta rodada
- Depoimentos editoriais: um relato grande por vez, autoria e contexto, seleção por nomes, setas, teclado e swipe. Troca curta, sem rotação automática. Exemplos fictícios continuam identificados; nenhum deles foi ligado a um case real sem confirmação de atribuição.
- Crachá: amplitude ampliada, limites suaves de arraste, rotação maior, inércia ao soltar e restrição final calculada pelo campo visível da câmera. Mantido suporte, foto, fallback e HTML/CSS/JS sem React.
- Ondas: camada sticky com contribuição de altura anulada por margem, imóvel enquanto as etapas passam. `overflow:clip` no wrapper limita a decoração ao Processo/Sobre, preservando o comportamento sticky e a continuidade visual.

Validação em docs/qa/round-six/report.json: quatro viewports de hero, ausência de overflow/erros/recursos com falha, posições estáticas das ondas em três pontos do percurso, deslocamento e soltura do crachá, troca de relatos por botões/teclado e swipe real simulado por CDP, preferência por movimento reduzido. Sem alterações comerciais ou métricas novas.
