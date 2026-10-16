const { chromium } = require('/root/.bun/install/global/node_modules/playwright-core');
const fs = require('fs');
const path = require('path');

async function renderBgSun() {
  const publicDir = path.resolve('/app/applet/public');
  const assetsDir = path.resolve('/app/applet/src/assets');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({
    viewport: { width: 2560, height: 1440, deviceScaleFactor: 1 }
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, html { width: 2560px; height: 1440px; overflow: hidden; background: #261104; }
    canvas { width: 2560px; height: 1440px; display: block; }
  </style>
</head>
<body>
  <canvas id="c" width="2560" height="1440"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    const W = 2560;
    const H = 1440;

    function pseudoRandom(seed) {
      let s = seed;
      return function() {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    }
    const rand = pseudoRandom(842);

    // 1. Rich Warm Antique Golden Parchment Base Gradient
    const baseGrad = ctx.createLinearGradient(0, 0, 0, H);
    baseGrad.addColorStop(0, '#be7b28');    // Top warm amber ochre
    baseGrad.addColorStop(0.35, '#ab6819'); // Golden honey
    baseGrad.addColorStop(0.7, '#80450d');  // Deep warm amber
    baseGrad.addColorStop(1, '#532806');    // Bottom rich antique umber
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Radiant Sunbeam / Conical Light Shaft from Top Center (matching bg_sun.jpeg)
    const centerX = W * 0.5;
    const topY = -80;

    // Conical spotlight rays spreading outward
    const numRays = 16;
    for (let r = 0; r < numRays; r++) {
      const angleOffset = (r - numRays / 2) * 0.09 + (rand() - 0.5) * 0.04;
      const rayWidth = 140 + rand() * 120;
      const gradRay = ctx.createRadialGradient(centerX, topY, 40, centerX + Math.sin(angleOffset) * 1100, H * 0.9, 1400);
      gradRay.addColorStop(0, 'rgba(255, 245, 190, 0.45)');
      gradRay.addColorStop(0.3, 'rgba(250, 210, 110, 0.28)');
      gradRay.addColorStop(0.7, 'rgba(215, 145, 45, 0.12)');
      gradRay.addColorStop(1, 'transparent');

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, topY);
      ctx.lineTo(centerX + Math.sin(angleOffset - 0.12) * W * 1.2, H * 1.1);
      ctx.lineTo(centerX + Math.sin(angleOffset + 0.12) * W * 1.2, H * 1.1);
      ctx.closePath();
      ctx.fillStyle = gradRay;
      ctx.fill();
      ctx.restore();
    }

    // Top luminous glowing sun focal hotspot
    const sunGlow = ctx.createRadialGradient(centerX, topY + 40, 20, centerX, topY + 120, 1050);
    sunGlow.addColorStop(0, '#fffbe6');                    // Brilliant center core
    sunGlow.addColorStop(0.12, 'rgba(255, 238, 150, 0.95)'); // Sunlit lemon gold
    sunGlow.addColorStop(0.28, 'rgba(248, 195, 75, 0.85)');  // Warm radiant amber
    sunGlow.addColorStop(0.55, 'rgba(218, 138, 38, 0.45)');  // Golden ochre
    sunGlow.addColorStop(0.85, 'rgba(150, 80, 18, 0.15)');   // Deep amber falloff
    sunGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGlow;
    ctx.fillRect(0, 0, W, H);

    // Secondary wide atmospheric warm spread
    const broadSun = ctx.createRadialGradient(centerX, 200, 100, centerX, 500, 1300);
    broadSun.addColorStop(0, 'rgba(255, 220, 110, 0.35)');
    broadSun.addColorStop(0.5, 'rgba(225, 155, 45, 0.18)');
    broadSun.addColorStop(1, 'transparent');
    ctx.fillStyle = broadSun;
    ctx.fillRect(0, 0, W, H);

    // 3. Deep Antique Edge & Corner Vignettes
    // Bottom vignette
    const bottomVignette = ctx.createLinearGradient(0, H * 0.45, 0, H);
    bottomVignette.addColorStop(0, 'transparent');
    bottomVignette.addColorStop(0.65, 'rgba(65, 28, 5, 0.4)');
    bottomVignette.addColorStop(1, 'rgba(40, 16, 3, 0.75)');
    ctx.fillStyle = bottomVignette;
    ctx.fillRect(0, 0, W, H);

    // Left and Right vignette
    const leftVignette = ctx.createLinearGradient(0, 0, W * 0.35, 0);
    leftVignette.addColorStop(0, 'rgba(50, 20, 4, 0.5)');
    leftVignette.addColorStop(1, 'transparent');
    ctx.fillStyle = leftVignette;
    ctx.fillRect(0, 0, W, H);

    const rightVignette = ctx.createLinearGradient(W, 0, W * 0.65, 0);
    rightVignette.addColorStop(0, 'rgba(50, 20, 4, 0.5)');
    rightVignette.addColorStop(1, 'transparent');
    ctx.fillStyle = rightVignette;
    ctx.fillRect(0, 0, W, H);

    // 4. Artisanal Washi / Mulberry Paper Fibers & Pulp Strands
    // Organic curved strands of kozo / mulberry fibers
    for (let f = 0; f < 3800; f++) {
      const fx = rand() * W;
      const fy = rand() * H;
      const len = 4 + rand() * 16;
      const angle = rand() * Math.PI * 2;
      const curve = (rand() - 0.5) * 8;

      const isLightFiber = rand() > 0.65;
      const alpha = (0.08 + rand() * 0.22).toFixed(2);
      ctx.strokeStyle = isLightFiber
        ? 'rgba(255, 245, 215, ' + alpha + ')'
        : 'rgba(75, 35, 8, ' + alpha + ')';
      
      ctx.lineWidth = 0.8 + rand() * 0.8;
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

    // Heavier dark amber bark flecks & pulp fragments
    for (let b = 0; b < 600; b++) {
      const bx = rand() * W;
      const by = rand() * H;
      const bw = 2 + rand() * 6;
      const bh = 1 + rand() * 2.5;
      const rot = rand() * Math.PI;

      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(rot);
      ctx.fillStyle = 'rgba(60, 24, 4, ' + (0.15 + rand() * 0.25).toFixed(2) + ')';
      ctx.fillRect(-bw/2, -bh/2, bw, bh);
      ctx.restore();
    }

    // Micro pulp specks throughout
    for (let s = 0; s < 6000; s++) {
      const sx = rand() * W;
      const sy = rand() * H;
      const r = 0.4 + rand() * 1.5;
      ctx.fillStyle = rand() > 0.5
        ? 'rgba(55, 22, 5, ' + (0.08 + rand() * 0.16).toFixed(2) + ')'
        : 'rgba(255, 235, 175, ' + (0.06 + rand() * 0.14).toFixed(2) + ')';
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Tactile Parchment Paper Grain Micro-Noise
    const imgData = ctx.getImageData(0, 0, W, H);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 15;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * 0.9));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 0.7));
    }
    ctx.putImageData(imgData, 0, 0);
  </script>
</body>
</html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(400);

  const buffer = await page.screenshot({ type: 'jpeg', quality: 96 });
  fs.writeFileSync(path.join(publicDir, 'bg_sun.jpeg'), buffer);
  fs.writeFileSync(path.join(assetsDir, 'bg_sun.jpeg'), buffer);
  // Also provide a .jpg alias just in case
  fs.writeFileSync(path.join(publicDir, 'bg_sun.jpg'), buffer);
  fs.writeFileSync(path.join(assetsDir, 'bg_sun.jpg'), buffer);
  console.log('Saved bg_sun.jpeg to public and src/assets successfully, bytes:', buffer.length);

  await browser.close();
}

renderBgSun().catch(err => {
  console.error(err);
  process.exit(1);
});
