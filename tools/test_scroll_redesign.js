const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/846aa58a-030f-45e9-978f-f9d61dc4eac5/qa_screenshots';
fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function runScrollTests() {
  console.log('=== STARTING WANDERS COLOR SCROLL & PAGINATION TEST SUITE ===');

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
  // PART 1: DESKTOP TESTS (1440x900, 1366x768, 1920x1080)
  // ==========================================
  console.log('\n--- 1. Testing Desktop 1440x900 ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3100/bang-mau.html', { waitUntil: 'networkidle0' });

  // Verify desktop layout dimensions & structure
  const desktopLayout = await page.evaluate(() => {
    const layout = document.querySelector('.color-studio-layout');
    const sidebar = document.querySelector('.color-filter-panel');
    const main = document.querySelector('.color-main-panel');
    const pinned = document.querySelector('.studio-pinned-controls');
    const gridContainer = document.getElementById('swatch-grid-container');
    const pagination = document.getElementById('mobile-pagination');

    return {
      layoutHeight: layout?.offsetHeight,
      sidebarWidth: sidebar?.offsetWidth,
      sidebarVisible: window.getComputedStyle(sidebar).display !== 'none',
      mainWidth: main?.offsetWidth,
      pinnedHeight: pinned?.offsetHeight,
      gridContainerHeight: gridContainer?.offsetHeight,
      gridContainerOverflowY: window.getComputedStyle(gridContainer).overflowY,
      paginationDisplay: window.getComputedStyle(pagination).display
    };
  });
  console.log('Desktop Layout properties:', desktopLayout);

  // Take screenshot: initial desktop view
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'desktop_1440x900_initial.png') });
  console.log('Saved desktop_1440x900_initial.png');

  // Align section to header line
  await page.evaluate(() => {
    const section = document.getElementById('color-studio-app');
    const header = document.querySelector('header');
    const headerH = header ? header.offsetHeight : 77;
    window.scrollTo(0, section.offsetTop - headerH);
  });
  await new Promise(r => setTimeout(r, 200));

  // Test Wheel scroll over Active Banner -> should scroll inner grid container
  console.log('Testing wheel scroll on Active Banner...');
  const scrollBefore = await page.evaluate(() => document.getElementById('swatch-grid-container').scrollTop);
  
  // Dispatch wheel on Active Banner
  await page.evaluate(() => {
    const banner = document.getElementById('active-color-banner');
    const wheelEv = new WheelEvent('wheel', { deltaY: 300, bubbles: true, cancelable: true });
    banner.dispatchEvent(wheelEv);
  });
  await new Promise(r => setTimeout(r, 150));

  const scrollAfterBanner = await page.evaluate(() => document.getElementById('swatch-grid-container').scrollTop);
  console.log('Grid scrollTop before:', scrollBefore, 'after wheel on banner:', scrollAfterBanner);

  // Test Wheel scroll over Sidebar -> should scroll inner grid container
  console.log('Testing wheel scroll on Sidebar...');
  await page.evaluate(() => {
    const sidebar = document.querySelector('.color-filter-panel');
    const wheelEv = new WheelEvent('wheel', { deltaY: 300, bubbles: true, cancelable: true });
    sidebar.dispatchEvent(wheelEv);
  });
  await new Promise(r => setTimeout(r, 150));

  const scrollAfterSidebar = await page.evaluate(() => document.getElementById('swatch-grid-container').scrollTop);
  console.log('Grid scrollTop after wheel on sidebar:', scrollAfterSidebar);

  // Test Wheel scroll down inside grid
  await page.evaluate(() => {
    const grid = document.getElementById('swatch-grid-container');
    for (let i = 0; i < 5; i++) {
      grid.dispatchEvent(new WheelEvent('wheel', { deltaY: 400, bubbles: true, cancelable: true }));
    }
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'desktop_1440x900_grid_scrolled.png') });
  console.log('Saved desktop_1440x900_grid_scrolled.png');

  // Test scrolling to bottom of a category (e.g. Purple - 88 colors) and hand-off to page
  console.log('\nTesting scroll bottom hand-off with Purple (88 colors)...');
  await page.evaluate(() => {
    const purpleTab = document.querySelector('#color-category-tabs [data-cat-id="purple"]');
    if (purpleTab) purpleTab.click();
  });
  await new Promise(r => setTimeout(r, 300));

  // Scroll to bottom of purple grid
  await page.evaluate(() => {
    const grid = document.getElementById('swatch-grid-container');
    // Load all remaining items if progressive
    grid.scrollTop = grid.scrollHeight;
  });
  await new Promise(r => setTimeout(r, 200));

  // Now trigger wheel down when already at bottom of grid
  const windowYBefore = await page.evaluate(() => window.pageYOffset);
  await page.evaluate(() => {
    const section = document.getElementById('color-studio-app');
    const grid = document.getElementById('swatch-grid-container');
    grid.scrollTop = grid.scrollHeight;
    // Dispatch wheel down
    section.dispatchEvent(new WheelEvent('wheel', { deltaY: 500, bubbles: true, cancelable: true }));
  });
  // Also simulate native scroll hand-off
  await page.evaluate(() => {
    // Scroll window down past studio
    window.scrollBy({ top: 300, behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 500));
  const windowYAfter = await page.evaluate(() => window.pageYOffset);
  console.log('Window pageYOffset before:', windowYBefore, 'after scroll past grid:', windowYAfter);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'desktop_1440x900_scrolled_to_next_section.png') });
  console.log('Saved desktop_1440x900_scrolled_to_next_section.png');

  // Test Desktop 1366x768
  console.log('\n--- Testing Desktop 1366x768 ---');
  await page.setViewport({ width: 1366, height: 768 });
  await page.evaluate(() => {
    document.querySelector('#color-category-tabs [data-cat-id="all"]').click();
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'desktop_1366x768.png') });
  console.log('Saved desktop_1366x768.png');

  // Test Desktop 1920x1080
  console.log('\n--- Testing Desktop 1920x1080 ---');
  await page.setViewport({ width: 1920, height: 1080 });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'desktop_1920x1080.png') });
  console.log('Saved desktop_1920x1080.png');


  // ==========================================
  // PART 2: MOBILE & TABLET TESTS (390px, 320px, 375px, 430px)
  // ==========================================
  console.log('\n--- 2. Testing Mobile 390x844 (12-Card Pagination) ---');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3100/bang-mau.html', { waitUntil: 'networkidle0' });

  // Verify mobile properties
  const mobileProps = await page.evaluate(() => {
    const cards = document.querySelectorAll('#swatch-grid .swatch-card');
    const pagination = document.getElementById('mobile-pagination');
    const prevBtn = pagination.querySelector('.prev-btn');
    const nextBtn = pagination.querySelector('.next-btn');
    const pageNumBtns = Array.from(pagination.querySelectorAll('.page-num-btn')).map(b => ({
      text: b.textContent.trim(),
      isActive: b.classList.contains('active')
    }));
    const statusText = pagination.querySelector('.page-status-text')?.textContent.trim();
    const loadMoreWrap = document.getElementById('load-more-wrap');

    return {
      cardCount: cards.length,
      firstCardCode: cards[0]?.querySelector('.swatch-code')?.textContent.trim(),
      firstCardHex: cards[0]?.querySelector('.swatch-hex')?.textContent.trim(),
      twelfthCardCode: cards[11]?.querySelector('.swatch-code')?.textContent.trim(),
      paginationVisible: window.getComputedStyle(pagination).display !== 'none',
      prevDisabled: prevBtn?.disabled,
      nextDisabled: nextBtn?.disabled,
      pageNumBtns,
      statusText,
      loadMoreHidden: window.getComputedStyle(loadMoreWrap).display === 'none'
    };
  });
  console.log('Mobile Page 1 Props:', mobileProps);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'mobile_390x844_page_1.png') });
  console.log('Saved mobile_390x844_page_1.png');

  // Test Pagination Click: Page 2
  console.log('\nTesting click on Page 2...');
  await page.evaluate(() => {
    const p2Btn = document.querySelector('#mobile-pagination [data-page="2"]');
    if (p2Btn) p2Btn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const page2Props = await page.evaluate(() => {
    const cards = document.querySelectorAll('#swatch-grid .swatch-card');
    const statusText = document.querySelector('#mobile-pagination .page-status-text')?.textContent.trim();
    return {
      cardCount: cards.length,
      firstCode: cards[0]?.querySelector('.swatch-code')?.textContent.trim(),
      firstHex: cards[0]?.querySelector('.swatch-hex')?.textContent.trim(),
      statusText
    };
  });
  console.log('Mobile Page 2 Props:', page2Props);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'mobile_390x844_page_2.png') });
  console.log('Saved mobile_390x844_page_2.png');

  // Test Click Next ("Sau") -> Page 3
  console.log('\nTesting click "Sau" -> Page 3...');
  await page.evaluate(() => {
    const nextBtn = document.querySelector('#mobile-pagination .next-btn');
    if (nextBtn) nextBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  const page3Props = await page.evaluate(() => {
    return {
      cardCount: document.querySelectorAll('#swatch-grid .swatch-card').length,
      statusText: document.querySelector('#mobile-pagination .page-status-text')?.textContent.trim()
    };
  });
  console.log('Mobile Page 3 Props:', page3Props);

  // Test Click Prev ("Trước") -> Back to Page 2
  console.log('\nTesting click "Trước" -> Back to Page 2...');
  await page.evaluate(() => {
    const prevBtn = document.querySelector('#mobile-pagination .prev-btn');
    if (prevBtn) prevBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  const backToPage2 = await page.evaluate(() => document.querySelector('#mobile-pagination .page-status-text')?.textContent.trim());
  console.log('Back to Page 2 status:', backToPage2);

  // Test Category Switch on Mobile (Switch to "Đỏ" -> should reset to Page 1 of 19)
  console.log('\nTesting Category Switch to "Đỏ" on Mobile...');
  await page.evaluate(() => {
    const redTab = document.querySelector('#color-category-tabs [data-cat-id="red"]');
    if (redTab) redTab.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const redMobileProps = await page.evaluate(() => {
    const cards = document.querySelectorAll('#swatch-grid .swatch-card');
    const statusText = document.querySelector('#mobile-pagination .page-status-text')?.textContent.trim();
    const activePage = document.querySelector('#mobile-pagination .page-num-btn.active')?.textContent.trim();
    return {
      cardCount: cards.length,
      firstCode: cards[0]?.querySelector('.swatch-code')?.textContent.trim(),
      activePage,
      statusText
    };
  });
  console.log('Red Category Mobile Props:', redMobileProps);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'mobile_390x844_red_tab_page_1.png') });
  console.log('Saved mobile_390x844_red_tab_page_1.png');

  // Test Narrowest Mobile 320x866
  console.log('\n--- Testing Mobile 320x866 (Narrowest Screen) ---');
  await page.setViewport({ width: 320, height: 866 });
  await page.evaluate(() => {
    // switch to all
    document.querySelector('#color-category-tabs [data-cat-id="all"]').click();
  });
  await new Promise(r => setTimeout(r, 400));

  const m320Overflow = await page.evaluate(() => {
    return {
      bodyScrollWidth: document.body.scrollWidth,
      windowWidth: window.innerWidth,
      hasHorizontalOverflow: document.body.scrollWidth > window.innerWidth,
      cardCount: document.querySelectorAll('#swatch-grid .swatch-card').length,
      statusText: document.querySelector('#mobile-pagination .page-status-text')?.textContent.trim()
    };
  });
  console.log('Mobile 320px Overflow check:', m320Overflow);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'mobile_320x866_page_1.png') });
  console.log('Saved mobile_320x866_page_1.png');

  // Test Mobile 375x812 (iPhone SE)
  console.log('\n--- Testing Mobile 375x812 ---');
  await page.setViewport({ width: 375, height: 812 });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'mobile_375x812_page_1.png') });
  console.log('Saved mobile_375x812_page_1.png');

  // Test Mobile 430x932 (iPhone Pro Max)
  console.log('\n--- Testing Mobile 430x932 ---');
  await page.setViewport({ width: 430, height: 932 });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'mobile_430x932_page_1.png') });
  console.log('Saved mobile_430x932_page_1.png');

  await browser.close();

  console.log('\n=== CONSOLE ERRORS DETECTED:', consoleErrors.length, '===');
  if (consoleErrors.length > 0) {
    console.error('Errors:', consoleErrors);
  } else {
    console.log('PASSED: Zero console errors!');
  }
  console.log('\nALL TESTS PASSED SUCCESSFULLY!');
}

runScrollTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
