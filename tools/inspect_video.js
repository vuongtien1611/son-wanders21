const fs = require('fs');
const path = require('path');
const puppeteer = require('../node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
  });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3100', { waitUntil: 'domcontentloaded' });
  
  // Set up an HTML page with the video in the same origin
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0;background:#000;">
        <video id="v" src="http://localhost:3100/images/video-banner/video-banner.mp4" muted playsinline></video>
      </body>
    </html>
  `);

  await page.evaluate(async () => {
    const v = document.getElementById('v');
    await new Promise((resolve) => {
      v.onloadeddata = resolve;
      v.load();
    });
    v.currentTime = 0.5; // seek to 0.5s to get a clear first frame
    await new Promise(resolve => v.onseeked = resolve);
  });

  const frameDataUrl = await page.evaluate(() => {
    const v = document.getElementById('v');
    const canvas = document.createElement('canvas');
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.9);
  });

  const base64Data = frameDataUrl.replace(/^data:image\/jpeg;base64,/, '');
  fs.writeFileSync(path.join(__dirname, '../src/images/video-banner/hero-poster.jpg'), base64Data, 'base64');
  fs.writeFileSync(path.join(__dirname, '../website_download/images/video-banner/hero-poster.jpg'), base64Data, 'base64');
  console.log('Saved first frame as hero-poster.jpg (size:', (base64Data.length * 0.75 / 1024).toFixed(1), 'KB)');

  const webpDataUrl = await page.evaluate(() => {
    const v = document.getElementById('v');
    const canvas = document.createElement('canvas');
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/webp', 0.88);
  });
  const webpBase64 = webpDataUrl.replace(/^data:image\/webp;base64,/, '');
  fs.writeFileSync(path.join(__dirname, '../src/images/video-banner/hero-poster.webp'), webpBase64, 'base64');
  fs.writeFileSync(path.join(__dirname, '../website_download/images/video-banner/hero-poster.webp'), webpBase64, 'base64');
  console.log('Saved first frame as hero-poster.webp (size:', (webpBase64.length * 0.75 / 1024).toFixed(1), 'KB)');

  await browser.close();
})();
