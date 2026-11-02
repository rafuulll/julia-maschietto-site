# Julia Maschietto — site e portfólio

Site profissional de Julia Maschietto, com landing page de serviços e portfólio para empresas. O projeto usa HTML, CSS e JavaScript; fotos, fontes e vídeos utilizados no site acompanham a entrega.

## Páginas

- `/` — serviços, projetos, trajetória e contato.
- `/portfolio/` — apresentação profissional e projetos de branding.
- `/portfolio/bahari/`, `/portfolio/sepulveda/`, `/portfolio/julia-nunes/` e `/portfolio/bruna/` — cases individuais.

## Publicar na Vercel

1. Envie **a pasta completa deste projeto** ao repositório GitHub `rafuulll/julia-maschietto-site`.
2. Na Vercel, importe esse repositório e mantenha a raiz do projeto na raiz do repositório.
3. O arquivo `vercel.json` já configura o framework como Other, o comando de build e a pasta de saída. Em **Settings → Environment Variables**, mantenha ativada a opção **Automatically expose System Environment Variables**. Ela costuma vir ativa em projetos novos.
4. Publique e confira a landing page, `/portfolio/` e os quatro cases no endereço fornecido pela Vercel.

O build copia `dist/` para `.vercel-static/` e substitui os endereços do site anterior pelo domínio de produção fornecido pela variável de sistema `VERCEL_PROJECT_PRODUCTION_URL`. Isso atualiza canônicos, imagens de compartilhamento, dados estruturados, sitemap, robots e documentos de conteúdo sem modificar os arquivos originais em `dist/`. Se a variável não estiver disponível, o build falha com uma mensagem explicativa, em vez de publicar os links antigos.

Em previews, os metadados também apontam para o domínio de produção. Se um domínio próprio for adicionado posteriormente, confira qual domínio a Vercel selecionou e faça um novo deploy para atualizar os metadados; a Vercel pode escolher o domínio personalizado mais curto. Caso queira outro domínio canônico, será necessário ajustar o build para essa preferência.

A publicação na Vercel e a hospedagem existente no Sites são independentes. Os depoimentos demonstrativos da landing page estão identificados como fictícios e devem ser revisados com a cliente antes do lançamento comercial.

## Visualizar localmente

Na raiz do projeto, com Python instalado:

```sh
python -m http.server 4173 --directory dist
```

Acesse `http://localhost:4173/` ou `http://localhost:4173/portfolio/`. Use um servidor HTTP para que caminhos absolutos e módulos funcionem corretamente. A visualização de `dist/` conserva os metadados do endereço anterior; o build da Vercel os adapta para a publicação.

## Organização

- `dist/` — site estático pronto, com páginas, estilos, scripts, metadados e `assets/`.
- `vercel.json` e `scripts/build-vercel.cjs` — configuração e preparação para publicação na Vercel.
- `styles/` — CSS de origem da landing page. `npm install` e `npm run build` recompilam `dist/site.min.css`; não é necessário para o deploy normal.
- `scripts/build-portfolio.py` e `scripts/portfolio_layout.py` — geração do portfólio e dos cases; requerem Python e Pillow. Os arquivos gerados já estão em `dist/`.
- `dist/config.js` — configuração de contato da landing page; o portfólio também possui links diretamente no HTML e no gerador.
- `assets-source/` — materiais de origem, não necessários para servir o site.
- `docs/`, `PRODUCT.md` e `DESIGN.md` — decisões e histórico. Documentos de rodadas anteriores podem descrever versões antigas.

## Contato

- WhatsApp: +55 15 99748-6580, com mensagem preenchida.
- E-mail: jumaschietto3@gmail.com.
- LinkedIn: https://www.linkedin.com/in/jumaschietto/.

## Verificação

`npm install` e `npm run check` verificam a landing page. O verificador de portfólio `scripts/check-portfolio.cjs` depende de ferramentas locais em `.tools/`, pasta não incluída no repositório, e não é exigido para a publicação estática. Confira também a navegação, os vídeos, os contatos e a apresentação em celular e computador após publicar.

## Microsoft Clarity e medição de contato

O projeto Clarity `z7jn58ca4k` é carregado por `dist/clarity-consent.js` apenas após a pessoa aceitar a análise de uso. A escolha pode ser alterada pelo botão **Preferências de privacidade** no rodapé; a recusa interrompe a coleta após a atualização da página. A preferência é salva no navegador. O sinal Consent V2 é enviado com análise permitida e anúncios negados após a aceitação.

O listener de clique registra o evento `whatsapp_click` nos links dos domínios `wa.me` e `api.whatsapp.com`, sem alterar seu destino e sem enviar telefone ou mensagem como parâmetros customizados. O clique mostra intenção, não confirma mensagem enviada nem venda. Visitantes que não aceitam análise, bloqueadores de conteúdo ou falhas de rede podem reduzir a cobertura. No painel Clarity, filtre as sessões pelo evento e página; não trate contagem de eventos como sessões únicas. Dados podem levar algumas horas para aparecer.

O aviso e o botão de preferências são implementados em `dist/clarity-consent.css` e `dist/clarity-consent.js`; estão vinculados à landing page e às páginas do portfólio. Consulte a documentação da Microsoft e revise a configuração de consentimento e mascaramento no painel antes de analisar gravações.
