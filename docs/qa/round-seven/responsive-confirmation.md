# Confirmação compacta de responsividade — sétima execução

Verificação após `seventh-round.css`, ajuste das ondas em `second-round.js` e integração do novo carrossel. Edge/Chromium headless; sem capturas adicionais e sem alterar produto.

Telas confirmadas: 320×568, 390×844, 740×360, 768×1024, 820×1180, 1366×600 e 2560×1440.

## Corrigido

- **Menu baixo:** `overflow-y:auto`; em740×360, scrollHeight439px e scrollTop79px, com o último link inteiramente acessível. Em320×568, os links agora cabem sem rolar.
- **Parágrafo tablet:** largura469.69px e altura49px em768/820, contra96.59×198.84px antes. Sem max-width370px sobrevivente.
- **CTAs:** navegação mobile44px de altura; hero48px no mobile e50px nos demais tamanhos. As ações continuam lado a lado, com largura suficiente. Em1366×600, terminam em y558 dentro do hero de576px.
- **Hero em fluxo no mobile:** altura720px em320 e790px em390; substitui o mínimo900px. Em390×844, botões terminam em y766 e cabem no primeiro viewport. Em320×568, o conteúdo necessita rolagem, mas permanece no fluxo e não colide com a foto.
- **Alvos nas seções:** todos os links de serviço, tabs, ampliar entrega, trajetória, FAQ CTA e footer mediram44px; controles do novo carrossel46px. Fechar dialog tem44px nominal no CSS; os valores43.1–43.3px no JSON foram coletados durante a animação de entrada com scale e não representam o estado final.
- **Ondas:** durante início/meio/fim do pin, top≈0px e progresso0/50/100%;200/400px após o final, top−200/−400px enquanto About acompanha o mesmo deslocamento. Liberação confirmada.
- Nenhum erro JS. Nenhum overflow horizontal de página nos sete tamanhos, inclusive com cases e FAQ abertos. Contato abre em todos os tamanhos e mantém overflow interno nas telas baixas.

## Regressão estreita encontrada

**P2 — Links finais do footer cortados em320px.** A fonte mobile do footer subiu para13px, mas a grade continua `1fr 1fr` com mínimo automático. A largura mínima dos dois conjuntos mais o gap ultrapassa a largura do container. Medido: Perguntas frequentes começa em x186.48 e mede131.52px, terminando em x318; o frame arredondado termina em x312 com `overflow:hidden`, cortando aproximadamente6px. Projetos e resultados termina em x313.95, também próximo do corte. Isso não aumenta scrollWidth da página justamente por causa do clipping.

Correção pontual recomendada: usar `grid-template-columns:repeat(2,minmax(0,1fr))` no footer mobile, `min-width:0` nos filhos e permitir que os links respeitem `max-width:100%`/`width:auto` e quebrem linha quando necessário, preservando44px mínimos. Nenhuma mudança de conteúdo ou estética necessária.

A regressão foi comunicada ao agente principal. Não foi feita nova rodada de screenshots.

Dados completos: `responsive-confirmation.json`. O relatório confirma os defeitos materiais previamente medidos; não substitui testes físicos de Safari/iOS ou Android.
