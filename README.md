# Julia Maschietto — Landing page V1

Primeira versão de apresentação em HTML, CSS e JavaScript. Abra `dist/index.html` ou sirva a pasta `dist` com qualquer servidor estático. Os arquivos prontos para hospedagem estão integralmente em `dist/`; nenhuma compilação é necessária.

## Visualizar localmente

Com Python instalado, execute na pasta do projeto:

```sh
python -m http.server 4173 --directory dist
```

Acesse http://localhost:4173. A cópia da mensagem usa a área de transferência do navegador; em hospedagem definitiva, utilize HTTPS.

## O que está implementado

- Retrato editorial tratado com GPT Images e recorte responsivo.
- Manrope e Instrument Serif Italic hospedadas localmente.
- Menu flutuante, menu móvel, botões com texto deslizante e seta circular.
- Entrada de palavras, revelação do manifesto conforme a rolagem e navegação suave no desktop.
- Cases com resultados visíveis, detalhes expansíveis e prévia de imagem no mouse.
- Materiais reais em um mockup de notebook, seleção por teclado e ampliação.
- Sobre Julia com fotografia original tratada; depoimentos, processo e FAQ.
- Rodapé em vídeo leve, controle de pausa e respeito à preferência por movimento reduzido.
- Contato em modo de demonstração: abre a mensagem e permite copiá-la; não envia mensagens.

## Ativar o WhatsApp oficial

Edite `dist/config.js` após receber o número confirmado:

```js
window.JULIA_SITE = Object.freeze({
  demo: false,
  whatsapp: '55DDNUMERO', // Somente dígitos: país, DDD e número confirmado.
  defaultMessage: 'Olá, Julia! Quero conversar sobre um projeto para a minha marca.'
});
```

Com um número válido, os botões abrem o WhatsApp com a mensagem preenchida. A pessoa confirma o envio no WhatsApp. Remova o e-mail `ola@julia.example` e substitua pelo contato oficial. Nenhuma solicitação ou formulário é armazenado por esta página.

## Antes do lançamento comercial

Consulte `docs/ANTES-DE-PUBLICAR.md`. Esta V1 é uma apresentação, com `noindex,nofollow`, contato demonstrativo, um prazo ilustrativo e uma imagem conceitual identificada. Os resultados apresentados foram extraídos dos materiais fornecidos e mantêm os créditos e contextos descritos.

## Organização

- `dist/index.html`: estrutura e textos.
- `dist/styles.css`: identidade visual e comportamento responsivo.
- `dist/app.js`: navegação, animações, cases, livros, contato e vídeo.
- `dist/config.js`: contato configurável.
- `dist/assets/`: fotografias, materiais, ícones, fontes e vídeo.
- `PRODUCT.md`, `DESIGN.md`: contexto do produto e sistema visual.
- `docs/`: critérios, procedência das imagens, prompts e revisão.

## Referências e recursos

Referência principal indicada pelo cliente: Leticia Bassan, incluindo o exemplo do minicurso da Nat Designer. A implementação e a identidade de Julia foram produzidas para esta versão; fotos e vídeo da clínica de referência não foram reutilizados.

Recursos: GPT Images (edições dos retratos, composição ilustrativa Bahari e textura de seda), Manrope, Instrument Serif, Phosphor Icons e Lenis. O vídeo foi produzido a partir da textura gerada, com movimento suave de tecido. Os créditos detalhados estão em `docs/ASSETS.md`.
