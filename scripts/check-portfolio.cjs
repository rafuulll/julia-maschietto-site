const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist');
const {HtmlValidate}=require(path.join(root,'.tools/final-deps/node_modules/html-validate/dist/cjs/index.js'));
(async()=>{
 const validator=new HtmlValidate({extends:['html-validate:standard'],rules:{'void-style':'off','attr-quotes':['error',{style:'double'}],'no-trailing-whitespace':'off'}});
 const files=['portfolio/index.html',...['bahari','sepulveda','julia-nunes','bruna'].map(x=>`portfolio/${x}/index.html`)];
 const report=[];
 for(const file of files){const html=fs.readFileSync(path.join(dist,file),'utf8'),result=await validator.validateString(html,file);const errors=result.results.flatMap(r=>r.messages.map(m=>({line:m.line,rule:m.ruleId,message:m.message})));const missing=[],fragments=[];
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  for(const m of html.matchAll(/\b(?:src|href|poster|data-src)="([^"#][^"]*)"/g)){
   const raw=m[1];if(/^(https?:|mailto:|data:)/.test(raw))continue;
   const url=new URL(raw,'https://local/'+file.replace(/index.html$/,''));let resolved=path.join(dist,decodeURIComponent(url.pathname));if(url.pathname.endsWith('/'))resolved=path.join(resolved,'index.html');
   if(!fs.existsSync(resolved)){missing.push(raw);continue;}
   if(url.hash&&resolved.endsWith('.html')&&!fs.readFileSync(resolved,'utf8').includes(`id="${url.hash.slice(1)}"`))fragments.push(raw);
  }
  for(const m of html.matchAll(/href="#([^"]+)"/g))if(!ids.includes(m[1]))fragments.push(m[1]);
  report.push({file,errors,missing,fragments,h1Count:[...html.matchAll(/<h1\b/g)].length,duplicateIds:ids.filter((x,i)=>ids.indexOf(x)!==i),canonical:html.match(/rel="canonical" href="([^"]+)"/)[1],schema:!!JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])});
 }
 const js=spawnSync(process.execPath,['--check',path.join(dist,'portfolio/portfolio.js')],{encoding:'utf8'});
 fs.mkdirSync(path.join(root,'docs/qa/portfolio'),{recursive:true});fs.writeFileSync(path.join(root,'docs/qa/portfolio/static.json'),JSON.stringify({pages:report,jsSyntax:js.status===0},null,2));console.log(JSON.stringify({pages:report,jsSyntax:js.status===0},null,2));
 if(js.status||report.some(x=>x.errors.length||x.missing.length||x.fragments.length||x.duplicateIds.length||x.h1Count!==1))process.exitCode=1;
})();
