# Segunda execução — escopo implementado

Somente os ajustes aprovados na segunda rodada: processo com rolagem lateral, arte contínua, crachá 3D, retirada da assinatura do Sobre, novos depoimentos animados e hover discreto dos ícones. A terceira execução permanece como proposta em PLANO-RODADA-3.md.

## Processo e ondas

Em telas a partir de 1001px de largura e 680px de altura, o processo usa uma cena sticky com quatro etapas em uma faixa horizontal. A passagem vertical da seção controla a translação e uma linha de progresso de 0 a 100%. A rolagem é liberada no término. Não há captura de roda do mouse ou bloqueio global da página.

Em telas menores ou com movimento reduzido, a faixa usa a rolagem horizontal nativa, com gesto, teclado e barra de progresso. A arte contínua pertence ao contêiner compartilhado entre Processo e Sobre; o SVG não é cortado nas bordas internas das antigas seções.

## Crachá

Cena WebGL local com Three.js 0.180.0, sem React. Cartão extrudado, ferragens, fotografia impressa, luzes, sombra e cordão deformável. A cadeia de pontos usa integração Verlet e restrições de distância; o arraste recebe mouse, caneta e toque. A área que captura o toque acompanha o cartão, deixando o restante da seção disponível para rolagem da página. Setas e Enter permitem interação pelo teclado.

O retrato frontal é a edição GPT Images já aprovada na hero, aplicada como textura em tempo de execução. Não foi necessária nova geração nem uma nova aparência para Julia. A cena é carregada quando o visitante se aproxima do Sobre e para de renderizar fora da área visível. Se WebGL não estiver disponível, permanece um crachá estático com o mesmo retrato.

Referência de interação: React Bits Lanyard, https://reactbits.dev/components/lanyard. Implementação local em JavaScript/Three.js; não instala nem depende do componente React. Three.js é distribuído localmente e sua licença acompanha a entrega.

## Depoimentos

Três colunas no desktop, em sentidos baixo/cima/baixo; duas no celular. Grupos duplicados permitem ciclos contínuos. Fades discretos nas bordas, movimento lento, pausa ao passar o mouse e botão explícito de pausa. A animação fica pausada fora da tela e com a aba oculta. Com movimento reduzido, o conteúdo fica estático e pode ser percorrido normalmente.

Todos os relatos e nomes exibidos nesse teste são fictícios, identificados na seção e nos cartões. Nenhum depoimento inventado foi atribuído a clientes reais da Julia. As provas dos cases continuam preservadas. Os depoimentos reais da primeira versão permanecem recuperáveis no histórico de código e nos arquivos originais fornecidos.

## Ícones

Deslocamento de -4px e inclinação de -3 graus ao passar pelo serviço ou acessar seu controle pelo teclado, com retorno suave. Sob movimento reduzido, o ícone permanece estático.

Arquivos: dist/second-round.css, dist/second-round.js e dist/badge-3d.js, mais alterações delimitadas em dist/index.html. Testes e capturas em docs/qa/round-two/.
