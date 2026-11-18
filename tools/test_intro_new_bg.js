const fs = require('fs');
const path = require('path');
const puppeteer = require('../node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const executablePath = fs.existsSync(CHROME_PATH) ? CHROME_PATH : EDGE_PATH;

const OUT_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/846aa58a-030f-45e9-978f-f9d61dc4eac5/qa_screenshots';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function runTest() {
  console.log('Launching browser to test New Emerald Waves Background in Intro...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  const report = {
    desktop: {},
    mobile: {},
    network: {
      bgLoadedCount: 0,
      errors: []
    }
  };

  try {
    // ---------------------------------------------------------
    // TEST 1: DESKTOP (1920 x 1080)
    // ---------------------------------------------------------
    console.log('\n--- Testing Desktop 1920x1080 ---');
    const pageDesktop = await browser.newPage();
    await pageDesktop.setViewport({ width: 1920, height: 1080 });

    pageDesktop.on('console', msg => {
      if (msg.type() === 'error') report.network.errors.push(`[Console Error] ${msg.text()}`);
    });
    pageDesktop.on('requestfailed', req => {
      report.network.errors.push(`[Failed Request] ${req.url()}`);
    });
    pageDesktop.on('response', res => {
      if (res.url().includes('Emerald%20Waves%20with%20Golden%20Light.png')) {
        report.network.bgLoadedCount++;
        console.log(`Image response: ${res.url()} status=${res.status()}`);
      }
    });

    await pageDesktop.goto('http://localhost:3100/index.html?intro=1', { waitUntil: 'domcontentloaded' });
    await pageDesktop.waitForFunction(() => !!window.__wi_elapsed, { timeout: 3000 });

    // Capture Scene 01 (drop/awakening) to verify new background is NOT showing early
    await pageDesktop.waitForFunction(() => (window.__wi_elapsed || 0) >= 1000);
    const bgOpacityS1 = await pageDesktop.evaluate(() => {
      const el = document.getElementById('wiBrandBg');
      return el ? window.getComputedStyle(el).opacity : 'null';
    });
    await pageDesktop.screenshot({ path: path.join(OUT_DIR, 'new_bg_desktop_01_scene1_awakening.png') });
    console.log(`[Desktop t=1000ms] Brand BG Opacity=${bgOpacityS1} (should be 0)`);
    report.desktop.scene1BgOpacity = bgOpacityS1;

    // Capture Scene 04: Brand Hold at t=3500ms (All text visible + new background)
    await pageDesktop.waitForFunction(() => (window.__wi_elapsed || 0) >= 3500);
    const desktopBrandInfo = await pageDesktop.evaluate(() => {
      const bg = document.getElementById('wiBrandBg');
      const bgImg = document.querySelector('.wi-brand-bg-image');
      const tagline = document.querySelector('.wi-tagline');
      const subline = document.querySelector('.wi-subline');
      const letters = document.querySelectorAll('.wi-letter-slot.is-visible').length;
      const bgStyle = bg ? window.getComputedStyle(bg) : null;
      const bgImgStyle = bgImg ? window.getComputedStyle(bgImg) : null;
      return {
        bgOpacity: bgStyle ? bgStyle.opacity : 'null',
        bgImage: bgImgStyle ? bgImgStyle.backgroundImage : 'null',
        bgSize: bgImgStyle ? bgImgStyle.backgroundSize : 'null',
        bgPosition: bgImgStyle ? bgImgStyle.backgroundPosition : 'null',
        bgTransform: bgImgStyle ? bgImgStyle.transform : 'null',
        taglineOpacity: tagline ? window.getComputedStyle(tagline).opacity : 'null',
        sublineOpacity: subline ? window.getComputedStyle(subline).opacity : 'null',
        letters
      };
    });
    await pageDesktop.screenshot({ path: path.join(OUT_DIR, 'new_bg_desktop_02_brand_hold.png') });
    console.log('[Desktop t=3500ms Brand Hold]:', desktopBrandInfo);
    report.desktop.brandHold = desktopBrandInfo;

    // Capture Scene 04: Late Hold at t=6000ms to verify continuous slow zoom scale
    await pageDesktop.waitForFunction(() => (window.__wi_elapsed || 0) >= 6000);
    const desktopLateZoom = await pageDesktop.evaluate(() => {
      const bgImg = document.querySelector('.wi-brand-bg-image');
      return bgImg ? window.getComputedStyle(bgImg).transform : 'null';
    });
    await pageDesktop.screenshot({ path: path.join(OUT_DIR, 'new_bg_desktop_03_late_zoom.png') });
    console.log(`[Desktop t=6000ms Late Hold] Transform: ${desktopLateZoom}`);
    report.desktop.lateZoom = desktopLateZoom;

    // Wait until intro completes
    await pageDesktop.waitForFunction(() => !document.documentElement.classList.contains('wi-active'), { timeout: 12000 });
    console.log('[Desktop] Intro finished cleanly.');
    await pageDesktop.close();

    // ---------------------------------------------------------
    // TEST 2: MOBILE (390 x 844 iPhone 12/13/14)
    // ---------------------------------------------------------
    console.log('\n--- Testing Mobile 390x844 ---');
    const pageMobile = await browser.newPage();
    await pageMobile.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    await pageMobile.goto('http://localhost:3100/index.html?intro=1', { waitUntil: 'domcontentloaded' });
    await pageMobile.waitForFunction(() => !!window.__wi_elapsed, { timeout: 3000 });

    // Capture Scene 04 at t=3500ms
    await pageMobile.waitForFunction(() => (window.__wi_elapsed || 0) >= 3500);
    const mobileBrandInfo = await pageMobile.evaluate(() => {
      const bg = document.getElementById('wiBrandBg');
      const bgImg = document.querySelector('.wi-brand-bg-image');
      const tagline = document.querySelector('.wi-tagline');
      const subline = document.querySelector('.wi-subline');
      const letters = document.querySelectorAll('.wi-letter-slot.is-visible').length;
      const bgStyle = bg ? window.getComputedStyle(bg) : null;
      const bgImgStyle = bgImg ? window.getComputedStyle(bgImg) : null;
      return {
        bgOpacity: bgStyle ? bgStyle.opacity : 'null',
        bgImage: bgImgStyle ? bgImgStyle.backgroundImage : 'null',
        bgSize: bgImgStyle ? bgImgStyle.backgroundSize : 'null',
        bgPosition: bgImgStyle ? bgImgStyle.backgroundPosition : 'null',
        taglineOpacity: tagline ? window.getComputedStyle(tagline).opacity : 'null',
        sublineOpacity: subline ? window.getComputedStyle(subline).opacity : 'null',
        letters
      };
    });
    await pageMobile.screenshot({ path: path.join(OUT_DIR, 'new_bg_mobile_01_brand_hold.png') });
    console.log('[Mobile t=3500ms Brand Hold]:', mobileBrandInfo);
    report.mobile.brandHold = mobileBrandInfo;

    // Capture Scene 04 at t=6000ms
    await pageMobile.waitForFunction(() => (window.__wi_elapsed || 0) >= 6000);
    await pageMobile.screenshot({ path: path.join(OUT_DIR, 'new_bg_mobile_02_late_zoom.png') });

    await pageMobile.waitForFunction(() => !document.documentElement.classList.contains('wi-active'), { timeout: 12000 });
    console.log('[Mobile] Intro finished cleanly.');
    await pageMobile.close();

    // ---------------------------------------------------------
    // TEST 3: SKIP BUTTON TEST
    // ---------------------------------------------------------
    console.log('\n--- Testing Skip Button ---');
    const pageSkip = await browser.newPage();
    await pageSkip.setViewport({ width: 1440, height: 900 });
    await pageSkip.goto('http://localhost:3100/index.html?intro=1', { waitUntil: 'domcontentloaded' });
    await pageSkip.waitForFunction(() => !!window.__wi_elapsed && window.__wi_elapsed > 2000);
    await pageSkip.click('#wiSkipBtn');
    await pageSkip.waitForFunction(() => !document.documentElement.classList.contains('wi-active'), { timeout: 2000 });
    console.log('Skip button verified successfully.');
    report.skipSuccess = true;
    await pageSkip.close();

  } catch (err) {
    console.error('Test error:', err);
    report.error = err.message;
  } finally {
    await browser.close();
  }

  console.log('\n=== QA REPORT ===');
  console.log(JSON.stringify(report, null, 2));
}

runTest();
