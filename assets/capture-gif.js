const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const DIR = 'D:/cursor/translate/faluber translate/assets';
const DEMO = DIR + '/demo.html';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1560, height: 900, deviceScaleFactor: 1 });
  await page.goto('file:///' + DEMO, { waitUntil: 'networkidle0' });
  await sleep(1000);

  // Close detail, ensure expanded
  await page.evaluate(() => {
    document.getElementById('lf-detail').classList.remove('open');
    document.getElementById('btn-chevron').classList.remove('open');
    const w = document.getElementById('lf-wrapper');
    w.classList.remove('collapsed');
    document.getElementById('btn-collapse').classList.remove('collapsed');
    document.getElementById('lf-mini').classList.remove('visible', 'translated');
  });
  await sleep(500);

  // Widget position on 1560x900 viewport: right:16, bottom:16
  // Widget width:260 → x = 1560-16-260 = 1284
  // Expanded height ~100px → y = 900-16-100 = 784
  // Clip with padding: x:1260, y:740, w:300, h:160
  const expandClip = { x: 1260, y: 740, width: 300, height: 160 };

  // === Static: full page screenshot ===
  await page.screenshot({ path: path.join(DIR, 'screenshot-translate.png'), fullPage: false });
  console.log('✓ screenshot-translate.png');

  // === Static: detail panel open ===
  await page.evaluate(() => {
    document.getElementById('lf-detail').classList.add('open');
    document.getElementById('btn-chevron').classList.add('open');
  });
  await sleep(400);
  // Detail open adds ~400px → widget extends up to y ~384
  const detailClip = { x: 1260, y: 340, width: 300, height: 560 };
  await page.screenshot({ path: path.join(DIR, 'screenshot-settings.png'), clip: detailClip });
  console.log('✓ screenshot-settings.png');

  // === GIF 1: collapse → mini ball → expand ===
  // Close detail first
  await page.evaluate(() => {
    document.getElementById('lf-detail').classList.remove('open');
    document.getElementById('btn-chevron').classList.remove('open');
  });
  await sleep(500);

  const gifDir = path.join(DIR, 'gif_frames');
  fs.mkdirSync(gifDir, { recursive: true });
  let fi = 0;

  // Frames 0-6: expanded state (260px wide widget visible)
  for (let i = 0; i < 7; i++) {
    await page.screenshot({ path: path.join(gifDir, `f_${String(fi).padStart(3, '0')}.png`), clip: expandClip });
    fi++; await sleep(100);
  }

  // Click collapse button
  await page.click('#btn-collapse');
  // Frames 7-16: collapsing transition (0.45s, capture every 45ms)
  for (let i = 0; i < 10; i++) {
    await page.screenshot({ path: path.join(gifDir, `f_${String(fi).padStart(3, '0')}.png`), clip: expandClip });
    fi++; await sleep(45);
  }

  // Frames 17-27: collapsed state (mini ball with glow)
  for (let i = 0; i < 11; i++) {
    await page.screenshot({ path: path.join(gifDir, `f_${String(fi).padStart(3, '0')}.png`), clip: expandClip });
    fi++; await sleep(120);
  }

  // Click expand (mini ball click or collapse button again)
  await page.click('#lf-mini');
  // Frames 28-37: expanding transition
  for (let i = 0; i < 10; i++) {
    await page.screenshot({ path: path.join(gifDir, `f_${String(fi).padStart(3, '0')}.png`), clip: expandClip });
    fi++; await sleep(45);
  }

  // Frames 38-44: expanded state pause
  for (let i = 0; i < 7; i++) {
    await page.screenshot({ path: path.join(gifDir, `f_${String(fi).padStart(3, '0')}.png`), clip: expandClip });
    fi++; await sleep(100);
  }

  console.log(`✓ ${fi} frames for collapse-expand GIF`);

  // === GIF 2: detail panel open/close ===
  const detailGifDir = path.join(DIR, 'detail_frames');
  fs.mkdirSync(detailGifDir, { recursive: true });
  let di = 0;

  // Closed state
  for (let i = 0; i < 6; i++) {
    await page.screenshot({ path: path.join(detailGifDir, `d_${String(di).padStart(3, '0')}.png`), clip: detailClip });
    di++; await sleep(120);
  }

  // Click chevron to open
  await page.click('#btn-chevron');
  for (let i = 0; i < 9; i++) {
    await page.screenshot({ path: path.join(detailGifDir, `d_${String(di).padStart(3, '0')}.png`), clip: detailClip });
    di++; await sleep(45);
  }

  // Open state pause
  for (let i = 0; i < 12; i++) {
    await page.screenshot({ path: path.join(detailGifDir, `d_${String(di).padStart(3, '0')}.png`), clip: detailClip });
    di++; await sleep(120);
  }

  // Click chevron to close
  await page.click('#btn-chevron');
  for (let i = 0; i < 9; i++) {
    await page.screenshot({ path: path.join(detailGifDir, `d_${String(di).padStart(3, '0')}.png`), clip: detailClip });
    di++; await sleep(45);
  }

  // Closed state pause
  for (let i = 0; i < 6; i++) {
    await page.screenshot({ path: path.join(detailGifDir, `d_${String(di).padStart(3, '0')}.png`), clip: detailClip });
    di++; await sleep(120);
  }

  console.log(`✓ ${di} frames for detail-panel GIF`);

  await browser.close();


  console.log('Frames ready. Run: python assets/make-gif.py');
  console.log('Done!');
})();
