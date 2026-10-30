# Revisão final da oitava execução

Escopo: Bahari em destaque, fallback vertical do processo, passagem pela seção dos depoimentos, fade mais restrito e quatro tags fora do texto. Hero raster somente para aprovação desktop; a hero atual não foi modificada.

Inspeção visual em lote: tags320/390/768/1440/2560, Bahari390/1440, carrossel1440 e sequência do processo. A primeira verificação detectou uma grade herdada com duas colunas no fallback; foi corrigida explicitamente para uma coluna. A confirmação funcional passou nas dez telas e sem JavaScript.

Bahari tem hierarquia de projeto, imagem, resultado e evidência, com figura ilustrativa identificada e provas/atribuições reais no details. Os outros cinco projetos continuam expansíveis. Carrossel usa cartões legíveis e mostra vizinhos sem o fade largo anterior. A roda vertical deslocou a página446px para um delta450, tanto no primeiro como no último cartão; a rolagem inversa também passou. Gesto vertical touch deslocou195px; swipe horizontal mudou342px no rail.

Fallback vertical: quatro blocos sequenciais dentro da largura, barra0/50/100 conforme passagem, sem pin com movimento reduzido e sem exigir gesto lateral quando o módulo não executa. Desktop compatível continua com pin lateral e ondas liberadas ao final. Tags não interceptam o retângulo da tipografia nas dez larguras verificadas.

Scan mecânico de layout em `eighth-round.css` e `testimonials-carousel.css`: nenhum achado. Sem erro JavaScript no relatório. Evidência limitada a Edge/Chromium emulado; não se afirma validação física ou universal. Sem defeito material pendente no escopo implementado. A decisão sobre a nova hero continua com o usuário.
