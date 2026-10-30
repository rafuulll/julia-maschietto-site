# Sétima execução — hero, depoimentos e responsividade

## Composição

Mantida a fotografia aprovada, sem nova geração ou alteração do rosto. Retrato elevado; stories menores e discretos, com duas camadas atrás e o perfil menor à frente. A composição evita o parágrafo de apoio. O fundo cinza quente, os cantos arredondados e o fade escuro continuam. A distância entre as duas frases do título aumentou.

No celular, foto e copy passam a participar do fluxo do documento. Isso evita cortes em telas baixas. A navegação vira uma pílula compacta com CTA e menu; as ações da hero têm largura proporcional ao texto.

## Processo

As ondas são uma decoração absoluta do conjunto Processo/Sobre. Uma compensação limitada ao percurso mantém sua posição durante o pin lateral; ao chegar à última etapa, a compensação deixa de crescer e as ondas acompanham normalmente a página. Em mobile e movimento reduzido, não há pin ou compensação.

## Depoimentos

Carrossel horizontal manual com cartões brancos, autoria bordô, título centralizado, setas circulares e prévia dos cartões vizinhos nas bordas. Scroll-snap nativo, swipe, setas do teclado e Home/End. Sem rotação automática. Os exemplos fictícios aprovados permanecem claramente identificados; não foram acrescentadas notas ou avaliações externas.

## Revisão responsiva

Corrigidos: limite antigo que estreitava o parágrafo no tablet; menu mobile sem rolagem em telas baixas; CTAs desproporcionais; áreas de toque pequenas; textos secundários e links no mobile; expansão mínima das colunas do footer que cortava links em 320px. Cases, materiais, FAQ, contato e crachá preservam seus comportamentos.

Auditoria inicial: 14 dimensões de tela. Verificação integrada final: 320×568, 390×844, 740×360, 768×1024, 820×1180, 1024×768, 1366×600, 1440×900, 1920×1080 e 2560×1440. Sem overflow horizontal de página, erros JavaScript ou recursos com falha. Testados pin/liberação, botões, teclado, swipe e movimento reduzido. Evidência em `docs/qa/round-seven/`.

Limite: emulação Edge/Chromium no Windows; não houve teste em aparelho físico ou Safari/iOS. Contato demonstrativo e fatos comerciais continuam como antes.
