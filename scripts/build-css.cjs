const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const dependencies = fs.existsSync(path.join(root,'node_modules/postcss'))
  ? path.join(root,'node_modules') : path.join(root,'.tools/final-deps/node_modules');
const postcss = require(path.join(dependencies,'postcss'));
const cssnano = require(path.join(dependencies,'cssnano'));
const order = ['styles.css','second-round.css','third-round.css','fourth-round.css','sixth-round.css','seventh-round.css','testimonials-carousel.css','eighth-round.css','ninth-round.css','tenth-round.css','media-update.css','final.css'];
(async () => {
  const original = order.map(name => fs.readFileSync(path.join(root,'styles',name),'utf8')).join('\n');
  const source = original.replaceAll("assets/fonts/manrope.ttf') format('truetype')", "assets/fonts/manrope.woff2') format('woff2')")
    .replaceAll("assets/fonts/instrument-serif-italic.ttf') format('truetype')", "assets/fonts/instrument-serif-italic.woff2') format('woff2')");
  const result = await postcss([cssnano({preset:['default',{mergeRules:false,discardUnused:false,reduceIdents:false}]})]).process(source,{from:undefined,map:false});
  fs.writeFileSync(path.join(root,'dist/site.min.css'),result.css);
  console.log(JSON.stringify({sourceFiles:order.length,sourceBytes:Buffer.byteLength(source),productionBytes:Buffer.byteLength(result.css),requestsBefore:11,requestsAfter:1}));
})().catch(error => { console.error(error.message); process.exitCode=1; });
