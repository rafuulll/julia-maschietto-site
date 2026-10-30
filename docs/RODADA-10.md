# Décima rodada

As tags foram comparadas visualmente com o projeto 4/6, Letícia Bassan, no minicurso da Nat Designer: https://minicurso.natdesigner.com/. A janela do exemplo foi rolada por dentro. A implementação responde à passagem da seção: entrada, deslocamento e inclinação por pares, com atraso nas tags inferiores. Não há flutuação contínua pelo tempo; voltar a página reverte o mesmo percurso. Movimento reduzido mantém texto e tags legíveis e estáticos.

Os dez CTAs de contato abrem diretamente o WhatsApp oficial +55 15 99748-6580 com mensagem preenchida. Serviços usam contexto específico. E-mail jumaschietto3@gmail.com e LinkedIn /in/jumaschietto/ estão ativos. O envio da mensagem continua sendo uma ação da pessoa no WhatsApp.

A hero usa o PNG transparente `grdr 2025-08-01 163616.323 1.png` fornecido pelo cliente. O RGB original foi preservado na extração; apenas escala, recorte de transparência e suavização da base são aplicados na composição. O rosto não foi gerado nem retocado. Os três stories foram reconstruídos com fotografias originais monocromáticas e interface decorativa, eliminando cabelos externos herdados da composição anterior. O superior direito foi aproximado do retrato. Há três imagens raster para desktop, tablet e celular.

Depois da implementação principal, foi gerado somente um fundo de textura, usando image_gen integrado. A alternativa usa um tecido de palco/papel fosco muito suave, cinza quente e marfim, composto com o mesmo PNG original. Está em `output/imagegen/hero-textura-round10.png`, para comparação, sem substituir a hero principal. O prompt está em `hero-texture-round10-prompt.json`.

Conferência: navegador real com iframes responsivos de 320, 390, 768, 1024, 1200 e 1440 px; sem transbordamento horizontal. Verificados destinos de contato, fontes das imagens e movimento reversível/estável das tags. Não representa teste em aparelhos físicos. Evidências em `qa/round-ten/`.

## Complemento de mídia solicitado durante a execução

A ampliação passou a ajustar a caixa à largura e altura do arquivo, respeitando os limites da tela. O painel branco foi removido. Miniaturas mantêm a proporção original, sem faixas pretas acrescentadas pelo componente.

Os três vídeos da pasta `videos mockup` substituem as capas estáticas dentro do notebook: IMG_3385 para Leticia Isse, IMG_3387 para Dra. Nathalia e IMG_3388 para Novo Método. Exportados em MP4 H.264 1280×720, sem áudio, com faststart, repetição e reprodução inline. Iniciam por chegada à seção e troca de aba; pausam fora dela ou com a página oculta. Não há controles nativos nem botão de play sobre o vídeo. Há um controle discreto de pausa, e a preferência por movimento reduzido conserva o pôster estático. O diálogo ampliado também reproduz o vídeo automaticamente.

Capas de mouse atualizadas para Sepulveda, Júlia Nunes, Bruna e Copa com as pastas fornecidas. Copa exibe as três peças em galeria ampliável; Sepulveda combina produto e relato da cliente. As provas e atribuições de resultados foram preservadas. Procedência em `media-update-round10.json`.

Verificação adicional confirmou os três vídeos com reprodução ativa e sem controles, autoplay por chegada no celular, pausa ao sair e miniaturas com caixa do mesmo tamanho da imagem. A caixa do print ampliado e o print mediram exatamente as mesmas dimensões, sem sobra branca. Relatório em `qa/round-ten/media-report.json`.
