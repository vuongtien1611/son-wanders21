const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/846aa58a-030f-45e9-978f-f9d61dc4eac5/qa_screenshots';
fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function runPresetTests() {
  console.log('=== STARTING WANDERS SUGGESTED COLOR COMBINATIONS TEST SUITE ===');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  // ==========================================
  // PART 1: DESKTOP VERIFICATION (1440x900)
  // ==========================================
  console.log('\n--- 1. DESKTOP 1440x900: SECTION & COMBINATION CARDS ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3100/bang-mau.html', { waitUntil: 'networkidle0' });

  // 1A. Inspect Section "Gợi ý phối màu"
  await page.evaluate(() => {
    const sec = document.querySelector('.suggested-section');
    if (sec) sec.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 200));

  const sectionCards = await page.evaluate(() => {
    const cards = document.querySelectorAll('.suggested-palette-card');
    return Array.from(cards).map(card => {
      const title = card.querySelector('h3')?.textContent.trim();
      const desc = card.querySelector('p')?.textContent.trim();
      const img = card.querySelector('img')?.getAttribute('src');
      const btnId = card.querySelector('.suggested-card-btn')?.getAttribute('data-combination-id');
      const swatches = Array.from(card.querySelectorAll('span.cursor-pointer')).map(s => ({
        bg: s.style.backgroundColor,
        title: s.getAttribute('title')
      }));
      return { title, desc, img, btnId, swatches };
    });
  });
  console.log('Detected 4 suggested cards:', sectionCards);

  if (sectionCards.length !== 4) {
    throw new Error(`FAIL: Expected 4 cards, found ${sectionCards.length}`);
  }
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'combo_01_desktop_suggested_section.png') });

  // 1B. Test Card 1: Pastel trang nhã
  console.log('\nTest 1B: Clicking "Xem chi tiết" on Card 1 (Pastel trang nhã)...');
  await page.evaluate(() => {
    const btn = document.querySelector('.suggested-card-btn[data-combination-id="pastel-trang-nha"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const pastelPresetState = await page.evaluate(() => {
    const banner = document.getElementById('studio-preset-banner');
    const isBannerVisible = banner && !banner.classList.contains('hidden');
    const title = document.getElementById('preset-banner-title')?.textContent.trim();
    const activeCode = document.getElementById('active-banner-code')?.textContent.trim();
    const activeHex = document.getElementById('active-banner-hex')?.textContent.trim();
    const swatchCards = document.querySelectorAll('.swatch-card');
    const codesInGrid = Array.from(swatchCards).map(c => c.getAttribute('data-color-code'));
    const countBadge = document.getElementById('color-count-badge')?.textContent.trim();
    return { isBannerVisible, title, activeCode, activeHex, countBadge, cardCount: swatchCards.length, codesInGrid };
  });
  console.log('Pastel preset state:', pastelPresetState);

  if (!pastelPresetState.isBannerVisible || pastelPresetState.cardCount !== 3 || pastelPresetState.activeCode !== '1080') {
    throw new Error('FAIL: Pastel preset did not show 3 cards or select 1080!');
  }
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'combo_02_desktop_pastel_preset_active.png') });

  // Test selecting the 2nd and 3rd card in preset
  await page.evaluate(() => {
    const card2 = document.querySelector('.swatch-card[data-color-code="1340"]');
    if (card2) card2.click();
  });
  await new Promise(r => setTimeout(r, 100));
  const activeCodeAfterClick = await page.evaluate(() => document.getElementById('active-banner-code')?.textContent.trim());
  console.log('Active banner after clicking card 2:', activeCodeAfterClick);
  if (activeCodeAfterClick !== '1340') {
    throw new Error('FAIL: Clicking 2nd card in preset did not update active banner!');
  }

  // Test clicking "Quay lại bảng màu đầy đủ"
  console.log('Testing "Quay lại bảng màu đầy đủ" button...');
  await page.evaluate(() => {
    const btn = document.getElementById('btn-exit-preset');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 300));

  const afterExitState = await page.evaluate(() => {
    const banner = document.getElementById('studio-preset-banner');
    const isBannerVisible = banner && !banner.classList.contains('hidden');
    const swatchCards = document.querySelectorAll('.swatch-card');
    return { isBannerVisible, cardCount: swatchCards.length };
  });
  console.log('State after exiting preset:', afterExitState);
  if (afterExitState.isBannerVisible || afterExitState.cardCount !== 1002) {
    throw new Error('FAIL: Exit button did not restore full 1002 colors!');
  }

  // 1C. Test Card 2: Tông đỏ & đất ấm cúng
  console.log('\nTest 1C: Testing Card 2 (Tông đỏ & đất ấm cúng)...');
  await page.evaluate(() => {
    window.WandersColorStudio.openCombination('tong-do-dat-am-cung');
  });
  await new Promise(r => setTimeout(r, 300));

  const warmEarthState = await page.evaluate(() => {
    const swatchCards = document.querySelectorAll('.swatch-card');
    const activeCode = document.getElementById('active-banner-code')?.textContent.trim();
    const codesInGrid = Array.from(swatchCards).map(c => c.getAttribute('data-color-code'));
    return { activeCode, cardCount: swatchCards.length, codesInGrid };
  });
  console.log('Warm Earth preset state:', warmEarthState);
  if (warmEarthState.cardCount !== 3 || warmEarthState.activeCode !== '2351-P') {
    throw new Error('FAIL: Warm Earth preset did not show 3 cards or select 2351-P!');
  }
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'combo_03_desktop_warm_earth_preset.png') });

  // 1D. Test Card 3: Xanh lá thảo mộc tự nhiên
  console.log('\nTest 1D: Testing Card 3 (Xanh lá thảo mộc tự nhiên)...');
  await page.evaluate(() => {
    window.WandersColorStudio.openCombination('xanh-la-thao-moc');
  });
  await new Promise(r => setTimeout(r, 300));

  const greenHerbState = await page.evaluate(() => {
    const swatchCards = document.querySelectorAll('.swatch-card');
    const activeCode = document.getElementById('active-banner-code')?.textContent.trim();
    const codesInGrid = Array.from(swatchCards).map(c => c.getAttribute('data-color-code'));
    return { activeCode, cardCount: swatchCards.length, codesInGrid };
  });
  console.log('Green Herb preset state:', greenHerbState);
  if (greenHerbState.cardCount !== 3 || greenHerbState.activeCode !== '2641-P') {
    throw new Error('FAIL: Green Herb preset did not show 3 cards or select 2641-P!');
  }
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'combo_04_desktop_green_herb_preset.png') });

  // 1E. Test Card 4: Xanh dương đại dương thanh lịch
  console.log('\nTest 1E: Testing Card 4 (Xanh dương đại dương thanh lịch)...');
  await page.evaluate(() => {
    window.WandersColorStudio.openCombination('xanh-duong-dai-duong');
  });
  await new Promise(r => setTimeout(r, 300));

  const oceanBlueState = await page.evaluate(() => {
    const swatchCards = document.querySelectorAll('.swatch-card');
    const activeCode = document.getElementById('active-banner-code')?.textContent.trim();
    const activeHex = document.getElementById('active-banner-hex')?.textContent.trim();
    const codesInGrid = Array.from(swatchCards).map(c => c.getAttribute('data-color-code'));
    return { activeCode, activeHex, cardCount: swatchCards.length, codesInGrid };
  });
  console.log('Ocean Blue preset state:', oceanBlueState);
  if (oceanBlueState.cardCount !== 3 || oceanBlueState.activeCode !== '2911-P') {
    throw new Error('FAIL: Ocean Blue preset did not show 3 cards or select 2911-P!');
  }
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'combo_05_desktop_ocean_blue_preset.png') });

  // ==========================================
  // PART 2: MOBILE VERIFICATION (390x844)
  // ==========================================
  console.log('\n--- 2. MOBILE 390x844: PRESET COMBINATION & RESPONSIVENESS ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3100/bang-mau.html', { waitUntil: 'networkidle0' });

  // Scroll to suggested section on mobile
  await page.evaluate(() => {
    const sec = document.querySelector('.suggested-section');
    if (sec) sec.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'combo_06_mobile_suggested_section.png') });

  // Click "Xem chi tiết" on Ocean Blue card
  console.log('Mobile: Clicking "Xem chi tiết" on Ocean Blue card...');
  await page.evaluate(() => {
    const btn = document.querySelector('.suggested-card-btn[data-combination-id="xanh-duong-dai-duong"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const mobileOceanState = await page.evaluate(() => {
    const banner = document.getElementById('studio-preset-banner');
    const isBannerVisible = banner && !banner.classList.contains('hidden');
    const swatchCards = document.querySelectorAll('.swatch-card');
    const activeCode = document.getElementById('active-banner-code')?.textContent.trim();
    const pagination = document.getElementById('mobile-pagination');
    return {
      isBannerVisible,
      cardCount: swatchCards.length,
      activeCode,
      paginationText: pagination ? pagination.textContent.trim() : ''
    };
  });
  console.log('Mobile Ocean Blue preset state:', mobileOceanState);
  if (!mobileOceanState.isBannerVisible || mobileOceanState.cardCount !== 3 || mobileOceanState.activeCode !== '2911-P') {
    throw new Error('FAIL: Mobile Ocean Blue preset did not render 3 cards or select 2911-P!');
  }
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'combo_07_mobile_ocean_blue_preset_active.png') });

  // Exit preset on mobile
  console.log('Mobile: Exiting preset mode...');
  await page.evaluate(() => {
    const btn = document.getElementById('btn-exit-preset');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 300));

  const mobileRestoredState = await page.evaluate(() => {
    const swatchCards = document.querySelectorAll('.swatch-card');
    const statusText = document.querySelector('.page-status-text')?.textContent.trim();
    return { cardCount: swatchCards.length, statusText };
  });
  console.log('Mobile state after exiting preset:', mobileRestoredState);
  if (mobileRestoredState.cardCount !== 12) {
    throw new Error(`FAIL: Expected 12 cards on mobile page 1, got ${mobileRestoredState.cardCount}`);
  }
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'combo_08_mobile_restored_pagination.png') });

  // ==========================================
  // PART 3: CONSOLE ERRORS CHECK
  // ==========================================
  console.log('\n=== CONSOLE ERRORS DETECTED: ' + consoleErrors.length + ' ===');
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
    throw new Error('FAIL: Detected console errors during preset combinations testing!');
  }
  console.log('PASSED: Zero console errors detected across all viewports!');

  await browser.close();
  console.log('\n=== ALL PRESET COMBINATION TESTS PASSED 100% SUCCESSFULLY! ===');
}

runPresetTests().catch(err => {
  console.error('\nTEST SUITE FAILED:', err);
  process.exit(1);
});
