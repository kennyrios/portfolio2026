const { chromium } = require('/root/.bun/install/global/node_modules/playwright-core');
const fs = require('fs');
const path = require('path');

async function renderBgBlue() {
  const publicDir = path.resolve('/app/applet/public');
  const assetsDir = path.resolve('/app/applet/src/assets');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({
    viewport: { width: 2048, height: 1024, deviceScaleFactor: 1 }
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, html { width: 2048px; height: 1024px; overflow: hidden; background: #113542; }
    canvas { width: 2048px; height: 1024px; display: block; }
  </style>
</head>
<body>
  <canvas id="c" width="2048" height="1024"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    const W = 2048;
    const H = 1024;

    function pseudoRandom(seed) {
      let s = seed;
      return function() {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    }
    const rand = pseudoRandom(108);

    // 1. Full-bleed rich teal-blue oceanic gradient (NO torn or ripped edge)
    const baseGrad = ctx.createLinearGradient(0, 0, W, H);
    baseGrad.addColorStop(0, '#217086');     // Vibrant oceanic cyan/teal
    baseGrad.addColorStop(0.28, '#1d6377');  // Deep saturated teal
    baseGrad.addColorStop(0.65, '#154b5b');  // Marine petroleum cyan
    baseGrad.addColorStop(1, '#0e2f3b');     // Deep abyssal shadow teal

    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Luminous Ambient Light Swells across the surface
    const lightSwell1 = ctx.createRadialGradient(W * 0.68, H * 0.38, 60, W * 0.65, H * 0.42, 850);
    lightSwell1.addColorStop(0, 'rgba(48, 146, 175, 0.55)');
    lightSwell1.addColorStop(0.45, 'rgba(30, 104, 126, 0.28)');
    lightSwell1.addColorStop(1, 'transparent');
    ctx.fillStyle = lightSwell1;
    ctx.fillRect(0, 0, W, H);

    const lightSwell2 = ctx.createRadialGradient(W * 0.22, H * 0.25, 30, W * 0.25, H * 0.3, 600);
    lightSwell2.addColorStop(0, 'rgba(42, 134, 162, 0.4)');
    lightSwell2.addColorStop(0.6, 'rgba(25, 88, 108, 0.15)');
    lightSwell2.addColorStop(1, 'transparent');
    ctx.fillStyle = lightSwell2;
    ctx.fillRect(0, 0, W, H);

    // 3. Subtle Atmospheric Vignettes (soft edges, no tear)
    // Left edge shadow
    const leftShadow = ctx.createLinearGradient(0, 0, W * 0.25, 0);
    leftShadow.addColorStop(0, 'rgba(8, 24, 32, 0.42)');
    leftShadow.addColorStop(1, 'transparent');
    ctx.fillStyle = leftShadow;
    ctx.fillRect(0, 0, W, H);

    // Right edge shadow
    const rightShadow = ctx.createLinearGradient(W, 0, W * 0.75, 0);
    rightShadow.addColorStop(0, 'rgba(8, 24, 32, 0.35)');
    rightShadow.addColorStop(1, 'transparent');
    ctx.fillStyle = rightShadow;
    ctx.fillRect(0, 0, W, H);

    // Bottom depth shadow
    const bottomShadow = ctx.createLinearGradient(0, H * 0.55, 0, H);
    bottomShadow.addColorStop(0, 'transparent');
    bottomShadow.addColorStop(1, 'rgba(7, 20, 28, 0.55)');
    ctx.fillStyle = bottomShadow;
    ctx.fillRect(0, 0, W, H);

    // 4. Fine Organic Mulberry Paper Fibers across the entire canvas
    ctx.lineWidth = 1.0;
    for (let f = 0; f < 2200; f++) {
      const fx = rand() * W;
      const fy = rand() * H;
      const len = 3 + rand() * 10;
      const angle = rand() * Math.PI * 2;
      const curve = (rand() - 0.5) * 5;

      ctx.strokeStyle = rand() > 0.42
        ? 'rgba(8, 26, 36, ' + (0.12 + rand() * 0.22).toFixed(2) + ')'
        : 'rgba(235, 250, 255, ' + (0.06 + rand() * 0.14).toFixed(2) + ')';

      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.quadraticCurveTo(
        fx + Math.cos(angle) * (len * 0.5) + curve,
        fy + Math.sin(angle) * (len * 0.5) - curve,
        fx + Math.cos(angle) * len,
        fy + Math.sin(angle) * len
      );
      ctx.stroke();
    }

    // 5. Paper Pulp Specks & Micro Flecks
    for (let s = 0; s < 4500; s++) {
      const sx = rand() * W;
      const sy = rand() * H;
      const r = 0.5 + rand() * 1.4;
      ctx.fillStyle = rand() > 0.48
        ? 'rgba(6, 20, 28, ' + (0.1 + rand() * 0.18).toFixed(2) + ')'
        : 'rgba(80, 195, 225, ' + (0.07 + rand() * 0.16).toFixed(2) + ')';
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 6. Micro tactile paper noise overlay
    const imgData = ctx.getImageData(0, 0, W, H);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 14;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);
  </script>
</body>
</html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(400);

  const buffer = await page.screenshot({ omitBackground: false });
  fs.writeFileSync(path.join(publicDir, 'bg_blue.png'), buffer);
  fs.writeFileSync(path.join(assetsDir, 'bg_blue.png'), buffer);
  console.log('Saved clean untorn bg_blue.png to public and src/assets successfully, bytes:', buffer.length);

  await browser.close();
}

renderBgBlue().catch(err => {
  console.error(err);
  process.exit(1);
});
