const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const DIR = 'D:/cursor/translate/faluber translate/assets';
const BROWSER = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function captureFrames(page, outputDir, frameCount, intervalMs, clip) {
  fs.mkdirSync(outputDir, { recursive: true });
  for (let i = 0; i < frameCount; i++) {
    const file = path.join(outputDir, `f_${String(i).padStart(3, '0')}.png`);
    await page.screenshot({ path: file, clip });
    await sleep(intervalMs);
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', executablePath: BROWSER });

  // ============================
  // GIF 1: Translation animation
  // ============================
  console.log('=== GIF 1: Translation ===');
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1560, height: 900, deviceScaleFactor: 1 });
  await page1.goto('file:///' + (DIR + '/demo-translate.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await sleep(800);

  const translateDir = path.join(DIR, 'translate_frames');
  fs.mkdirSync(translateDir, { recursive: true });
  const clip = { x: 0, y: 0, width: 1560, height: 900 };
  let fi = 0;

  // Frames 0-7: English text visible, widget ready
  for (let i = 0; i < 8; i++) {
    await page1.screenshot({ path: path.join(translateDir, `f_${String(fi).padStart(3, '0')}.png`) });
    fi++; await sleep(150);
  }

  // Click translate button
  await page1.click('#btn-translate');

  // Frames 8-50: translation in progress (4 paragraphs, each ~800ms)
  // Capture every 100ms during translation
  for (let i = 0; i < 42; i++) {
    await page1.screenshot({ path: path.join(translateDir, `f_${String(fi).padStart(3, '0')}.png`) });
    fi++; await sleep(100);
  }

  // Frames 51-65: Done state
  for (let i = 0; i < 15; i++) {
    await page1.screenshot({ path: path.join(translateDir, `f_${String(fi).padStart(3, '0')}.png`) });
    fi++; await sleep(200);
  }

  console.log(`✓ ${fi} frames for translate GIF`);
  await page1.close();

  // ============================
  // GIF 2: Ctrl + Explain
  // ============================
  console.log('=== GIF 2: Ctrl+Explain ===');
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1560, height: 750, deviceScaleFactor: 1 });
  await page2.goto('file:///' + (DIR + '/demo-explain.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await sleep(500);

  const explainDir = path.join(DIR, 'explain_frames');
  fs.mkdirSync(explainDir, { recursive: true });
  let ei = 0;

  // The page auto-plays the animation. Capture for ~7 seconds (one full cycle)
  for (let i = 0; i < 70; i++) {
    await page2.screenshot({ path: path.join(explainDir, `f_${String(ei).padStart(3, '0')}.png`) });
    ei++; await sleep(100);
  }

  console.log(`✓ ${ei} frames for explain GIF`);
  await page2.close();

  // ============================
  // GIF 3: Translation Panel
  // ============================
  console.log('=== GIF 3: Translation Panel ===');
  const page3 = await browser.newPage();
  await page3.setViewport({ width: 1560, height: 650, deviceScaleFactor: 1 });
  await page3.goto('file:///' + (DIR + '/demo-panel.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await sleep(500);

  const panelDir = path.join(DIR, 'panel_frames');
  fs.mkdirSync(panelDir, { recursive: true });
  let pi = 0;

  // The page auto-plays typing. Capture for ~10 seconds (type + wait + cycle)
  for (let i = 0; i < 100; i++) {
    await page3.screenshot({ path: path.join(panelDir, `f_${String(pi).padStart(3, '0')}.png`) });
    pi++; await sleep(100);
  }

  console.log(`✓ ${pi} frames for panel GIF`);
  await page3.close();

  await browser.close();
  console.log('All frames captured!');
  console.log(`Total: ${fi} + ${ei} + ${pi} = ${fi + ei + pi} frames`);
})();
