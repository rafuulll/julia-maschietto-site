# Plano de finalização — Julia Maschietto

Data: 30/10/2026. Status: plano aprovado e executado na rodada final. Resultados, evidências e limites de verificação estão em FINALIZACAO.md.

## Direção e escopo

Preservar a identidade editorial, vinho, fundo claro quente, tipografias e fotos originais. Finalizar o projeto existente, sem recomeçar o design ou migrar de framework. A última orientação prevalece: texto antes do crachá em mobile, conforme a confirmação mais recente; hero sem a textura alternativa; dois stories traseiros parcialmente escondidos pela Julia e story frontal preservado.

## Diagnóstico preliminar confirmado

- O HTML contém `noindex,nofollow`. É necessário retirar esse bloqueio na versão definitiva que deverá ser indexada.
- Não existem arquivos `robots.txt`, `sitemap.xml` e `llms.txt` no diretório publicado.
- A imagem Open Graph usa caminho relativo. Canonical e identificação completa da URL pública precisam ser preparados.
- O favicon atual é um J em Georgia dentro de um quadrado vinho arredondado, dependente de tipografia genérica.
- Há 11 folhas de estilo acumuladas entre rodadas, candidatas a consolidação com comparação visual.
- As três imagens da hero já estão em WebP, com aproximadamente 113–138 KB cada. Não há motivo para recomprimir indiscriminadamente.
- Os três vídeos dos books somam aproximadamente 6,6 MB; isso não equivale ao peso inicial da página, pois usam carregamento sob demanda.
- No notebook examinado, vídeo e contêiner têm as mesmas dimensões. Um filete claro é perceptível; ainda é necessário isolar se vem da máscara, de pixels fracionários ou do frame do vídeo.
- A ordem mobile atual apresenta texto antes do crachá; será revertida conforme a última solicitação.

## 1. Correções pontuais e identidade

- Ajustar o encaixe do vídeo na tela do notebook. Conferir todos os books, vários frames, zoom e densidade de pixels. Não deformar o vídeo nem cortar conteúdo relevante para esconder o defeito.
- Aproximar os dois stories traseiros da personagem, com sobreposição parcial natural. Preservar o story frontal, o PNG original da Julia, o fundo atual e o degradê inferior. Verificar desktop, tablet e celular.
- Manter a tipografia antes do crachá em mobile, conforme a correção de escopo na autorização final, preservando a composição desktop e uma ordem de leitura acessível coerente.
- Retirar exatamente “Versão de apresentação” do footer.
- Criar favicon vetorial próprio: monograma JM simplificado, com desenho coerente com a marca e legibilidade real a 16 e 32 px. Exportar SVG, ICO e ícone Apple apropriados; verificar em abas claras e escuras. Evitar depender de uma fonte instalada.

Aceite: ausência do filete perceptível, rosto original preservado, stories corretamente sobrepostos, ordem mobile correta e favicon legível em tamanho real.

## 2. Revisão de UX e conteúdo

- Revisar a jornada: proposta da hero → serviços → evidências e projetos → processo → sobre → contato.
- Conferir que os CTAs de contato abrem WhatsApp com número e mensagem corretos; links de projetos, email e LinkedIn devem levar ao destino correspondente. Testar links sem enviar mensagens.
- Conferir menu mobile, navegação por âncoras e compensação da altura do menu fixo.
- Eliminar qualquer captura indevida de rolagem em depoimentos, processo, galeria ou modal. Testar rolagem para baixo e para cima.
- Revisar troca de projetos, início automático de vídeos, pausa fora da tela, carregamento e falhas. Garantir imagem alternativa quando autoplay não estiver disponível.
- Revisar clareza dos serviços e contexto das métricas dos cases, sem alterar ou inventar resultados.
- Remover o rótulo de apresentação do footer como solicitado. As indicações locais de depoimentos fictícios permanecem enquanto os textos forem ilustrativos; não gerar dados estruturados de avaliações a partir deles.

## 3. Revisão de UI e responsividade

- Auditar larguras de conteúdo, alinhamentos, ritmo vertical e transições entre seções.
- Conferir título da hero, entrelinhas, texto de apoio e proporção dos CTAs em todas as larguras.
- Equilibrar mídia e texto dos projetos, especialmente imagens verticais, sem grandes vazios nem cortes desnecessários.
- Revisar a intensidade do fade dos depoimentos; preferir bordas discretas e manter texto legível.
- Garantir tags afastadas da tipografia e posicionadas nos cantos em telas pequenas; verificar os estados inicial, intermediário e final da animação.
- Conferir ondinhas dentro das seções, sem interferir no texto nem permanecer presas à viewport após o trecho correspondente.
- Verificar áreas de toque, foco visível, contraste, textos longos e ausência de rolagem horizontal acidental.

Matriz de larguras representativas: 320, 360, 390, 430, 768, 820, 1024, 1280, 1440 e 1920 px. Incluir alturas baixas, orientação horizontal e zoom de 200%. Redimensionar também entre os breakpoints para encontrar falhas intermediárias.

## 4. Acessibilidade e comportamento resiliente

- Testar navegação por teclado, ordem de foco, Escape, fechamento de modais e retorno do foco ao acionador.
- Verificar semântica dos títulos, botões, abas, controles e descrições de imagens; elementos decorativos não devem poluir leitores de tela.
- Respeitar preferência por movimento reduzido e disponibilizar pausa quando necessária em conteúdo animado contínuo.
- Conferir a página sem WebGL, com mídia indisponível e em conexão lenta. O conteúdo essencial deve continuar acessível quando uma animação não iniciar.
- Auditar com ferramenta automatizada de acessibilidade e conferir manualmente os fluxos. Relatório automático sozinho não comprova acessibilidade.

## 5. Desempenho e manutenção

- Medir o estado inicial antes das mudanças e repetir nas mesmas condições após as otimizações.
- Consolidar CSS acumulado, remover regras e arquivos não utilizados após auditoria de referências e comparar screenshots antes/depois.
- Otimizar imagens por uso real: WebP/AVIF quando houver ganho, dimensões adequadas, variantes responsivas, dimensões reservadas e carregamento tardio fora da primeira dobra. Priorizar apenas a mídia crítica da hero.
- Converter fontes locais para WOFF2 quando houver ganho e preservar caracteres portugueses; revisar carregamento e evitar saltos de layout.
- Manter vídeos em formato de vídeo. Comparar MP4 e WebM por tamanho, qualidade e compatibilidade; não transformar os mockups em GIF. Remover áudio, ajustar resolução, qualidade e quadros por segundo quando houver ganho visualmente aceitável.
- Verificar que apenas a mídia necessária é baixada/reproduzida, que a troca de projeto inicia o vídeo correto e que reprodução para fora da viewport ou com aba oculta.
- Revisar custo do crachá 3D e animações: adiar trabalho fora da tela, suspender renderização desnecessária e usar alternativa estática quando apropriado.
- Verificar cache, compressão e entrega de arquivos conforme as opções reais da hospedagem.

Metas de experiência: LCP até 2,5 s, CLS até 0,1 e INP até 200 ms no percentil 75 dos dados reais, quando houver amostra. Lighthouse ajuda a diagnosticar em laboratório, mas não prova INP real. Registrar valores medidos e limitações; não prometer nota 100.

## 6. SEO técnico, compartilhamento e descoberta

- Definir URL canônica com o domínio efetivo. Usar o endereço atual enquanto não houver domínio próprio configurado; evitar migração de URL implícita.
- Retirar `noindex,nofollow` da versão definitiva e verificar também cabeçalhos HTTP que possam bloquear indexação.
- Criar `robots.txt` coerente com a publicação e apontando para o sitemap.
- Criar `sitemap.xml` com URLs canônicas reais. Âncoras de seções não serão inventadas como páginas distintas.
- Revisar título, descrição, idioma, H1/H2, textos alternativos e links descritivos.
- Completar canonical, Open Graph e Twitter Card, com URLs absolutas e imagem de compartilhamento atualizada.
- Preparar JSON-LD compatível com o conteúdo visível: pessoa/profissional, site e serviços quando aplicável. Conferir nomes, contato e LinkedIn. Não inventar endereço, avaliações ou credenciais.
- Validar HTTPS, redirecionamentos, links quebrados, arquivos 404 e comportamento de URLs inválidas dentro das capacidades da hospedagem.
- Preparar envio de sitemap e inspeção no Search Console. Conclusão dessa etapa depende de acesso à propriedade; indexação efetiva depende do buscador.

## 7. GEO/AEO e llms.txt

- Tornar explícitos no HTML quem é Julia, quais serviços oferece, para quem trabalha, sua experiência e como entrar em contato.
- Escrever respostas diretas às dúvidas que realmente ajudam o visitante, sem aumentar a página apenas para repetir palavras-chave.
- Manter contexto e origem das métricas de cada projeto, facilitando interpretação humana e automática.
- Criar `llms.txt` pequeno, factual e atualizado, com apresentação e referências para o conteúdo público relevante. Não incluir dados privados nem tratar exemplos fictícios como evidências.
- Manter consistência entre página, metadados e arquivos auxiliares. `llms.txt` é uma proposta complementar, sem garantia de ranqueamento ou citação. A documentação do Google não exige um arquivo especial de IA para suas experiências de busca.

## 8. Validação e entrega

- Verificações estáticas: referências de assets, links, sintaxe, metadados, sitemap, robots e JSON-LD.
- Fluxos manuais: menu, CTAs, âncoras, abas, projetos, zoom, modais, depoimentos, processo, crachá e footer.
- Vídeos: entrada na seção, troca de projeto, rolagem para fora e retorno, aba oculta, carregamento lento e bloqueio de autoplay.
- Responsividade: matriz acima, touch, teclado, movimento reduzido e orientação horizontal.
- Navegadores: Chromium e outros motores disponíveis; Safari/iOS precisam de verificação real quando houver acesso. Não registrar emulação de tamanho como teste de navegador/dispositivo real.
- Lighthouse/PageSpeed mobile e desktop quando disponíveis: três execuções em condições equivalentes, mediana e análise das causas, além de auditoria de acessibilidade.
- Verificar console e requisições durante os principais fluxos; corrigir falhas reproduzíveis.
- Comparar capturas de referência antes/depois, especialmente após consolidar CSS e otimizar mídia.
- Publicar versão identificada, manter possibilidade de retorno e repetir a conferência crítica na URL pública.
- Entregar relatório com mudanças, medidas antes/depois, testes aprovados e limitações não verificadas. Monitoramento de campo e indexação poderão continuar após a publicação.

## Skills selecionadas

Já disponíveis:

- **Impeccable:** auditoria, refinamento visual, adaptação responsiva, acessibilidade e otimização.
- **Design Taste Frontend:** preservar uma identidade editorial consistente e evitar soluções visuais genéricas.
- **Sites:** validar empacotamento, versão e publicação do site existente.

Encontradas na pesquisa, ainda não instaladas:

| Skill | Aplicação | Instalações aproximadas na consulta |
| --- | --- | --- |
| [seo-audit](https://skills.sh/coreyhaines31/marketingskills/seo-audit) | Indexação e SEO técnico e de conteúdo | 242 mil |
| [ai-seo](https://skills.sh/coreyhaines31/marketingskills/ai-seo) | Clareza de entidades e conteúdo para descoberta em respostas de IA | 154,5 mil |
| [web-perf](https://skills.sh/cloudflare/skills/web-perf) | Diagnóstico de carregamento, mídia e métricas | 114,5 mil |

Fontes verificadas: repositório [Marketing Skills](https://github.com/coreyhaines31/marketingskills), cerca de 57,5 mil estrelas, e repositório oficial [Cloudflare Skills](https://github.com/cloudflare/skills), cerca de 3,2 mil estrelas. Popularidade serve como triagem, não como garantia. Recomendações técnicas serão confrontadas com documentação primária. A skill web-perf tem recursos que dependem de ferramentas de rastreamento do navegador; usar somente capacidades realmente disponíveis e registrar limitações.

Comandos de instalação, caso essas skills sejam adotadas na execução:

```sh
npx skills add coreyhaines31/marketingskills --skill seo-audit
npx skills add coreyhaines31/marketingskills --skill ai-seo
npx skills add cloudflare/skills --skill web-perf
```

## Referências técnicas

- [Otimização de vídeo — web.dev](https://web.dev/learn/performance/video-performance)
- [Core Web Vitals — Google](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Recursos de IA na Busca — Google](https://developers.google.com/search/docs/appearance/ai-features)
- [Proposta llms.txt](https://llmstxt.org/)
- [Políticas de dados estruturados — Google](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
