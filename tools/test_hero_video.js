const fs = require('fs');
const path = require('path');
const puppeteer = require('../node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const QA_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\846aa58a-030f-45e9-978f-f9d61dc4eac5\\qa_screenshots';

if (!fs.existsSync(QA_DIR)) {
  fs.mkdirSync(QA_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'desktop_1920', width: 1920, height: 1080, isMobile: false },
  { name: 'desktop_1366', width: 1366, height: 768, isMobile: false },
  { name: 'tablet_768', width: 768, height: 1024, isMobile: true },
  { name: 'mobile_390', width: 390, height: 844, isMobile: true },
  { name: 'mobile_375', width: 375, height: 812, isMobile: true },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\nTesting viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });

    await page.goto('http://localhost:3100/?intro=skip', { waitUntil: 'networkidle2' });

    // Wait for video element
    await page.waitForSelector('.w-hero-video', { timeout: 10000 });

    // Wait 1.5 seconds for video playback to advance
    await new Promise(r => setTimeout(r, 1500));

    const videoState = await page.evaluate(() => {
      const v = document.querySelector('.w-hero-video');
      if (!v) return null;
      const rect = v.getBoundingClientRect();
      const hero = document.querySelector('.w-hero-section');
      const heroRect = hero ? hero.getBoundingClientRect() : null;
      return {
        src: v.currentSrc,
        paused: v.paused,
        currentTime: v.currentTime,
        duration: v.duration,
        muted: v.muted,
        loop: v.loop,
        playsInline: v.playsInline,
        videoWidth: v.videoWidth,
        videoHeight: v.videoHeight,
        readyState: v.readyState,
        visibleWidth: Math.round(rect.width),
        visibleHeight: Math.round(rect.height),
        heroHeight: heroRect ? Math.round(heroRect.height) : 0,
      };
    });

    console.log('Video state:', videoState);

    const shotPath = path.join(QA_DIR, `hero_video_${vp.name}.png`);
    await page.screenshot({ path: shotPath });
    console.log(`Saved screenshot: ${shotPath}`);

    results.push({ viewport: vp.name, ...videoState, screenshot: shotPath });
    await page.close();
  }

  // Also test with full intro playing on desktop to verify seamless transition into video
  console.log('\nTesting with full Cinematic Intro on desktop (1920x1080)...');
  const introPage = await browser.newPage();
  await introPage.setViewport({ width: 1920, height: 1080 });
  await introPage.goto('http://localhost:3100/', { waitUntil: 'domcontentloaded' });

  // Wait 6.5s for intro to finish and curtain wipe
  await new Promise(r => setTimeout(r, 6500));

  const postIntroState = await introPage.evaluate(() => {
    const v = document.querySelector('.w-hero-video');
    return {
      src: v ? v.currentSrc : null,
      paused: v ? v.paused : true,
      currentTime: v ? v.currentTime : 0,
      htmlClasses: document.documentElement.className,
    };
  });
  console.log('Post-intro video state:', postIntroState);

  const introShotPath = path.join(QA_DIR, 'hero_video_post_intro.png');
  await introPage.screenshot({ path: introShotPath });
  console.log(`Saved screenshot: ${introShotPath}`);

  await browser.close();

  console.log('\n=== ALL TESTS COMPLETE ===');
  console.log(JSON.stringify(results, null, 2));
})();
