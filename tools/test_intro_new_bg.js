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
  console.log('Launching browser for Comprehensive QA of WANDERS Intro Brand Scene with Emerald Waves Background...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  const report = {
    desktop: {},
    mobile: {},
    skipButton: {},
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

    async function captureDesktop(targetMs, filename) {
      await pageDesktop.waitForFunction(t => (window.__wi_elapsed || 0) >= t, {}, targetMs);
      const data = await pageDesktop.evaluate(() => {
        const bg = document.getElementById('wiBrandBg');
        const bgImg = document.querySelector('.wi-brand-bg-image');
        const brandStage = document.querySelector('.wi-brand-stage');
        const tagline = document.querySelector('.wi-tagline');
        const subline = document.querySelector('.wi-subline');
        const goldRule = document.querySelector('.wi-gold-rule');
        const lettersVisible = document.querySelectorAll('.wi-letter-slot.is-visible').length;
        const letterW = document.querySelector('.wi-letter-slot[data-glyph="W"]');

        const cs = (el) => el ? window.getComputedStyle(el) : null;
        const rect = (el) => {
          if (!el) return null;
          const b = el.getBoundingClientRect();
          return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) };
        };

        return {
          elapsed: Math.round(window.__wi_elapsed),
          lettersVisible,
          bgOpacity: cs(bg)?.opacity,
          bgZIndex: cs(bg)?.zIndex,
          brandStageZIndex: cs(brandStage)?.zIndex,
          brandStageOpacity: cs(brandStage)?.opacity,
          brandStageRect: rect(brandStage),
          letterWRect: rect(letterW),
          taglineText: tagline?.textContent,
          taglineOpacity: cs(tagline)?.opacity,
          taglineRect: rect(tagline),
          sublineText: subline?.textContent,
          sublineOpacity: cs(subline)?.opacity,
          sublineRect: rect(subline),
          goldRuleWidth: cs(goldRule)?.width,
          goldRuleOpacity: cs(goldRule)?.opacity,
          bgImage: cs(bgImg)?.backgroundImage,
          bgSize: cs(bgImg)?.backgroundSize,
          bgPosition: cs(bgImg)?.backgroundPosition,
          bgTransform: cs(bgImg)?.transform
        };
      });

      await pageDesktop.screenshot({ path: path.join(OUT_DIR, filename) });
      console.log(`[Desktop t=${targetMs}ms] Letters=${data.lettersVisible}/7 TaglineOpacity=${data.taglineOpacity} SublineOpacity=${data.sublineOpacity} bgOpacity=${data.bgOpacity} bgZ=${data.bgZIndex} brandStageZ=${data.brandStageZIndex}`);
      return data;
    }

    // 1. Khi logo bắt đầu xuất hiện (t = 2.0s)
    report.desktop.stage1_logoStart = await captureDesktop(2000, 'fix_desktop_01_logo_start.png');

    // 2. Khi logo và toàn bộ chữ đã xuất hiện (t = 3.2s)
    report.desktop.stage2_allText = await captureDesktop(3200, 'fix_desktop_02_all_text_revealed.png');

    // 3. Giữa thời gian giữ Scene (t = 5.0s)
    report.desktop.stage3_midHold = await captureDesktop(5000, 'fix_desktop_03_mid_hold.png');

    // 4. Ngay trước khi Intro kết thúc (t = 6.8s)
    report.desktop.stage4_preExit = await captureDesktop(6800, 'fix_desktop_04_pre_exit.png');

    // 5. Chuyển cảnh rèm lên (t = 7.6s)
    report.desktop.stage5_curtainWipe = await captureDesktop(7600, 'fix_desktop_05_curtain_wipe.png');

    // Wait until finished
    await pageDesktop.waitForFunction(() => !document.documentElement.classList.contains('wi-active'), { timeout: 12000 });
    await pageDesktop.screenshot({ path: path.join(OUT_DIR, 'fix_desktop_06_hero_done.png') });
    console.log('[Desktop] Intro completed.');
    await pageDesktop.close();

    // ---------------------------------------------------------
    // TEST 2: MOBILE (390 x 844 iPhone 12/13/14)
    // ---------------------------------------------------------
    console.log('\n--- Testing Mobile 390x844 ---');
    const pageMobile = await browser.newPage();
    await pageMobile.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    await pageMobile.goto('http://localhost:3100/index.html?intro=1', { waitUntil: 'domcontentloaded' });
    await pageMobile.waitForFunction(() => !!window.__wi_elapsed, { timeout: 3000 });

    async function captureMobile(targetMs, filename) {
      await pageMobile.waitForFunction(t => (window.__wi_elapsed || 0) >= t, {}, targetMs);
      const data = await pageMobile.evaluate(() => {
        const bg = document.getElementById('wiBrandBg');
        const bgImg = document.querySelector('.wi-brand-bg-image');
        const brandStage = document.querySelector('.wi-brand-stage');
        const tagline = document.querySelector('.wi-tagline');
        const subline = document.querySelector('.wi-subline');
        const lettersVisible = document.querySelectorAll('.wi-letter-slot.is-visible').length;
        const letterW = document.querySelector('.wi-letter-slot[data-glyph="W"]');

        const cs = (el) => el ? window.getComputedStyle(el) : null;
        const rect = (el) => {
          if (!el) return null;
          const b = el.getBoundingClientRect();
          return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) };
        };

        return {
          elapsed: Math.round(window.__wi_elapsed),
          lettersVisible,
          bgOpacity: cs(bg)?.opacity,
          bgZIndex: cs(bg)?.zIndex,
          brandStageZIndex: cs(brandStage)?.zIndex,
          brandStageOpacity: cs(brandStage)?.opacity,
          letterWRect: rect(letterW),
          taglineOpacity: cs(tagline)?.opacity,
          taglineRect: rect(tagline),
          sublineOpacity: cs(subline)?.opacity,
          sublineRect: rect(subline),
          bgSize: cs(bgImg)?.backgroundSize,
          bgPosition: cs(bgImg)?.backgroundPosition
        };
      });

      await pageMobile.screenshot({ path: path.join(OUT_DIR, filename) });
      console.log(`[Mobile t=${targetMs}ms] Letters=${data.lettersVisible}/7 TaglineOpacity=${data.taglineOpacity} SublineOpacity=${data.sublineOpacity} bgOpacity=${data.bgOpacity} bgZ=${data.bgZIndex} brandStageZ=${data.brandStageZIndex}`);
      return data;
    }

    report.mobile.stage1_logoStart = await captureMobile(2000, 'fix_mobile_01_logo_start.png');
    report.mobile.stage2_allText = await captureMobile(3200, 'fix_mobile_02_all_text_revealed.png');
    report.mobile.stage3_midHold = await captureMobile(5000, 'fix_mobile_03_mid_hold.png');
    report.mobile.stage4_preExit = await captureMobile(6800, 'fix_mobile_04_pre_exit.png');
    report.mobile.stage5_curtainWipe = await captureMobile(7600, 'fix_mobile_05_curtain_wipe.png');

    await pageMobile.waitForFunction(() => !document.documentElement.classList.contains('wi-active'), { timeout: 12000 });
    await pageMobile.screenshot({ path: path.join(OUT_DIR, 'fix_mobile_06_hero_done.png') });
    console.log('[Mobile] Intro completed.');
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
    report.skipButton.success = true;
    await pageSkip.close();

  } catch (err) {
    console.error('QA Error:', err);
    report.error = err.message;
  } finally {
    await browser.close();
  }

  console.log('\n=== FINAL QA SUMMARY ===');
  console.log(JSON.stringify(report, null, 2));
}

runTest();
