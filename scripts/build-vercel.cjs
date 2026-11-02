const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'dist');
const output = path.join(root, '.vercel-static');
const oldOrigin = 'https://julia-maschietto-estudio.classyscout131.chatgpt.site';
const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
if (!host || !/^[a-z0-9.-]+(?::\d+)?$/i.test(host)) {
  throw new Error('VERCEL_PROJECT_PRODUCTION_URL ausente ou inválido. Ative as variáveis de sistema na Vercel.');
}
const origin = `https://${host}`;
fs.rmSync(output, { recursive: true, force: true });
fs.cpSync(source, output, { recursive: true });
let updated = 0;
function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(file);
    else if (/\.(html|txt|xml|md)$/i.test(entry.name)) {
      const content = fs.readFileSync(file, 'utf8');
      const next = content.replaceAll(oldOrigin, origin);
      if (next !== content) { fs.writeFileSync(file, next); updated++; }
    }
  }
}
visit(output);
console.log(`Arquivos preparados: ${updated}. Domínio de produção: ${origin}`);
