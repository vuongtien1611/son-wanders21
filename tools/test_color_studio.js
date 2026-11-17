const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/846aa58a-030f-45e9-978f-f9d61dc4eac5/qa_screenshots';
fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });

// Chrome executable paths on Windows
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function runTests() {
  console.log('Starting Color Studio automated test suite...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();

  // Listen to console logs and page errors
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  // 1. Test Desktop 1440x900
  console.log('\n--- 1. Testing Desktop (1440x900) ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3100/bang-mau.html', { waitUntil: 'networkidle0' });

  // Verify page title
  const title = await page.title();
  console.log('Page Title:', title);

  // Verify Category Tabs
  const tabs = await page.evaluate(() => {
    const tabBtns = Array.from(document.querySelectorAll('#color-category-tabs .color-cat-tab'));
    return tabBtns.map(b => ({
      catId: b.getAttribute('data-cat-id'),
      name: b.querySelector('.color-cat-tab-name')?.textContent.trim(),
      count: b.querySelector('.color-cat-tab-count')?.textContent.trim(),
      isActive: b.classList.contains('active')
    }));
  });
  console.log('Category Tabs found (' + tabs.length + '):', tabs);

  // Verify initial swatch grid count
  const initialGridCount = await page.evaluate(() => {
    return document.querySelectorAll('#swatch-grid .swatch-card').length;
  });
  console.log('Initial rendered swatches count (page 1 limit):', initialGridCount);

  // Verify total count badge
  const totalBadgeText = await page.evaluate(() => document.getElementById('color-count-badge')?.textContent.trim());
  console.log('Total count badge text:', totalBadgeText);

  // Verify Active Banner Initial Color
  const activeBanner = await page.evaluate(() => {
    return {
      code: document.getElementById('active-banner-code')?.textContent.trim(),
      name: document.getElementById('active-banner-name')?.textContent.trim(),
      hex: document.getElementById('active-banner-hex')?.textContent.trim(),
      bg: document.getElementById('active-color-banner')?.style.backgroundColor
    };
  });
  console.log('Initial Active Banner:', activeBanner);

  // Take Desktop Screenshot
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'color_studio_desktop_all.png'), fullPage: false });
  console.log('Saved color_studio_desktop_all.png');

  // 2. Test Tab Switching to "Đỏ" (227 colors)
  console.log('\n--- 2. Testing Tab Switching to "Đỏ" ---');
  await page.evaluate(() => {
    const redTab = document.querySelector('#color-category-tabs [data-cat-id="red"]');
    if (redTab) redTab.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const redTabInfo = await page.evaluate(() => {
    const badge = document.getElementById('color-count-badge')?.textContent.trim();
    const swatches = document.querySelectorAll('#swatch-grid .swatch-card').length;
    const firstCode = document.querySelector('#swatch-grid .swatch-card .swatch-code')?.textContent.trim();
    const firstHex = document.querySelector('#swatch-grid .swatch-card .swatch-hex')?.textContent.trim();
    const loadMoreVisible = !document.getElementById('load-more-wrap')?.classList.contains('hidden');
    const loadMoreText = document.getElementById('btn-load-more')?.textContent.trim();
    return { badge, swatches, firstCode, firstHex, loadMoreVisible, loadMoreText };
  });
  console.log('Switched to Đỏ:', redTabInfo);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'color_studio_desktop_red_tab.png'), fullPage: false });

  // 3. Test Clicking a Color Card
  console.log('\n--- 3. Testing Color Selection on Click ---');
  await page.evaluate(() => {
    const cards = document.querySelectorAll('#swatch-grid .swatch-card');
    if (cards.length > 2) cards[2].click();
  });
  await new Promise(r => setTimeout(r, 300));

  const updatedBanner = await page.evaluate(() => {
    return {
      code: document.getElementById('active-banner-code')?.textContent.trim(),
      name: document.getElementById('active-banner-name')?.textContent.trim(),
      hex: document.getElementById('active-banner-hex')?.textContent.trim(),
      bg: document.getElementById('active-color-banner')?.style.backgroundColor
    };
  });
  console.log('Updated Active Banner on Card Click:', updatedBanner);

  // 4. Test Search by Code & HEX
  console.log('\n--- 4. Testing Live Search ---');
  await page.evaluate(() => {
    // Switch back to "Tất cả"
    document.querySelector('#color-category-tabs [data-cat-id="all"]').click();
  });
  await new Promise(r => setTimeout(r, 200));

  await page.type('#color-search-input', '2001-P');
  await new Promise(r => setTimeout(r, 400));

  const searchResults = await page.evaluate(() => {
    const badge = document.getElementById('color-count-badge')?.textContent.trim();
    const cards = Array.from(document.querySelectorAll('#swatch-grid .swatch-card')).map(c => ({
      code: c.querySelector('.swatch-code')?.textContent.trim(),
      hex: c.querySelector('.swatch-hex')?.textContent.trim()
    }));
    return { badge, cards };
  });
  console.log('Search "2001-P" results:', searchResults);

  // Test Search by HEX
  await page.evaluate(() => {
    const input = document.getElementById('color-search-input');
    input.value = '';
  });
  await page.type('#color-search-input', 'ebdfc7');
  await new Promise(r => setTimeout(r, 400));

  const hexSearchResults = await page.evaluate(() => {
    const badge = document.getElementById('color-count-badge')?.textContent.trim();
    const cards = Array.from(document.querySelectorAll('#swatch-grid .swatch-card')).map(c => ({
      code: c.querySelector('.swatch-code')?.textContent.trim(),
      hex: c.querySelector('.swatch-hex')?.textContent.trim()
    }));
    return { badge, cards };
  });
  console.log('Search HEX "ebdfc7" results:', hexSearchResults);

  // Clear search
  await page.evaluate(() => {
    document.getElementById('color-search-clear').click();
  });
  await new Promise(r => setTimeout(r, 300));

  // 5. Test Load More button
  console.log('\n--- 5. Testing Load More Progressive Pagination ---');
  const countBefore = await page.evaluate(() => document.querySelectorAll('#swatch-grid .swatch-card').length);
  await page.evaluate(() => {
    document.getElementById('btn-load-more')?.click();
  });
  await new Promise(r => setTimeout(r, 300));
  const countAfter = await page.evaluate(() => document.querySelectorAll('#swatch-grid .swatch-card').length);
  console.log('Swatches rendered: before = ' + countBefore + ', after clicking Xem thêm = ' + countAfter);

  // 6. Test Mobile Viewports (320px, 375px, 390px, 430px)
  console.log('\n--- 6. Testing Mobile Viewports ---');
  const viewports = [
    { name: 'mobile_320x866', width: 320, height: 866 },
    { name: 'mobile_375x812', width: 375, height: 812 },
    { name: 'mobile_390x844', width: 390, height: 844 },
    { name: 'mobile_430x932', width: 430, height: 932 }
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.evaluate(() => {
      // scroll studio into view
      document.getElementById('color-studio-app')?.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 400));

    // Check horizontal scrollable tabs
    const tabScrollProps = await page.evaluate(() => {
      const el = document.getElementById('color-category-tabs');
      return {
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        isScrollable: el.scrollWidth > el.clientWidth
      };
    });
    console.log('Viewport ' + vp.name + ' tabs scrollable:', tabScrollProps);

    // Capture screenshot
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'color_studio_' + vp.name + '.png'), fullPage: false });
    console.log('Saved color_studio_' + vp.name + '.png');
  }

  // 7. Test Horizontal Scroll touch-swipe on Mobile 390
  await page.setViewport({ width: 390, height: 844 });
  // Click on "Xanh lá" tab (index 7) to check smooth centering
  await page.evaluate(() => {
    const greenTab = document.querySelector('#color-category-tabs [data-cat-id="green"]');
    if (greenTab) greenTab.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const greenTabActive = await page.evaluate(() => {
    const activeTab = document.querySelector('#color-category-tabs .color-cat-tab.active');
    const badge = document.getElementById('color-count-badge')?.textContent.trim();
    const banner = {
      code: document.getElementById('active-banner-code')?.textContent.trim(),
      name: document.getElementById('active-banner-name')?.textContent.trim()
    };
    return {
      activeTabName: activeTab?.querySelector('.color-cat-tab-name')?.textContent.trim(),
      activeTabCount: activeTab?.querySelector('.color-cat-tab-count')?.textContent.trim(),
      badge,
      banner
    };
  });
  console.log('Mobile swipe & click "Xanh lá":', greenTabActive);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'color_studio_mobile_green_tab.png'), fullPage: false });

  await browser.close();
  console.log('\nAll tests completed successfully!');
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
