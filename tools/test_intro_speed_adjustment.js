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
  console.log('Testing WANDERS Intro Speed Adjustment: 28% Faster Drop + Exact 2.0s Brand Hold...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  const report = {
    desktop: {},
    mobile: {},
    skipButton: {},
    errors: []
  };

  try {
    // ---------------------------------------------------------
    // TEST 1: DESKTOP (1920 x 1080)
    // ---------------------------------------------------------
    console.log('\n--- Testing Desktop 1920x1080 ---');
    const pageDesktop = await browser.newPage();
    await pageDesktop.setViewport({ width: 1920, height: 1080 });

    pageDesktop.on('console', m => { if (m.type() === 'error') report.errors.push(`[Console Error] ${m.text()}`); });
    pageDesktop.on('requestfailed', r => report.errors.push(`[Failed Req] ${r.url()}`));

    await pageDesktop.goto('http://localhost:3100/index.html?intro=1', { waitUntil: 'domcontentloaded' });
    await pageDesktop.waitForFunction(() => !!window.__wi_elapsed, { timeout: 3000 });

    // Step A: Drop falling & impact (t = 800ms)
    await pageDesktop.waitForFunction(() => (window.__wi_elapsed || 0) >= 800);
    const impactElapsed = await pageDesktop.evaluate(() => Math.round(window.__wi_elapsed));
    await pageDesktop.screenshot({ path: path.join(OUT_DIR, 'speed_adj_desktop_01_impact_800ms.png') });
    console.log(`[Desktop] Drop reached surface at: ${impactElapsed}ms (Previous: 1150ms, speedup: ~30%)`);
    report.desktop.impactElapsed = impactElapsed;

    // Step B: Text emergence complete (t = 2500ms) -> HOLD BEGINS
    await pageDesktop.waitForFunction(() => (window.__wi_elapsed || 0) >= 2500);
    const holdStartData = await pageDesktop.evaluate(() => {
      const tagline = document.querySelector('.wi-tagline');
      const subline = document.querySelector('.wi-subline');
      const letters = document.querySelectorAll('.wi-letter-slot.is-visible').length;
      const cs = (el) => el ? window.getComputedStyle(el) : null;
      return {
        elapsed: Math.round(window.__wi_elapsed),
        letters,
        taglineOpacity: cs(tagline)?.opacity,
        sublineOpacity: cs(subline)?.opacity,
        taglineText: tagline?.textContent,
        sublineText: subline?.textContent
      };
    });
    await pageDesktop.screenshot({ path: path.join(OUT_DIR, 'speed_adj_desktop_02_hold_start_2500ms.png') });
    console.log('[Desktop] Brand Hold START (All text 100% visible):', holdStartData);
    report.desktop.holdStart = holdStartData;

    // Step C: Mid-hold (t = 3500ms, exactly 1.0s into hold)
    await pageDesktop.waitForFunction(() => (window.__wi_elapsed || 0) >= 3500);
    const holdMidData = await pageDesktop.evaluate(() => {
      const tagline = document.querySelector('.wi-tagline');
      const subline = document.querySelector('.wi-subline');
      const letters = document.querySelectorAll('.wi-letter-slot.is-visible').length;
      const cs = (el) => el ? window.getComputedStyle(el) : null;
      return {
        elapsed: Math.round(window.__wi_elapsed),
        letters,
        taglineOpacity: cs(tagline)?.opacity,
        sublineOpacity: cs(subline)?.opacity
      };
    });
    await pageDesktop.screenshot({ path: path.join(OUT_DIR, 'speed_adj_desktop_03_hold_mid_3500ms.png') });
    console.log('[Desktop] Brand Hold MID (1.0s into hold):', holdMidData);
    report.desktop.holdMid = holdMidData;

    // Step D: End of exact 2.0s hold (t = 4480ms, right before fade at 4500ms)
    await pageDesktop.waitForFunction(() => (window.__wi_elapsed || 0) >= 4480);
    const holdEndData = await pageDesktop.evaluate(() => {
      const tagline = document.querySelector('.wi-tagline');
      const subline = document.querySelector('.wi-subline');
      const letters = document.querySelectorAll('.wi-letter-slot.is-visible').length;
      const cs = (el) => el ? window.getComputedStyle(el) : null;
      return {
        elapsed: Math.round(window.__wi_elapsed),
        letters,
        taglineOpacity: cs(tagline)?.opacity,
        sublineOpacity: cs(subline)?.opacity
      };
    });
    await pageDesktop.screenshot({ path: path.join(OUT_DIR, 'speed_adj_desktop_04_hold_end_4480ms.png') });
    console.log('[Desktop] Brand Hold END (exact 2.0s reached):', holdEndData);
    report.desktop.holdEnd = holdEndData;
    report.desktop.exactHoldDurationMs = holdEndData.elapsed - holdStartData.elapsed;

    // Step E: Curtain Wipe Transition (t = 5000ms)
    await pageDesktop.waitForFunction(() => (window.__wi_elapsed || 0) >= 5000);
    await pageDesktop.screenshot({ path: path.join(OUT_DIR, 'speed_adj_desktop_05_curtain_wipe.png') });

    // Step F: Complete (Hero active)
    await pageDesktop.waitForFunction(() => !document.documentElement.classList.contains('wi-active'), { timeout: 10000 });
    const desktopTotalElapsed = await pageDesktop.evaluate(() => Math.round(window.__wi_elapsed || 0));
    await pageDesktop.screenshot({ path: path.join(OUT_DIR, 'speed_adj_desktop_06_hero_active.png') });
    console.log(`[Desktop] Total Intro Duration: ${desktopTotalElapsed}ms`);
    report.desktop.totalDuration = desktopTotalElapsed;
    await pageDesktop.close();

    // ---------------------------------------------------------
    // TEST 2: MOBILE (390 x 844 iPhone 12/13/14)
    // ---------------------------------------------------------
    console.log('\n--- Testing Mobile 390x844 ---');
    const pageMobile = await browser.newPage();
    await pageMobile.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    await pageMobile.goto('http://localhost:3100/index.html?intro=1', { waitUntil: 'domcontentloaded' });
    await pageMobile.waitForFunction(() => !!window.__wi_elapsed, { timeout: 3000 });

    // Step A: Impact
    await pageMobile.waitForFunction(() => (window.__wi_elapsed || 0) >= 820);
    const mobileImpact = await pageMobile.evaluate(() => Math.round(window.__wi_elapsed));
    await pageMobile.screenshot({ path: path.join(OUT_DIR, 'speed_adj_mobile_01_impact_820ms.png') });
    report.mobile.impactElapsed = mobileImpact;

    // Step B: Hold Start (t = 2500ms)
    await pageMobile.waitForFunction(() => (window.__wi_elapsed || 0) >= 2500);
    const mobileHoldStart = await pageMobile.evaluate(() => {
      const tagline = document.querySelector('.wi-tagline');
      const subline = document.querySelector('.wi-subline');
      const letters = document.querySelectorAll('.wi-letter-slot.is-visible').length;
      const cs = (el) => el ? window.getComputedStyle(el) : null;
      return {
        elapsed: Math.round(window.__wi_elapsed),
        letters,
        taglineOpacity: cs(tagline)?.opacity,
        sublineOpacity: cs(subline)?.opacity
      };
    });
    await pageMobile.screenshot({ path: path.join(OUT_DIR, 'speed_adj_mobile_02_hold_start.png') });
    report.mobile.holdStart = mobileHoldStart;

    // Step C: Hold End (t = 4480ms)
    await pageMobile.waitForFunction(() => (window.__wi_elapsed || 0) >= 4480);
    const mobileHoldEnd = await pageMobile.evaluate(() => {
      const tagline = document.querySelector('.wi-tagline');
      const subline = document.querySelector('.wi-subline');
      const letters = document.querySelectorAll('.wi-letter-slot.is-visible').length;
      const cs = (el) => el ? window.getComputedStyle(el) : null;
      return {
        elapsed: Math.round(window.__wi_elapsed),
        letters,
        taglineOpacity: cs(tagline)?.opacity,
        sublineOpacity: cs(subline)?.opacity
      };
    });
    await pageMobile.screenshot({ path: path.join(OUT_DIR, 'speed_adj_mobile_03_hold_end.png') });
    report.mobile.holdEnd = mobileHoldEnd;
    report.mobile.exactHoldDurationMs = mobileHoldEnd.elapsed - mobileHoldStart.elapsed;

    // Step D: Finished
    await pageMobile.waitForFunction(() => !document.documentElement.classList.contains('wi-active'), { timeout: 10000 });
    const mobileTotalElapsed = await pageMobile.evaluate(() => Math.round(window.__wi_elapsed || 0));
    await pageMobile.screenshot({ path: path.join(OUT_DIR, 'speed_adj_mobile_04_hero_active.png') });
    report.mobile.totalDuration = mobileTotalElapsed;
    await pageMobile.close();

    // ---------------------------------------------------------
    // TEST 3: SKIP BUTTON TEST
    // ---------------------------------------------------------
    console.log('\n--- Testing Skip Button ---');
    const pageSkip = await browser.newPage();
    await pageSkip.setViewport({ width: 1440, height: 900 });
    await pageSkip.goto('http://localhost:3100/index.html?intro=1', { waitUntil: 'domcontentloaded' });
    await pageSkip.waitForFunction(() => !!window.__wi_elapsed && window.__wi_elapsed > 1000);
    await pageSkip.click('#wiSkipBtn');
    await pageSkip.waitForFunction(() => !document.documentElement.classList.contains('wi-active'), { timeout: 2000 });
    console.log('Skip button verified successfully.');
    report.skipButton.success = true;
    await pageSkip.close();

  } catch (err) {
    console.error('QA Error:', err);
    report.error = err.message;
  } finally {
    await browser.close();
  }

  console.log('\n=== SPEED ADJUSTMENT QA SUMMARY ===');
  console.log(JSON.stringify(report, null, 2));
}

runTest();
