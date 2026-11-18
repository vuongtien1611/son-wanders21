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
  console.log('Launching browser for 9.0s Cinematic Intro QA...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu-vsync', '--window-size=1920,1080']
  });

  const report = {
    desktop: {},
    mobile: {},
    skipButton: {}
  };

  try {
    // ---------------------------------------------------------
    // TEST 1: DESKTOP TIMELINE (1920 x 1080)
    // ---------------------------------------------------------
    console.log('\n--- Testing Desktop 1920x1080 ---');
    const pageDesktop = await browser.newPage();
    await pageDesktop.setViewport({ width: 1920, height: 1080 });

    const desktopErrors = [];
    pageDesktop.on('console', msg => {
      if (msg.type() === 'error') desktopErrors.push(msg.text());
    });

    const startDesktopNav = Date.now();
    await pageDesktop.goto('http://localhost:3100/index.html?intro=1', { waitUntil: 'domcontentloaded' });

    // Wait until intro starts
    await pageDesktop.waitForFunction(() => !!window.__wi_elapsed, { timeout: 3000 });

    // Helper to capture at given elapsed time
    async function captureDesktopAt(targetElapsed, filename) {
      await pageDesktop.waitForFunction(t => (window.__wi_elapsed || 0) >= t, {}, targetElapsed);
      const state = await pageDesktop.evaluate(() => {
        const root = document.getElementById('wanders-intro');
        const tagline = document.querySelector('.wi-tagline');
        const subline = document.querySelector('.wi-subline');
        const letters = Array.from(document.querySelectorAll('.wi-letter-slot.is-visible')).length;
        const rootClasses = root ? root.className : '';
        const taglineVisible = tagline ? window.getComputedStyle(tagline).opacity : '0';
        const sublineVisible = subline ? window.getComputedStyle(subline).opacity : '0';
        return {
          elapsed: Math.round(window.__wi_elapsed),
          letters,
          taglineVisible,
          sublineVisible,
          rootClasses,
          isIntroActive: document.documentElement.classList.contains('wi-active')
        };
      });
      await pageDesktop.screenshot({ path: path.join(OUT_DIR, filename) });
      console.log(`[Desktop t=${targetElapsed}ms] Elapsed=${state.elapsed}ms Letters=${state.letters}/7 TaglineOpacity=${state.taglineVisible} SublineOpacity=${state.sublineVisible}`);
      return state;
    }

    report.desktop.t1000 = await captureDesktopAt(1000, 'intro_9s_desktop_01_awakening.png');
    report.desktop.t2000 = await captureDesktopAt(2000, 'intro_9s_desktop_02_letters_forming.png');
    report.desktop.t3000 = await captureDesktopAt(3000, 'intro_9s_desktop_03_brand_revealed.png');
    report.desktop.t5000 = await captureDesktopAt(5000, 'intro_9s_desktop_04_steady_hold_mid.png');
    report.desktop.t6800 = await captureDesktopAt(6800, 'intro_9s_desktop_05_steady_hold_end.png');
    report.desktop.t7500 = await captureDesktopAt(7500, 'intro_9s_desktop_06_curtain_wipe.png');

    // Wait for completion
    await pageDesktop.waitForFunction(() => !document.documentElement.classList.contains('wi-active'), { timeout: 12000 });
    const desktopDoneElapsed = await pageDesktop.evaluate(() => Math.round(window.__wi_elapsed || 0));
    await pageDesktop.screenshot({ path: path.join(OUT_DIR, 'intro_9s_desktop_07_hero_revealed.png') });
    console.log(`[Desktop Done] Total elapsed: ${desktopDoneElapsed}ms`);
    report.desktop.totalDuration = desktopDoneElapsed;
    report.desktop.errors = desktopErrors;
    await pageDesktop.close();

    // ---------------------------------------------------------
    // TEST 2: MOBILE TIMELINE (390 x 844 iPhone 12/13/14)
    // ---------------------------------------------------------
    console.log('\n--- Testing Mobile 390x844 ---');
    const pageMobile = await browser.newPage();
    await pageMobile.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    const mobileErrors = [];
    pageMobile.on('console', msg => {
      if (msg.type() === 'error') mobileErrors.push(msg.text());
    });

    await pageMobile.goto('http://localhost:3100/index.html?intro=1', { waitUntil: 'domcontentloaded' });
    await pageMobile.waitForFunction(() => !!window.__wi_elapsed, { timeout: 3000 });

    async function captureMobileAt(targetElapsed, filename) {
      await pageMobile.waitForFunction(t => (window.__wi_elapsed || 0) >= t, {}, targetElapsed);
      const state = await pageMobile.evaluate(() => {
        const root = document.getElementById('wanders-intro');
        const tagline = document.querySelector('.wi-tagline');
        const subline = document.querySelector('.wi-subline');
        const letters = Array.from(document.querySelectorAll('.wi-letter-slot.is-visible')).length;
        const rootClasses = root ? root.className : '';
        const taglineVisible = tagline ? window.getComputedStyle(tagline).opacity : '0';
        const sublineVisible = subline ? window.getComputedStyle(subline).opacity : '0';
        return {
          elapsed: Math.round(window.__wi_elapsed),
          letters,
          taglineVisible,
          sublineVisible,
          rootClasses,
          isIntroActive: document.documentElement.classList.contains('wi-active')
        };
      });
      await pageMobile.screenshot({ path: path.join(OUT_DIR, filename) });
      console.log(`[Mobile t=${targetElapsed}ms] Elapsed=${state.elapsed}ms Letters=${state.letters}/7 TaglineOpacity=${state.taglineVisible} SublineOpacity=${state.sublineVisible}`);
      return state;
    }

    report.mobile.t1000 = await captureMobileAt(1000, 'intro_9s_mobile_01_awakening.png');
    report.mobile.t2000 = await captureMobileAt(2000, 'intro_9s_mobile_02_letters_forming.png');
    report.mobile.t3000 = await captureMobileAt(3000, 'intro_9s_mobile_03_brand_revealed.png');
    report.mobile.t5000 = await captureMobileAt(5000, 'intro_9s_mobile_04_steady_hold_mid.png');
    report.mobile.t6800 = await captureMobileAt(6800, 'intro_9s_mobile_05_steady_hold_end.png');
    report.mobile.t7500 = await captureMobileAt(7500, 'intro_9s_mobile_06_curtain_wipe.png');

    await pageMobile.waitForFunction(() => !document.documentElement.classList.contains('wi-active'), { timeout: 12000 });
    const mobileDoneElapsed = await pageMobile.evaluate(() => Math.round(window.__wi_elapsed || 0));
    await pageMobile.screenshot({ path: path.join(OUT_DIR, 'intro_9s_mobile_07_hero_revealed.png') });
    console.log(`[Mobile Done] Total elapsed: ${mobileDoneElapsed}ms`);
    report.mobile.totalDuration = mobileDoneElapsed;
    report.mobile.errors = mobileErrors;
    await pageMobile.close();

    // ---------------------------------------------------------
    // TEST 3: SKIP BUTTON FUNCTIONALITY
    // ---------------------------------------------------------
    console.log('\n--- Testing Skip Button ---');
    const pageSkip = await browser.newPage();
    await pageSkip.setViewport({ width: 1440, height: 900 });
    await pageSkip.goto('http://localhost:3100/index.html?intro=1', { waitUntil: 'domcontentloaded' });
    await pageSkip.waitForFunction(() => !!window.__wi_elapsed && window.__wi_elapsed > 1200);

    const skipBtnPresent = await pageSkip.$('#wiSkipBtn');
    console.log('Skip button present:', !!skipBtnPresent);
    await pageSkip.click('#wiSkipBtn');

    // Verify it cleanly and immediately unmounts
    await pageSkip.waitForFunction(() => !document.documentElement.classList.contains('wi-active'), { timeout: 2000 });
    const afterSkipActive = await pageSkip.evaluate(() => document.documentElement.classList.contains('wi-active'));
    const heroEnter = await pageSkip.evaluate(() => document.documentElement.classList.contains('wi-hero-enter'));
    console.log(`Skip triggered: wi-active=${afterSkipActive}, wi-hero-enter=${heroEnter}`);
    report.skipButton = {
      success: !afterSkipActive && heroEnter
    };
    await pageSkip.screenshot({ path: path.join(OUT_DIR, 'intro_9s_skip_tested.png') });
    await pageSkip.close();

  } catch (err) {
    console.error('QA Test Error:', err);
    report.error = err.message;
  } finally {
    await browser.close();
  }

  console.log('\n--- QA SUMMARY ---');
  console.log(JSON.stringify(report, null, 2));
}

runTest();
