const { chromium } = require('/root/.bun/install/global/node_modules/playwright-core');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080, deviceScaleFactor: 1 }
  });

  // Optimize bg_sun
  const sunPath = path.resolve('/app/applet/src/assets/bg_sun.jpeg');
  if (fs.existsSync(sunPath)) {
    const sunData = fs.readFileSync(sunPath).toString('base64');
    await page.setContent(`
      <html><body style="margin:0;padding:0;overflow:hidden;background:#000;">
        <img src="data:image/jpeg;base64,${sunData}" style="width:1920px;height:1080px;object-fit:cover;display:block;" />
      </body></html>
    `);
    await page.waitForTimeout(200);
    const sunOpt = await page.screenshot({ type: 'jpeg', quality: 82 });
    fs.writeFileSync('/app/applet/src/assets/bg_sun.jpeg', sunOpt);
    fs.writeFileSync('/app/applet/public/bg_sun.jpeg', sunOpt);
    console.log(`bg_sun.jpeg optimized: ${sunOpt.length / 1024} KB`);
  }

  // Optimize bg_blue
  const bluePath = path.resolve('/app/applet/src/assets/bg_blue.png');
  if (fs.existsSync(bluePath)) {
    const blueData = fs.readFileSync(bluePath).toString('base64');
    await page.setContent(`
      <html><body style="margin:0;padding:0;overflow:hidden;background:#000;">
        <img src="data:image/png;base64,${blueData}" style="width:1920px;height:960px;object-fit:cover;display:block;" />
      </body></html>
    `);
    await page.waitForTimeout(200);
    const blueOpt = await page.screenshot({ type: 'jpeg', quality: 82 });
    // Write as jpeg and keep a lightweight png
    fs.writeFileSync('/app/applet/src/assets/bg_blue.png', blueOpt);
    fs.writeFileSync('/app/applet/public/bg_blue.png', blueOpt);
    console.log(`bg_blue.png optimized: ${blueOpt.length / 1024} KB`);
  }

  await browser.close();
}

optimizeImages().catch(err => {
  console.error(err);
  process.exit(1);
});
