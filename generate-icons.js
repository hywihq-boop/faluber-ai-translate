/**
 * Icon generator — generates simple PNG icons for Faluber Translate
 * 纯 Node.js，无外部依赖
 */

const fs = require('fs');
const zlib = require('zlib');

function createPNG(width, height, drawFn) {
  // 创建 RGBA 像素数组
  const pixels = Buffer.alloc(width * height * 4, 0);
  drawFn(pixels, width, height);

  // PNG 签名
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // 原始图像数据（每行一个 filter byte + 像素数据）
  const raw = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0; // filter: none
    pixels.copy(raw, y * (1 + width * 4) + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = zlib.deflateSync(raw);

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcData = Buffer.concat([typeBuf, data]);
    const crc = crc32(crcData);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

// CRC32 实现
function crc32(data) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (let j = 0; j < 8; j++) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xEDB88320;
      } else {
        crc >>>= 1;
      }
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// 颜色定义
const BG_COLOR = [15, 15, 26, 255];      // #0f0f1a 深色背景
const ACCENT1 = [124, 92, 252, 255];     // #7c5cfc 紫色
const ACCENT2 = [92, 224, 252, 255];     // #5ce0fc 青色
const WHITE = [255, 255, 255, 255];

function blend(bg, fg, alpha) {
  return [
    Math.round(fg[0] * alpha + bg[0] * (1 - alpha)),
    Math.round(fg[1] * alpha + bg[1] * (1 - alpha)),
    Math.round(fg[2] * alpha + bg[2] * (1 - alpha)),
    255,
  ];
}

function setPixel(pixels, x, y, w, color) {
  if (x < 0 || x >= w || y < 0 || y >= w) return;
  const i = (y * w + x) * 4;
  pixels[i] = color[0];
  pixels[i + 1] = color[1];
  pixels[i + 2] = color[2];
  pixels[i + 3] = color[3];
}

function fillCircle(pixels, cx, cy, r, w, color) {
  for (let y = Math.max(0, Math.floor(cy - r)); y < Math.min(w, Math.ceil(cy + r)); y++) {
    for (let x = Math.max(0, Math.floor(cx - r)); x < Math.min(w, Math.ceil(cx + r)); x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= r) {
        const alpha = Math.min(1, r - dist + 0.5);
        setPixel(pixels, x, y, w, blend(getPixel(pixels, x, y, w), color, alpha));
      }
    }
  }
}

function fillRoundedRect(pixels, x0, y0, x1, y1, r, w, color) {
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      let inside = true;
      // Check rounded corners
      if (x < x0 + r && y < y0 + r) {
        const dx = x - (x0 + r);
        const dy = y - (y0 + r);
        inside = dx * dx + dy * dy <= r * r;
      } else if (x > x1 - r && y < y0 + r) {
        const dx = x - (x1 - r);
        const dy = y - (y0 + r);
        inside = dx * dx + dy * dy <= r * r;
      } else if (x < x0 + r && y > y1 - r) {
        const dx = x - (x0 + r);
        const dy = y - (y1 - r);
        inside = dx * dx + dy * dy <= r * r;
      } else if (x > x1 - r && y > y1 - r) {
        const dx = x - (x1 - r);
        const dy = y - (y1 - r);
        inside = dx * dx + dy * dy <= r * r;
      }
      if (inside) {
        setPixel(pixels, x, y, w, color);
      }
    }
  }
}

function getPixel(pixels, x, y, w) {
  const i = (y * w + x) * 4;
  return [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]];
}

// 渐变填充背景
function fillGradientBg(pixels, w) {
  for (let y = 0; y < w; y++) {
    for (let x = 0; x < w; x++) {
      const t = y / w;
      const color = blend(ACCENT1, ACCENT2, t);
      setPixel(pixels, x, y, w, color);
    }
  }
}

// 绘制 "L" 字母形状（简化的地球+语言图标）
function drawGlobeIcon(pixels, w) {
  const cx = w / 2;
  const cy = w / 2;
  const r = w * 0.38;

  // 渐变圆形背景
  for (let y = 0; y < w; y++) {
    for (let x = 0; x < w; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= r + 1) {
        const t = (dist / r) * 0.5 + (y / w) * 0.5;
        const color = blend(ACCENT1, ACCENT2, t);
        const alpha = dist > r ? r + 1 - dist : 1;
        const bg = getPixel(pixels, x, y, w);
        setPixel(pixels, x, y, w, blend(bg, [...color, 255], alpha));
      }
    }
  }

  // 绘制 "文" 的简化图案：横线 + 交叉
  const scale = w / 16;
  const thick = Math.max(1, Math.round(scale * 1.2));

  // 顶部横线
  fillRoundedRect(
    pixels,
    Math.round(cx - scale * 3), Math.round(cy - scale * 1.5),
    Math.round(cx + scale * 3), Math.round(cy - scale * 1.5 + thick),
    Math.round(thick / 2), w, WHITE
  );

  // 中间短横
  fillRoundedRect(
    pixels,
    Math.round(cx - scale * 2), Math.round(cy - thick / 2),
    Math.round(cx + scale * 2), Math.round(cy + thick / 2),
    Math.round(thick / 2), w, WHITE
  );

  // 底部横线
  fillRoundedRect(
    pixels,
    Math.round(cx - scale * 3), Math.round(cy + scale * 1.5 - thick),
    Math.round(cx + scale * 3), Math.round(cy + scale * 1.5),
    Math.round(thick / 2), w, WHITE
  );
}

// 更精致的图标：语言气泡
function drawBubbleIcon(pixels, w, size) {
  const scale = w / 48;
  const cx = w / 2;
  const cy = w / 2;

  // 对话气泡形状（简化）
  const bw = w * 0.7;
  const bh = w * 0.55;
  const bx = (w - bw) / 2;
  const by = (w - bh) / 2 - w * 0.05;
  const br = w * 0.12;

  // 气泡主体
  fillRoundedRect(
    pixels,
    Math.round(bx), Math.round(by),
    Math.round(bx + bw), Math.round(by + bh),
    Math.round(br), w, WHITE
  );

  // 气泡小尾巴
  const tailX = Math.round(cx + bw * 0.25);
  const tailY = Math.round(by + bh);
  for (let y = tailY; y < Math.min(w, tailY + w * 0.18); y++) {
    for (let x = Math.round(tailX - (y - tailY) * 0.6); x <= Math.round(tailX + (y - tailY) * 0.3); x++) {
      if (x >= 0 && x < w && y < w) {
        setPixel(pixels, x, y, w, WHITE);
      }
    }
  }

  // A 字母
  const textH = bh * 0.5;
  const textY = cy - textH * 0.1;
  const textThick = Math.max(1, Math.round(scale * 2.5));

  // A 左腿
  for (let t = 0; t < textH; t++) {
    const xLeft = Math.round(cx - (textH - t) * 0.3 - textThick / 2);
    const xRight = Math.round(cx - (textH - t) * 0.3 + textThick / 2);
    for (let px = xLeft; px <= xRight; px++) {
      setPixel(pixels, px, Math.round(textY + t), w, ACCENT1);
    }
  }
  // A 右腿
  for (let t = 0; t < textH; t++) {
    const xLeft = Math.round(cx + (textH - t) * 0.3 - textThick / 2);
    const xRight = Math.round(cx + (textH - t) * 0.3 + textThick / 2);
    for (let px = xLeft; px <= xRight; px++) {
      setPixel(pixels, px, Math.round(textY + t), w, ACCENT1);
    }
  }
  // A 横杠
  fillRoundedRect(
    pixels,
    Math.round(cx - textH * 0.18), Math.round(textY + textH * 0.45),
    Math.round(cx + textH * 0.18), Math.round(textY + textH * 0.45 + textThick),
    Math.round(textThick / 2), w, ACCENT1
  );

  // 文 的简单表示
  const text2X = cx + bw * 0.18;
  const text2Y = cy + bh * 0.08;
  const text2W = bw * 0.22;
  const text2H = bh * 0.35;

  // 顶部横
  fillRoundedRect(
    pixels,
    Math.round(text2X), Math.round(text2Y),
    Math.round(text2X + text2W), Math.round(text2Y + textThick),
    Math.round(textThick / 2), w, ACCENT2
  );
  // 中间
  fillRoundedRect(
    pixels,
    Math.round(text2X + text2W * 0.15), Math.round(text2Y + text2H * 0.45),
    Math.round(text2X + text2W * 0.85), Math.round(text2Y + text2H * 0.45 + textThick),
    Math.round(textThick / 2), w, ACCENT2
  );
  // 底部
  fillRoundedRect(
    pixels,
    Math.round(text2X), Math.round(text2Y + text2H),
    Math.round(text2X + text2W), Math.round(text2Y + text2H + textThick),
    Math.round(textThick / 2), w, ACCENT2
  );
}

// 生成图标
function generateIcons() {
  const sizes = [16, 48, 128];

  for (const size of sizes) {
    const png = createPNG(size, size, (pixels, w) => {
      // 背景
      for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] = BG_COLOR[0];
        pixels[i + 1] = BG_COLOR[1];
        pixels[i + 2] = BG_COLOR[2];
        pixels[i + 3] = BG_COLOR[3];
      }

      if (size >= 48) {
        drawBubbleIcon(pixels, w, size);
      } else {
        // 小图标：简化版
        drawGlobeIcon(pixels, w);
      }
    });

    const path = `icons/icon${size}.png`;
    fs.writeFileSync(path, png);
    console.log(`✓ 生成 ${path} (${png.length} bytes)`);
  }
}

generateIcons();
