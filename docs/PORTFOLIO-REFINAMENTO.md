# Refinamento da organização do portfólio

Implementado em 2 de novembro de 2026, após o plano apresentado à usuária.

- Um único notebook, três seletores nomeados e estado ativo explícito. Seleção atualiza imagem, vídeo, texto, escopo e ampliação em conjunto. Navegação por setas, Home e End. Os três escopos permanecem no HTML; sem JavaScript, os links e detalhes nativos continuam acessíveis.
- Preview alinhado ao topo, independente da altura dos detalhes. Na versão compacta, o preview vem antes da descrição e do escopo. Não há posição fixa na janela nem rolagem interna.
- Bahari: participação ao lado do filme, par de evidências de resultados e capítulo separado de comunicação/bastidores. Prints informativos preservados sem recortes, com ampliação proporcional.
- Júlia Nunes: dois filmes agrupados; três capturas de resultados alinhadas em outra seção. No celular, os registros se empilham para preservar a leitura.
- Sepulveda: abertura com produtos, duas fotografias adicionais fornecidas pela usuária, participação e resultado comercial contextualizado. Relato original acompanhado dos valores informados pela cliente. Fotografias não atribuídas a Julia.
- Bruna Mariana: imagem de apresentação ao lado da participação, feed em um capítulo próprio e quatro capturas individuais de resultados, extraídas das imagens originais do PDF de portfólio. A pequena montagem foi substituída pelos registros separados, em melhor resolução. Produção textual creditada à cliente.
- Footer do portfólio e dos quatro cases reutiliza a composição e o vídeo de seda da página comercial. Carregamento por proximidade, pausa manual, interrupção fora da tela e respeito à preferência por movimento reduzido.

## Verificação

- Cinco páginas × cinco larguras: 320, 390, 768, 1024 e 1440 px. Sem overflow horizontal ou imagens carregadas com erro.
- Abertura dos três escopos em cada largura: deslocamento do preview de **0 px** em todas as 15 verificações, sem manipulação da rolagem pelo teste.
- Quinze testes de mídia e teclado: seleção dos projetos, autoplay, pausa, ampliação do vídeo selecionado, fechamento, tecla Home e reprodução/pausa do footer.
- Dez verificações automatizadas de acessibilidade nas cinco páginas, em celular e desktop: nenhuma violação. Isso não substitui auditoria completa com leitores de tela e aparelhos reais.
- HTML, sintaxe JavaScript, caminhos de mídia, IDs, fragmentos e metadados verificados pelo script do projeto.

Evidências em `docs/qa/portfolio-v14/`. Testes de renderização usam Chromium; não representam execução física em todos os modelos de celular/tablet.

`scripts/portfolio_layout.py` concentra as novas composições, e `scripts/build-portfolio.py` continua responsável pelos fatos e pela geração das páginas. A landing page comercial e a hero não foram alteradas nesta revisão.
