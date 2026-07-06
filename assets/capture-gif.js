const puppeteer = require('puppeteer');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const DIR = __dirname;
const DEMO = path.join(DIR, 'demo.html').replace(/\\/g, '/');

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function captureFrames(page, outputDir, action, totalMs, intervalMs) {
  fs.mkdirSync(outputDir, { recursive: true });
  const frames = [];
  const totalFrames = Math.ceil(totalMs / intervalMs);

  action(); // trigger the action (non-awaited)

  for (let i = 0; i < totalFrames; i++) {
    await sleep(intervalMs);
    const file = path.join(outputDir, `frame_${String(i).padStart(3, '0')}.png`);
    await page.screenshot({ path: file, clip: { x: 1200, y: 500, width: 360, height: 300 } });
    frames.push(file);
  }
  return frames;
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1560, height: 900, deviceScaleFactor: 1 });
  await page.goto('file:///' + DEMO, { waitUntil: 'networkidle0' });
  await sleep(800);

  // === Static screenshots with real code ===
  // 1. Full-page translate (expanded widget with detail closed)
  // First ensure detail is closed
  await page.evaluate(() => {
    document.getElementById('lf-detail').classList.remove('open');
    document.getElementById('btn-chevron').classList.remove('open');
  });
  await sleep(400);
  await page.screenshot({ path: path.join(DIR, 'screenshot-translate.png'), fullPage: false });
  console.log('✓ screenshot-translate.png');

  // 2. Ctrl+Explain — we'll need a separate page for this
  // (skip for now, use existing one)

  // 3. Translation panel — also needs a separate approach

  // 4. Settings — detail panel expanded
  await page.evaluate(() => {
    document.getElementById('lf-detail').classList.add('open');
    document.getElementById('btn-chevron').classList.add('open');
  });
  await sleep(400);
  await page.screenshot({
    path: path.join(DIR, 'screenshot-settings.png'),
    clip: { x: 1200, y: 200, width: 360, height: 700 }
  });
  console.log('✓ screenshot-settings.png');

  // === Animated GIF: collapse → mini ball → expand ===
  // Close detail first
  await page.evaluate(() => {
    document.getElementById('lf-detail').classList.remove('open');
    document.getElementById('btn-chevron').classList.remove('open');
  });
  await sleep(500);

  const gifDir = path.join(DIR, 'gif_frames');
  fs.mkdirSync(gifDir, { recursive: true });

  // Capture: expanded → collapsed → expanded
  let fi = 0;

  // Frame 0-5: expanded state (pause)
  for (let i = 0; i < 6; i++) {
    await page.screenshot({ path: path.join(gifDir, `f_${String(fi).padStart(3, '0')}.png`), clip: { x: 1200, y: 500, width: 340, height: 280 } });
    fi++;
    await sleep(80);
  }

  // Trigger collapse
  await page.click('#btn-collapse');
  // Frame 6-14: collapsing animation (0.45s transition = capture every ~50ms)
  for (let i = 0; i < 9; i++) {
    await page.screenshot({ path: path.join(gifDir, `f_${String(fi).padStart(3, '0')}.png`), clip: { x: 1200, y: 500, width: 340, height: 280 } });
    fi++;
    await sleep(50);
  }

  // Frame 15-24: collapsed state (mini ball with glow)
  for (let i = 0; i < 10; i++) {
    await page.screenshot({ path: path.join(gifDir, `f_${String(fi).padStart(3, '0')}.png`), clip: { x: 1200, y: 500, width: 340, height: 280 } });
    fi++;
    await sleep(100);
  }

  // Trigger expand
  await page.click('#btn-collapse');
  // Frame 25-34: expanding animation
  for (let i = 0; i < 10; i++) {
    await page.screenshot({ path: path.join(gifDir, `f_${String(fi).padStart(3, '0')}.png`), clip: { x: 1200, y: 500, width: 340, height: 280 } });
    fi++;
    await sleep(50);
  }

  // Frame 35-45: expanded state pause
  for (let i = 0; i < 10; i++) {
    await page.screenshot({ path: path.join(gifDir, `f_${String(fi).padStart(3, '0')}.png`), clip: { x: 1200, y: 500, width: 340, height: 280 } });
    fi++;
    await sleep(80);
  }

  console.log(`✓ ${fi} frames captured for collapse-expand GIF`);

  // === Animated GIF: detail panel expand ===
  // Reset: collapsed (no), detail closed
  await page.evaluate(() => {
    const w = document.getElementById('lf-wrapper');
    w.classList.remove('collapsed');
    document.getElementById('btn-collapse').classList.remove('collapsed');
    document.getElementById('lf-mini').classList.remove('visible', 'translated');
    document.getElementById('lf-detail').classList.remove('open');
    document.getElementById('btn-chevron').classList.remove('open');
  });
  await sleep(500);

  const detailDir = path.join(DIR, 'detail_frames');
  fs.mkdirSync(detailDir, { recursive: true });
  let di = 0;

  // Closed state
  for (let i = 0; i < 5; i++) {
    await page.screenshot({ path: path.join(detailDir, `d_${String(di).padStart(3, '0')}.png`), clip: { x: 1200, y: 520, width: 340, height: 200 } });
    di++;
    await sleep(100);
  }

  // Open detail
  await page.click('#btn-chevron');
  for (let i = 0; i < 8; i++) {
    await page.screenshot({ path: path.join(detailDir, `d_${String(di).padStart(3, '0')}.png`), clip: { x: 1200, y: 200, width: 340, height: 500 } });
    di++;
    await sleep(50);
  }

  // Open state pause
  for (let i = 0; i < 10; i++) {
    await page.screenshot({ path: path.join(detailDir, `d_${String(di).padStart(3, '0')}.png`), clip: { x: 1200, y: 200, width: 340, height: 500 } });
    di++;
    await sleep(100);
  }

  // Close detail
  await page.click('#btn-chevron');
  for (let i = 0; i < 8; i++) {
    await page.screenshot({ path: path.join(detailDir, `d_${String(di).padStart(3, '0')}.png`), clip: { x: 1200, y: 520, width: 340, height: 200 } });
    di++;
    await sleep(50);
  }

  // Closed state pause
  for (let i = 0; i < 5; i++) {
    await page.screenshot({ path: path.join(detailDir, `d_${String(di).padStart(3, '0')}.png`), clip: { x: 1200, y: 520, width: 340, height: 200 } });
    di++;
    await sleep(80);
  }

  console.log(`✓ ${di} frames captured for detail-panel GIF`);

  await browser.close();

  // Use Python to create GIFs
  console.log('Creating GIFs with Python...');
  execSync(`python -c "
from PIL import Image
import os, glob

# Collapse-expand GIF
frames = []
for f in sorted(glob.glob('${gifDir.replace(/\\/g, '/')}/f_*.png')):
    frames.append(Image.open(f).convert('RGBA'))
frames[0].save('${DIR.replace(/\\/g, '/')}/collapse-expand.gif',
    save_all=True, append_images=frames[1:], duration=80, loop=0, disposal=2, optimize=True)
print(f'collapse-expand.gif: {len(frames)} frames')

# Detail-panel GIF
frames2 = []
for f in sorted(glob.glob('${detailDir.replace(/\\/g, '/')}/d_*.png')):
    frames2.append(Image.open(f).convert('RGBA'))
frames2[0].save('${DIR.replace(/\\/g, '/')}/detail-panel.gif',
    save_all=True, append_images=frames2[1:], duration=80, loop=0, disposal=2, optimize=True)
print(f'detail-panel.gif: {len(frames2)} frames')
"`, { stdio: 'inherit' });

  // Clean up frame dirs
  fs.rmSync(gifDir, { recursive: true, force: true });
  fs.rmSync(detailDir, { recursive: true, force: true });
  console.log('Done!');
})();
