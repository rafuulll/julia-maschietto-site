# Auditoria independente de responsividade — base da sétima execução

Data: 30/10/2026. Superfície: `dist/index.html` antes de `seventh-round.css/js`.

Uma rodada ampla de Edge/Chromium headless com fontes carregadas, em 14 telas: 320×568, 360×800, 390×844, 430×932, 740×360, 844×390, 768×1024, 820×1180, 1024×768, 1180×820, 1366×600, 1440×900, 1920×1080 e 2560×1440. Leitura de PRODUCT.md, DESIGN.md, brief, HTML, CSS final e scripts das interações; orientação de impeccable/adapt/audit/craft-floor. Não houve alteração dos arquivos de produto.

## Defeitos materiais e correções específicas

1. **P1 — Menu mobile perde opções em telas baixas.** Em 320×568, o link Vamos conversar termina em y=603; em 740×360, Sobre termina em y=443 e Contato em y=545. O menu fixo tem `overflow-y:visible`, enquanto o body está travado. O conteúdo abaixo da tela fica inacessível por rolagem. Definir `overflow-y:auto; overscroll-behavior:contain` em `.mobile-menu`, reservar padding inferior e reduzir o padding superior em landscape baixo. Manter fonte e linguagem visual aprovadas.

2. **P2 — Texto de apoio esmagado no tablet.** Entre 761–1000px, a regra antiga `.hero-aside{max-width:370px}` sobrevive à nova regra `display:flex`. Medido em 768×1024 e 820×1180: parágrafo com 96.59px de largura e 198.84px de altura, disposto em uma coluna de palavras ao lado dos dois botões. Limpar `max-width`, usar `min-width:0` e assumir explicitamente a composição tablet; texto em linha própria com ações abaixo é a correção mais previsível.

3. **P2 — Alvos de toque pequenos nas demais seções.** Medições mobile: links de serviço 34px de altura; tabs do notebook 36px; Ampliar a entrega 24px; Conhecer minha trajetória 34px; Tirar uma dúvida 35px; links de footer 28.69px; fechar dialog 40px por CSS. Aplicar pelo menos 44px de altura aos controles citados e `inline-flex;align-items:center` onde necessário, com padding vertical. Preservar textos e fontes; a correção é na área de toque. Como tablets também são touch, não limitar a adaptação a até760px. Depoimentos ficam sob responsabilidade da outra alteração.

4. **P2 — Ações hero/nav pequenas no mobile e baixa presença inicial.** Hero: fonte11px, altura49px; nav-contact: fonte12px e altura41.19px. O hero possui mínimo900px mesmo em 320×568; o título começa em y570 e os botões em y827. Em 390×844 os botões ainda terminam em y876. Aumentar texto e área dos CTAs, reorganizar o bloco com a personagem mais alta e dar espaço explícito entre os dois enunciados. Um hero pode rolar, mas a altura não deve ser usada para esconder colisões. Esse ajuste já foi assumido pelo agente principal.

5. **P2 — Ondas permanecem presas após a travessia.** Em1440×900, a barra chega a100% e as ondas continuam em `top:0` tanto300px quanto600px depois do fim da travessia; About já está entrando. `.journey-waves` está sticky pelo ancestral que inclui processo e About. Limitar o estado fixo ao intervalo da travessia e liberar sua posição para descer com About no final. No modo nativo mobile/tablet/reduced-motion, não há razão para sticky. Ajuste já assumido pelo agente principal.

## Cobertura e aspectos preservados

- **Todas as seções:** nenhuma barra horizontal de página em qualquer uma das14 telas, com os seis cases e todas as perguntas abertos simultaneamente. Nenhum overflow de conteúdo nos painéis abertos. Nenhum erro JS em execução.
- **Serviços:** stack mobile e três colunas desktop funcionam; a área de toque dos links é o defeito material encontrado. Sem necessidade de refazer cards ou conteúdo.
- **Cases e diálogos:** native details mantém título e resultado disponíveis; grid abre em uma coluna no mobile. As provas cabem. Dialog tem largura responsiva, altura máxima90svh e overflow; aumentar alvo de fechar de40 para44px é a correção pontual.
- **Notebook/tabs:** o dispositivo respeita a tela sem criar barra horizontal; tabs quebram em mais de uma linha quando necessário. Existem roving tabindex, setas, Home/End e atualização conjunta de texto, imagem, alt e aria-labelledby. Aumentar os alvos é suficiente.
- **Processo:** percurso em rail nativo fora do pin; pin acima1000px com altura mínima480px; regra compacta para janelas abaixo550px. Barra respondeu0/50/100. O defeito confirmado está na liberação das ondas.
- **Crachá/About:** palco com min-width:0, fallback presente, lazy import próximo da seção, resize e pausa fora da tela; conteúdo biográfico empilha no mobile. Sem evidência de overflow estático. Não se recomenda alterar o retrato.
- **FAQ:** summaries amplos, legíveis e todos os painéis se mantêm dentro da página. Sticky da introdução desliga no mobile/telas baixas. Somente o link de apoio precisa de alvo maior.
- **Footer:** colunas adaptam para duas e a primeira ocupa toda a largura no mobile; sem vazamento de texto. Aumentar áreas de toque dos links e preservar vídeo com controle de pausa.
- **Hero/stories:** a ordem de profundidade existe corretamente: dois stories comz1, personagemz2 e story frontalz3. O pedido é diminuir/discretizar e ajustar a posição, sem regenerar imagem.

## Limites da evidência

Emulação Chromium em Windows, sem dispositivo físico ou Safari. O script registrou um teste sintético de fontes duplicadas em `text200`, mas ele aplica percentuais em níveis aninhados e NÃO equivale a zoom200%; esse campo deve ser ignorado. As medições normais de320px fornecem evidência de reflow estreito, sem afirmar cobertura de zoom/text resize.

Dados: `responsive-audit.json`. Capturas limitadas a hero320/768/1440 em `audit-hero-*.png`. Script: `.tools/responsive-audit-round7.cjs`.
