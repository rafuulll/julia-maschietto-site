# Terceira execução — proposta aprovada e aplicada

Atualização: o usuário autorizou esta execução. Os quatro itens abaixo foram aplicados, escolhendo Vamos conversar. Verificação desktop/mobile em docs/qa/round-three/report.json. O plano da quarta execução está em RETOMADA-RODADA-4.md. O texto abaixo preserva o registro original da proposta.

Esta rodada está reservada para uma nova autorização do usuário. A segunda execução não remove o texto do notebook, a marca grande do footer, os CTAs antigos nem altera o comportamento do FAQ.

1. Remover somente a frase “Um recorte do trabalho, por dentro.”. Manter o botão Ampliar a entrega e o notebook.
2. Remover a assinatura gráfica grande “Julia Maschietto.” do footer. Manter o crédito pequeno de copyright. Recalibrar altura e espaços do rodapé para não sobrar uma área vazia.
3. Padronizar os CTAs que ainda dizem “Conversar sobre meu projeto”. Recomendação: “Vamos conversar”, já utilizado no menu e na hero, curto e adequado às três frentes. Alternativas: “Falar com a Julia” (contato pessoal explícito) e “Conversar sobre minha marca” (mais contextual, porém maior). Não há dados para afirmar que uma formulação converte mais; a escolha inicial combina clareza, coerência e baixo compromisso.
4. Aplicar sticky ao bloco esquerdo completo do FAQ: título, texto e link. Ele permanece abaixo do menu durante a rolagem das perguntas e é liberado no fim da seção, inclusive com respostas abertas. No celular, o bloco segue no fluxo normal para preservar espaço de leitura.

Referência verificada na página atual https://minicurso.natdesigner.com/: `.faq-head` usa `position:sticky;top:140px`, com retorno a `position:static` abaixo de 900px. Na LP de Julia, a distância será ajustada à altura real da navegação flutuante. Trata-se de fixação dentro da seção, sem animação de letras ou movimentação artificial do texto.

Antes de executar: confirmar a preferência de CTA na conversa. Esta proposta não autoriza mudanças além dos quatro itens.
