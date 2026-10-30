const { chromium } = require('C:/Users/WIN11/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'docs', 'qa');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({channel:'msedge',headless:true});
  const errors = [], failures = [], checks = [];
  const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => {if(r.status()>=400) failures.push(`${r.status()} ${r.url()}`);});
  await page.goto('http://127.0.0.1:4173', {waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(1400);
  await page.screenshot({path:path.join(out,'desktop-hero.png')});
  const measure = async label => {
    const data = await page.evaluate(() => ({width:innerWidth, scroll:document.documentElement.scrollWidth, broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src'))}));
    checks.push({label,...data});
    if(data.scroll>data.width+1) errors.push(`Horizontal overflow ${label}: ${data.scroll}/${data.width}`);
    if(data.broken.length) errors.push(`Broken images ${label}: ${data.broken.join(',')}`);
  };
  await measure('desktop');
  await page.locator('[data-case="bahari"] summary').click();
  checks.push({bahariExpanded:await page.locator('[data-case="bahari"]').evaluate(d=>d.open)});
  await page.locator('[data-case="bahari"] summary').click();
  await page.locator('.hero [data-contact]').click();
  await page.locator('#copy-message').click();
  checks.push({contact:await page.locator('#contact-dialog').evaluate(d=>d.open),copyFeedback:await page.locator('.copy-status').innerText()});
  await page.keyboard.press('Escape');
  await page.locator('[data-case="sepulveda"] summary').click();
  checks.push({projectOpen:await page.locator('[data-case="sepulveda"]').getAttribute('open')!==null});
  await page.locator('[data-case="sepulveda"] summary').click();
  await page.locator('#tab-leticia').click();
  await page.keyboard.press('ArrowRight');
  checks.push({keyboardTab:await page.locator('#tab-nathalia').getAttribute('aria-selected')});
  await page.locator('[data-enlarge-book]').click();
  checks.push({imageDialog:await page.locator('#image-dialog').evaluate(d=>d.open)});
  await page.keyboard.press('Escape');
  await page.locator('#tab-leticia').click();
  const height=await page.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<height;y+=650){await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(140);}
  await page.waitForTimeout(1100);
  await page.locator('#video-toggle').click();
  checks.push({videoPaused:await page.locator('#footer-video').evaluate(v=>v.paused),videoLabel:await page.locator('#video-toggle').innerText()});
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await page.waitForTimeout(300);
  await page.screenshot({path:path.join(out,'desktop-full.png'),fullPage:true});
  for(const [width,height] of [[390,844],[360,800],[768,1024]]){
    await page.setViewportSize({width,height});
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.waitForTimeout(500);
    await measure(`viewport-${width}`);
    if(width===390){
      await page.screenshot({path:path.join(out,'mobile-hero.png')});
      await page.locator('.menu-toggle').click();
      checks.push({mobileMenu:await page.locator('.menu-toggle').getAttribute('aria-expanded'),mainInert:await page.locator('main').evaluate(m=>m.inert)});
      await page.screenshot({path:path.join(out,'mobile-menu.png')});
      await page.keyboard.press('Escape');
      checks.push({menuClosed:await page.locator('.menu-toggle').getAttribute('aria-expanded')});
      await page.screenshot({path:path.join(out,'mobile-full.png'),fullPage:true});
    }
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.reload({waitUntil:'networkidle'});
  checks.push({reducedMotion:await page.locator('body').evaluate(b=>!b.classList.contains('motion-enabled')),reducedVideoPaused:await page.locator('#footer-video').evaluate(v=>v.paused)});
  fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({errors,failures,checks},null,2));
  console.log(JSON.stringify({errors,failures,checks},null,2));
  await browser.close();
  if(errors.length||failures.length) process.exitCode=1;
})();
