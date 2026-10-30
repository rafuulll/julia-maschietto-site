const {chromium}=require('C:/Users/WIN11/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=path.resolve(__dirname,'../docs/qa/refinements');fs.mkdirSync(dir,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 const report={errors:[],failedAssets:[],viewports:[],motion:{},projects:[]};
 page.on('pageerror',e=>report.errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)report.failedAssets.push(`${r.status()} ${r.url()}`)});
 await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
 await page.waitForTimeout(1300);
 for(const selector of ['.brand','.hero-signature','.hero-note','.service-note','.featured-project','#case-dialog'])assert.equal(await page.locator(selector).count(),0,selector);
 assert.equal(await page.locator('.project').count(),6);
 for(const width of [1440,1024,900,768,390,360,320]){
  await page.setViewportSize({width,height:width<761?844:1000});
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(350);
  const dims=await page.evaluate(()=>{
   const [a,b]=[...document.querySelectorAll('.hero-actions .btn')].map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,width:r.width}});
   return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,buttons:[a,b],mainActionVisible:a.width>0,secondActionVisible:b.width>0};
  });
  assert.ok(dims.scrollWidth<=width+1,`overflow at ${width}`);
  assert.ok(Math.abs(dims.buttons[0].y-dims.buttons[1].y)<2,`buttons not aligned ${width}`);
  assert.ok(dims.buttons[0].right<dims.buttons[1].x,`buttons overlap ${width}`);
  assert.ok(dims.mainActionVisible&&dims.secondActionVisible,`button hidden ${width}`);
  report.viewports.push(dims);
  if(width===1440||width===390)await page.screenshot({path:path.join(dir,width===1440?'desktop-hero.png':'mobile-hero.png')});
 }
 await page.setViewportSize({width:1440,height:1000});
 const conceptTop=await page.locator('#conceito').evaluate(e=>e.offsetTop);
 async function sample(position){
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),conceptTop-position*1000);await page.waitForTimeout(650);
  return page.locator('#concept-title').evaluate(el=>({total:el.querySelectorAll('.concept-word').length,lit:el.querySelectorAll('.on').length,opacity:[...el.querySelectorAll('.concept-word')].map(w=>+getComputedStyle(w).opacity)}));
 }
 report.motion.start=await sample(.9);
 report.motion.middle=await sample(.32);
 await page.screenshot({path:path.join(dir,'desktop-concept-progress.png')});
 const before=await page.locator('.concept-pill').first().getAttribute('style');await page.waitForTimeout(800);
 const after=await page.locator('.concept-pill').first().getAttribute('style');
 assert.notEqual(before,after,'tags must float while reading without scrolling');
 report.motion.floating=true;
 report.motion.end=await sample(-.15);
 assert.equal(report.motion.start.lit,0);
 assert.ok(report.motion.middle.lit>0&&report.motion.middle.lit<report.motion.middle.total);
 assert.equal(report.motion.end.lit,report.motion.end.total);
 await page.locator('#servicos').scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
 await page.screenshot({path:path.join(dir,'desktop-services.png')});
 for(const row of await page.locator('.project').all()){
  const id=await row.getAttribute('data-case');
  await row.locator('summary').hover();await page.waitForTimeout(300);
  assert.ok(await page.locator('.hover-preview').evaluate(e=>e.classList.contains('is-visible')),`preview missing ${id}`);
  await row.locator('summary').click();assert.equal(await row.evaluate(e=>e.open),true);
  if(id==='bahari'){
   assert.match(await row.innerText(),/Larissa Gomes/);
   assert.match(await row.innerText(),/249 mil/);
   assert.ok(await row.locator('img').evaluate(e=>e.complete&&e.naturalWidth>0));
   await page.screenshot({path:path.join(dir,'desktop-bahari-open.png')});
  }
  report.projects.push({case:id,preview:true,opens:true});
  await row.locator('summary').click();
 }
 await page.locator('#projetos').scrollIntoViewIfNeeded();await page.mouse.move(20,150);await page.waitForTimeout(900);
 await page.screenshot({path:path.join(dir,'desktop-projects.png')});
 await page.locator('.hero [data-contact]').click();assert.equal(await page.locator('#contact-dialog').evaluate(d=>d.open),true);await page.keyboard.press('Escape');
 await page.setViewportSize({width:390,height:844});
 await page.locator('#projetos').scrollIntoViewIfNeeded();await page.waitForTimeout(700);
 await page.screenshot({path:path.join(dir,'mobile-projects.png')});
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(300);
 await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'networkidle'});
 assert.equal(await page.locator('body').evaluate(b=>b.classList.contains('motion-enabled')),false);
 assert.equal(await page.locator('#concept-title').evaluate(e=>getComputedStyle(e).opacity),'1');
 report.motion.reducedMotion='static and readable';
 assert.equal(report.errors.length,0);assert.equal(report.failedAssets.length,0);
 fs.writeFileSync(path.join(dir,'report.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
