const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist');
const deps=fs.existsSync(path.join(root,'node_modules/html-validate'))?path.join(root,'node_modules'):path.join(root,'.tools/final-deps/node_modules');
(async()=>{
 const {HtmlValidate}=require(path.join(deps,'html-validate/dist/cjs/index.js'));
 const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
 const validator=new HtmlValidate({extends:['html-validate:standard'],rules:{'void-style':'off','attr-quotes':['error',{style:'double'}],'no-trailing-whitespace':'off'}});
 const result=await validator.validateString(html,'index.html');
 const errors=result.results.flatMap(r=>r.messages.map(m=>({rule:m.ruleId,line:m.line,message:m.message})));
 const notFound=await validator.validateString(fs.readFileSync(path.join(dist,'404.html'),'utf8'),'404.html');
 errors.push(...notFound.results.flatMap(r=>r.messages.map(m=>({file:'404.html',rule:m.ruleId,line:m.line,message:m.message}))));
 const missing=[],fragments=[],ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
 for(const m of html.matchAll(/\b(?:src|href|poster|data-open-media|data-preview|data-video)="([^"#][^"]*)"/g)){
  const raw=m[1];if(/^(?:https?:|mailto:|data:)/.test(raw))continue;
  const relative=raw.split(/[?#]/)[0];if(relative&&!fs.existsSync(path.join(dist,relative)))missing.push(raw);
 }
 for(const m of html.matchAll(/href="#([^"]+)"/g))if(!ids.includes(m[1]))fragments.push(m[1]);
 const css=fs.readFileSync(path.join(dist,'site.min.css'),'utf8');
 for(const m of css.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g))if(!m[1].startsWith('data:')&&!fs.existsSync(path.join(dist,m[1])))missing.push(m[1]);
 for(const filename of ['app.js','second-round.js','badge-3d.js','testimonials-carousel.js','config.js']){
  const check=spawnSync(process.execPath,['--check',path.join(dist,filename)],{encoding:'utf8'});if(check.status)errors.push({file:filename,message:check.stderr});
 }
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 const duplicateIds=ids.filter((id,i)=>ids.indexOf(id)!==i);
 const report={htmlValid:result.valid,htmlMessages:errors,missingAssets:[...new Set(missing)],missingFragments:fragments,duplicateIds,h1Count:[...html.matchAll(/<h1\b/g)].length,canonical:html.match(/rel="canonical" href="([^"]+)"/)[1],indexable:!/<meta name="robots" content="[^"]*noindex/.test(html),structuredDataTypes:graph['@graph'].map(x=>x['@type']),hasReviewSchema:graph['@graph'].some(x=>['Review','AggregateRating'].includes(x['@type'])),crawlFiles:['robots.txt','sitemap.xml','llms.txt','index.md'].every(x=>fs.existsSync(path.join(dist,x))),stylesheets:[...html.matchAll(/rel="stylesheet"/g)].length};
 fs.mkdirSync(path.join(root,'docs/qa/final'),{recursive:true});fs.writeFileSync(path.join(root,'docs/qa/final/static-report.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
 if(errors.length||missing.length||fragments.length||duplicateIds.length||report.h1Count!==1||!report.indexable)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
