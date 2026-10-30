const { chromium } = require('C:/Users/WIN11/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('node:path');
const out=path.resolve(__dirname,'../docs/qa');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage();
 for(const [label,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
  await page.setViewportSize({width,height});
  await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
  await page.waitForTimeout(1300);
  await page.screenshot({path:path.join(out,`${label}-hero.png`)});
  const h=await page.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<h;y+=650){await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(130);}
  await page.waitForTimeout(1000);
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await page.waitForTimeout(200);
  await page.screenshot({path:path.join(out,`${label}-full.png`),fullPage:true});
  for(const id of ['conceito','sobre','projetos']){
   await page.locator('#'+id).scrollIntoViewIfNeeded();
   await page.waitForTimeout(1200);
   await page.screenshot({path:path.join(out,`${label}-${id}-review.png`)});
  }
 }
 await page.locator('[data-open-case]').click();
 await page.screenshot({path:path.join(out,'case-dialog-review.png')});
 await browser.close();
 console.log('Review recaptures saved.');
})();
