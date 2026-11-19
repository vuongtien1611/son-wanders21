const puppeteer = require('../node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const QA_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\846aa58a-030f-45e9-978f-f9d61dc4eac5\\qa_screenshots';

if (!fs.existsSync(QA_DIR)) fs.mkdirSync(QA_DIR, { recursive: true });

(async () => {
  console.log('=== STARTING HERO VIDEO ENHANCEMENT VERIFICATION ===');

  // 1. EXTRACT SIDE-BY-SIDE COMPARISON FRAMES AT EXACT SECOND 15.0
  const origVideo = path.join(__dirname, '../website_download/images/video-banner/video-banner.mp4');
  const desktopVideo = path.join(__dirname, '../website_download/images/video-banner/hero-desktop.mp4');
  const mobileVideo = path.join(__dirname, '../website_download/images/video-banner/hero-mobile.mp4');

  const origFrame = path.join(QA_DIR, 'compare_01_original_720p.png');
  const desktopFrame = path.join(QA_DIR, 'compare_02_enhanced_1080p.png');
  const mobileFrame = path.join(QA_DIR, 'compare_03_enhanced_mobile_9x16.png');

  console.log('Extracting comparison frames at 15s...');
  execFileSync(ffmpeg.path, ['-y', '-ss', '00:00:15', '-i', origVideo, '-vframes', '1', '-q:v', '2', origFrame]);
  execFileSync(ffmpeg.path, ['-y', '-ss', '00:00:15', '-i', desktopVideo, '-vframes', '1', '-q:v', '2', desktopFrame]);
  execFileSync(ffmpeg.path, ['-y', '-ss', '00:00:15', '-i', mobileVideo, '-vframes', '1', '-q:v', '2', mobileFrame]);

  // 2. LAUNCH PUPPETEER TO TEST IN-BROWSER PLAYBACK
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  // Desktop Test (1920x1080)
  console.log('\n--- TESTING DESKTOP (1920x1080) ---');
  const pageDesktop = await browser.newPage();
  await pageDesktop.setViewport({ width: 1920, height: 1080 });
  await pageDesktop.goto('http://localhost:3100', { waitUntil: 'domcontentloaded' });
  
  // Skip intro
  await pageDesktop.waitForFunction(() => window.WandersIntro && typeof window.WandersIntro.skip === 'function');
  await pageDesktop.evaluate(() => window.WandersIntro.skip());
  await new Promise(r => setTimeout(r, 2000));

  const desktopState = await pageDesktop.evaluate(() => {
    const v = document.querySelector('.w-hero-video');
    return {
      currentSrc: v.currentSrc,
      paused: v.paused,
      currentTime: v.currentTime,
      videoWidth: v.videoWidth,
      videoHeight: v.videoHeight,
      muted: v.muted,
      loop: v.loop,
      readyState: v.readyState
    };
  });
  console.log('Desktop State:', desktopState);
  const desktopShot = path.join(QA_DIR, 'live_desktop_hero_1080p.png');
  await pageDesktop.screenshot({ path: desktopShot });
  console.log('Saved:', desktopShot);
  await pageDesktop.close();

  // Mobile Test (390x844)
  console.log('\n--- TESTING MOBILE (390x844) ---');
  const pageMobile = await browser.newPage();
  await pageMobile.setViewport({ width: 390, height: 844, isMobile: true });
  await pageMobile.goto('http://localhost:3100', { waitUntil: 'domcontentloaded' });

  // Skip intro
  await pageMobile.waitForFunction(() => window.WandersIntro && typeof window.WandersIntro.skip === 'function');
  await pageMobile.evaluate(() => window.WandersIntro.skip());
  await new Promise(r => setTimeout(r, 2000));

  const mobileState = await pageMobile.evaluate(() => {
    const v = document.querySelector('.w-hero-video');
    return {
      currentSrc: v.currentSrc,
      paused: v.paused,
      currentTime: v.currentTime,
      videoWidth: v.videoWidth,
      videoHeight: v.videoHeight,
      muted: v.muted,
      loop: v.loop,
      readyState: v.readyState
    };
  });
  console.log('Mobile State:', mobileState);
  const mobileShot = path.join(QA_DIR, 'live_mobile_hero_vertical.png');
  await pageMobile.screenshot({ path: mobileShot });
  console.log('Saved:', mobileShot);
  await pageMobile.close();

  await browser.close();
  console.log('\n=== VERIFICATION COMPLETE ===');
})();
