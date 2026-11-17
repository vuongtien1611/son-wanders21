const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/846aa58a-030f-45e9-978f-f9d61dc4eac5/qa_screenshots';
fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function runComprehensiveTests() {
  console.log('=== STARTING WANDERS SCROLL TWO-WAY TRANSITION VERIFICATION ===');

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
  // PART 1: DESKTOP TESTING (1440x900)
  // ==========================================
  console.log('\n--- 1. DESKTOP 1440x900: FULL TWO-WAY SCROLL JOURNEY ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3100/bang-mau.html', { waitUntil: 'networkidle0' });

  // Check initial state
  const initialScrollY = await page.evaluate(() => window.scrollY);
  console.log('Initial window.scrollY:', initialScrollY);

  // A. Scroll down 20 times continuously from top into studio
  console.log('Test 1A: Scrolling down from top of page towards studio...');
  for (let i = 0; i < 5; i++) {
    await page.mouse.move(700, 300);
    await page.mouse.wheel({ deltaY: 150 });
    await new Promise(r => setTimeout(r, 40));
  }
  const yAfterEnter = await page.evaluate(() => window.scrollY);
  console.log('window.scrollY after entering studio:', yAfterEnter);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'fix_01_desktop_entered_studio.png') });

  // B. Scroll inside grid to bottom of swatches (hovering over grid: 700, 500)
  console.log('Test 1B: Scrolling through swatches inside grid container...');
  // We can test over "Purple" (88 colors) first to test clear transition
  await page.evaluate(() => {
    const purpleBtn = document.querySelector('[data-cat-id="purple"]');
    if (purpleBtn) purpleBtn.click();
  });
  await new Promise(r => setTimeout(r, 100));

  const purpleCount = await page.evaluate(() => document.querySelectorAll('.swatch-card').length);
  console.log('Purple tab swatch count:', purpleCount);

  // Scroll grid to bottom
  for (let i = 0; i < 15; i++) {
    await page.mouse.move(700, 550);
    await page.mouse.wheel({ deltaY: 200 });
    await new Promise(r => setTimeout(r, 35));
  }

  const atBottomGridState = await page.evaluate(() => {
    const g = document.getElementById('swatch-grid-container');
    return {
      windowY: window.scrollY,
      gridScrollTop: g.scrollTop,
      maxScroll: g.scrollHeight - g.clientHeight,
      atBottom: g.scrollTop >= g.scrollHeight - g.clientHeight - 1
    };
  });
  console.log('Grid state at bottom:', atBottomGridState);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'fix_02_desktop_grid_at_bottom.png') });

  // C. Continue scrolling down past grid bottom -> MUST SCROLL WINDOW DOWN TO FOOTER
  console.log('Test 1C: Scrolling past bottom of grid swatches -> continuing to footer...');
  for (let i = 0; i < 15; i++) {
    await page.mouse.move(700, 550);
    await page.mouse.wheel({ deltaY: 200 });
    await new Promise(r => setTimeout(r, 35));
  }

  const footerState = await page.evaluate(() => {
    return {
      windowY: window.scrollY,
      documentHeight: document.documentElement.scrollHeight
    };
  });
  console.log('Reached lower sections/footer: window.scrollY =', footerState.windowY);
  if (footerState.windowY <= yAfterEnter + 100) {
    throw new Error('FAIL: Window did not scroll down to lower sections after reaching grid bottom!');
  }
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'fix_03_desktop_scrolled_to_footer.png') });

  // D. Scroll reverse: from footer back UP to studio
  console.log('Test 1D: Scrolling back up from footer towards studio...');
  for (let i = 0; i < 15; i++) {
    await page.mouse.move(700, 500);
    await page.mouse.wheel({ deltaY: -200 });
    await new Promise(r => setTimeout(r, 35));
  }

  const returningState = await page.evaluate(() => {
    const sec = document.getElementById('color-studio-app');
    const g = document.getElementById('swatch-grid-container');
    return {
      windowY: window.scrollY,
      secTop: sec.getBoundingClientRect().top,
      gridScrollTop: g.scrollTop
    };
  });
  console.log('State returning to studio:', returningState);

  // E. Continue scrolling up: grid scrolls up to top, then window scrolls up to header
  console.log('Test 1E: Scrolling grid up to top and continuing up to header...');
  for (let i = 0; i < 20; i++) {
    await page.mouse.move(700, 500);
    await page.mouse.wheel({ deltaY: -200 });
    await new Promise(r => setTimeout(r, 35));
  }

  const finalTopState = await page.evaluate(() => {
    const g = document.getElementById('swatch-grid-container');
    return {
      windowY: window.scrollY,
      gridScrollTop: g.scrollTop
    };
  });
  console.log('State back at top of website:', finalTopState);
  if (finalTopState.windowY !== 0) {
    throw new Error(`FAIL: Window did not return to top (window.scrollY = ${finalTopState.windowY})`);
  }
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'fix_04_desktop_returned_to_header.png') });

  // ==========================================
  // PART 2: TEST HOVER OVER SIDEBAR, BANNER, TABS
  // ==========================================
  console.log('\n--- 2. DESKTOP HOVER WHEEL: BANNER, SIDEBAR & TABS ---');
  // Align studio under header
  await page.evaluate(() => {
    const sec = document.getElementById('color-studio-app');
    const header = document.querySelector('header');
    const hH = header ? header.offsetHeight : 77;
    window.scrollTo({ top: sec.getBoundingClientRect().top + window.scrollY - hH, behavior: 'instant' });
  });

  // A. Wheel over Active Banner (X: 700, Y: 180)
  console.log('Testing wheel over Active Banner...');
  const bannerScrollBefore = await page.evaluate(() => document.getElementById('swatch-grid-container').scrollTop);
  for (let i = 0; i < 5; i++) {
    await page.mouse.move(700, 180);
    await page.mouse.wheel({ deltaY: 150 });
    await new Promise(r => setTimeout(r, 30));
  }
  const bannerScrollAfter = await page.evaluate(() => document.getElementById('swatch-grid-container').scrollTop);
  console.log(`Banner wheel scroll: ${bannerScrollBefore} -> ${bannerScrollAfter}`);
  if (bannerScrollAfter <= bannerScrollBefore) {
    throw new Error('FAIL: Wheeling over Active Banner did not scroll the swatch grid!');
  }

  // B. Wheel over Sidebar (X: 180, Y: 500)
  console.log('Testing wheel over Sidebar...');
  const sidebarScrollBefore = bannerScrollAfter;
  for (let i = 0; i < 5; i++) {
    await page.mouse.move(180, 500);
    await page.mouse.wheel({ deltaY: 150 });
    await new Promise(r => setTimeout(r, 30));
  }
  const sidebarScrollAfter = await page.evaluate(() => document.getElementById('swatch-grid-container').scrollTop);
  console.log(`Sidebar wheel scroll: ${sidebarScrollBefore} -> ${sidebarScrollAfter}`);
  if (sidebarScrollAfter <= sidebarScrollBefore) {
    throw new Error('FAIL: Wheeling over Sidebar did not scroll the swatch grid!');
  }

  // C. Wheel over Category Tabs (X: 700, Y: 260)
  console.log('Testing wheel over Category Tabs...');
  const tabsScrollBefore = sidebarScrollAfter;
  for (let i = 0; i < 5; i++) {
    await page.mouse.move(700, 260);
    await page.mouse.wheel({ deltaY: 150 });
    await new Promise(r => setTimeout(r, 30));
  }
  const tabsScrollAfter = await page.evaluate(() => document.getElementById('swatch-grid-container').scrollTop);
  console.log(`Tabs wheel scroll: ${tabsScrollBefore} -> ${tabsScrollAfter}`);
  if (tabsScrollAfter <= tabsScrollBefore) {
    throw new Error('FAIL: Wheeling over Category Tabs did not scroll the swatch grid!');
  }

  // ==========================================
  // PART 3: TEST DIFFERENT CATEGORIES & FEW SWATCHES
  // ==========================================
  console.log('\n--- 3. TESTING CATEGORIES: PASTEL, ĐỎ, XÁM, ALL & FILTER WITH FEW SWATCHES ---');
  // Switch to Pastel
  await page.evaluate(() => document.querySelector('[data-cat-id="pastel"]').click());
  const pastelCount = await page.evaluate(() => document.querySelectorAll('.swatch-card').length);
  console.log('Pastel swatch count:', pastelCount);

  // Switch to Red
  await page.evaluate(() => document.querySelector('[data-cat-id="red"]').click());
  const redCount = await page.evaluate(() => document.querySelectorAll('.swatch-card').length);
  console.log('Red swatch count:', redCount);

  // Switch to All (1002 colors)
  await page.evaluate(() => document.querySelector('[data-cat-id="all"]').click());
  const allCount = await page.evaluate(() => document.querySelectorAll('.swatch-card').length);
  console.log('All categories swatch count:', allCount);
  if (allCount !== 1002) {
    throw new Error(`FAIL: Expected 1002 swatches, found ${allCount}`);
  }

  // Test filter with very few swatches (e.g. search "white-1" -> 1 swatch)
  console.log('Testing search with 1 swatch (does not lock scroll)...');
  await page.evaluate(() => {
    const input = document.getElementById('color-search-input');
    input.value = 'white-1';
    input.dispatchEvent(new Event('input'));
  });
  await new Promise(r => setTimeout(r, 250));

  const singleSwatchState = await page.evaluate(() => {
    const g = document.getElementById('swatch-grid-container');
    const cards = document.querySelectorAll('.swatch-card');
    return {
      cardCount: cards.length,
      maxScroll: g.scrollHeight - g.clientHeight,
      atBottom: g.scrollTop >= g.scrollHeight - g.clientHeight - 1,
      atTop: g.scrollTop <= 1
    };
  });
  console.log('Single swatch state:', singleSwatchState);

  // When only 1 swatch, wheel down should immediately scroll the window down
  const yBeforeSingle = await page.evaluate(() => window.scrollY);
  for (let i = 0; i < 5; i++) {
    await page.mouse.move(700, 500);
    await page.mouse.wheel({ deltaY: 200 });
    await new Promise(r => setTimeout(r, 30));
  }
  const yAfterSingle = await page.evaluate(() => window.scrollY);
  console.log(`Wheel down with 1 swatch: window.scrollY ${yBeforeSingle} -> ${yAfterSingle}`);
  if (yAfterSingle <= yBeforeSingle) {
    throw new Error('FAIL: When filtered swatches do not overflow, window did not scroll!');
  }

  // Clear search
  await page.evaluate(() => {
    document.getElementById('color-search-clear').click();
  });
  await new Promise(r => setTimeout(r, 200));

  // ==========================================
  // PART 4: MOBILE TESTING (< 768px)
  // ==========================================
  console.log('\n--- 4. MOBILE 390x844: NATURAL DOCUMENT SCROLL & PAGINATION ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3100/bang-mau.html', { waitUntil: 'networkidle0' });

  const mobileProps = await page.evaluate(() => {
    const gridContainer = document.getElementById('swatch-grid-container');
    const pagination = document.getElementById('mobile-pagination');
    const cards = document.querySelectorAll('.swatch-card');
    const compStyle = window.getComputedStyle(gridContainer);
    return {
      cardCount: cards.length,
      overflowY: compStyle.overflowY,
      paginationDisplay: window.getComputedStyle(pagination).display,
      bodyHeight: document.body.scrollHeight,
      windowHeight: window.innerHeight
    };
  });
  console.log('Mobile properties:', mobileProps);

  if (mobileProps.cardCount !== 12) {
    throw new Error(`FAIL: Mobile should display exactly 12 cards, got ${mobileProps.cardCount}`);
  }
  if (mobileProps.overflowY !== 'visible') {
    throw new Error(`FAIL: Mobile gridContainer should have overflow: visible, got ${mobileProps.overflowY}`);
  }

  // Scroll naturally from top of page to bottom on mobile
  console.log('Scrolling whole document down on mobile...');
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
  });
  const mobileScrolledY = await page.evaluate(() => window.scrollY);
  console.log('Mobile scrolled to bottom: window.scrollY =', mobileScrolledY);
  if (mobileScrolledY < 1000) {
    throw new Error('FAIL: Mobile could not scroll through entire document!');
  }
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'fix_05_mobile_scrolled_to_footer.png') });

  // Test pagination button on mobile
  console.log('Testing mobile pagination click...');
  await page.evaluate(() => {
    const page2Btn = document.querySelector('.page-num-btn[data-page="2"]');
    if (page2Btn) page2Btn.click();
  });
  await new Promise(r => setTimeout(r, 100));

  const mobilePage2Props = await page.evaluate(() => {
    const cards = document.querySelectorAll('.swatch-card');
    const firstCode = cards[0]?.getAttribute('data-color-code');
    const activePage = document.querySelector('.page-num-btn.active')?.textContent.trim();
    return { cardCount: cards.length, firstCode, activePage };
  });
  console.log('Mobile Page 2 Props:', mobilePage2Props);
  if (mobilePage2Props.cardCount !== 12 || mobilePage2Props.activePage !== '2') {
    throw new Error('FAIL: Mobile pagination to Page 2 failed!');
  }
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'fix_06_mobile_page_2.png') });

  // ==========================================
  // PART 5: CONSOLE ERRORS CHECK
  // ==========================================
  console.log('\n=== CONSOLE ERRORS DETECTED: ' + consoleErrors.length + ' ===');
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
    throw new Error('FAIL: Detected console errors during scroll testing!');
  }
  console.log('PASSED: Zero console errors detected across all viewports!');

  await browser.close();
  console.log('\n=== ALL TWO-WAY SCROLL TESTS PASSED 100% SUCCESSFULLY! ===');
}

runComprehensiveTests().catch(err => {
  console.error('\nTEST SUITE FAILED:', err);
  process.exit(1);
});
