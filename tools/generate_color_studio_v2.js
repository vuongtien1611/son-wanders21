const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PALETTE_PATH = path.join(ROOT_DIR, 'src/data/color_palette.json');
const TARGET_JS_PATH = path.join(ROOT_DIR, 'src/js/wanders_color_studio_v2.js');

const paletteData = JSON.parse(fs.readFileSync(PALETTE_PATH, 'utf8'));

// Compact representation of items to keep JS file size optimal
// Each item: [code, hex, catId, catName, shade, brightness, tone, lum]
const compactItems = paletteData.items.map(i => ({
  c: i.code,
  h: i.hex,
  g: i.catId,
  n: i.catName,
  s: i.shade,
  b: i.brightness,
  t: i.tone,
  l: i.lum
}));

const categories = paletteData.categories;

const jsContent = `/**
 * WANDERS COLOR STUDIO V2 — ARCHITECTURAL COLOR SYSTEM
 * Built for WANDERS Luxury Paint & Color City Pro Master Palette
 * 1.002 Unique Architectural Colors | 8 Categories + Tất cả | Mobile Touch Horizontal Scroll
 */

(function () {
  'use strict';

  // --- 1. DATA DEFINITIONS ---
  const CATEGORIES = ${JSON.stringify(categories, null, 2)};

  // Raw items array (1.237 rows)
  const RAW_ITEMS_DATA = ${JSON.stringify(compactItems)};

  // Expand compact items to standard objects
  const RAW_ITEMS = RAW_ITEMS_DATA.map(item => ({
    code: item.c,
    hex: item.h,
    catId: item.g,
    catName: item.n,
    shade: item.s,
    brightness: item.b,
    tone: item.t,
    lum: item.l
  }));

  // Build category membership map: code -> Set of category names
  const CODE_CATEGORIES_MAP = new Map();
  RAW_ITEMS.forEach(item => {
    if (!CODE_CATEGORIES_MAP.has(item.code)) {
      CODE_CATEGORIES_MAP.set(item.code, []);
    }
    const arr = CODE_CATEGORIES_MAP.get(item.code);
    if (!arr.includes(item.catName)) {
      arr.push(item.catName);
    }
  });

  // Deduplicate unique colors for "Tất cả" (1.002 unique colors)
  const UNIQUE_MAP = new Map();
  RAW_ITEMS.forEach(item => {
    if (!UNIQUE_MAP.has(item.code)) {
      UNIQUE_MAP.set(item.code, {
        ...item,
        allCategories: CODE_CATEGORIES_MAP.get(item.code)
      });
    }
  });
  const UNIQUE_COLORS = Array.from(UNIQUE_MAP.values());

  // Attach allCategories to every item in RAW_ITEMS
  RAW_ITEMS.forEach(item => {
    item.allCategories = CODE_CATEGORIES_MAP.get(item.code) || [item.catName];
  });

  // --- 2. STATE MANAGEMENT ---
  const state = {
    selectedColor: UNIQUE_COLORS.find(c => c.code === '1340') || UNIQUE_COLORS[0],
    activeCategory: 'all', // 'all' | 'pastel' | 'red' | 'grey' | 'blue' | 'brown' | 'yellow' | 'green' | 'purple'
    activeShade: 'all',
    activeBrightness: 'all',
    activeTone: 'all',
    searchQuery: '',
    viewMode: 'grid', // 'grid' | 'compact'
    displayLimit: 48,
    pageSize: 48,
    favorites: new Set()
  };

  // Restore favorites from localStorage
  try {
    const saved = localStorage.getItem('wanders_fav_colors');
    if (saved) {
      const arr = JSON.parse(saved);
      if (Array.isArray(arr)) arr.forEach(code => state.favorites.add(code));
    }
  } catch (e) {}

  // --- 3. UTILITIES ---
  function removeVietnameseTones(str) {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\\u0300-\\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  }

  function getLuminance(hex) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  function showToast(message) {
    const toast = document.getElementById('studio-toast');
    const msgEl = document.getElementById('studio-toast-msg');
    if (!toast || !msgEl) return;
    msgEl.textContent = message;
    toast.classList.add('show');

    if (window._toastTimer) clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  function saveFavorites() {
    try {
      localStorage.setItem('wanders_fav_colors', JSON.stringify(Array.from(state.favorites)));
    } catch (e) {}
  }

  // --- 4. FILTERING LOGIC ---
  function getFilteredColors() {
    let list;
    if (state.activeCategory === 'all') {
      list = UNIQUE_COLORS;
    } else {
      list = RAW_ITEMS.filter(item => item.catId === state.activeCategory);
    }

    if (state.searchQuery) {
      const q = removeVietnameseTones(state.searchQuery.trim().toLowerCase());
      // When user searches: if 'all', search across all unique colors; if specific category, search inside that category
      list = list.filter(item => {
        const codeMatch = removeVietnameseTones(item.code.toLowerCase()).includes(q);
        const hexMatch = item.hex.toLowerCase().includes(q) || item.hex.replace('#', '').toLowerCase().includes(q);
        const catMatch = item.allCategories.some(cat => removeVietnameseTones(cat.toLowerCase()).includes(q));
        return codeMatch || hexMatch || catMatch;
      });
    }

    if (state.activeShade !== 'all') {
      list = list.filter(item => item.shade === state.activeShade);
    }
    if (state.activeBrightness !== 'all') {
      list = list.filter(item => item.brightness === state.activeBrightness);
    }
    if (state.activeTone !== 'all') {
      list = list.filter(item => item.tone === state.activeTone);
    }

    return list;
  }

  // --- 5. RENDERERS ---

  // A. Render Horizontal Category Tabs (Mobile Swipeable + Desktop Elegant)
  function renderCategoryTabs() {
    const container = document.getElementById('color-category-tabs');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => {
      const isActive = state.activeCategory === cat.id && !state.searchQuery;
      return \`
        <button type="button" data-cat-id="\${cat.id}"
          class="color-cat-tab \${isActive ? 'active' : ''}">
          <span class="color-cat-tab-name">\${cat.name}</span>
          <span class="color-cat-tab-count">\${cat.count.toLocaleString('vi-VN')}</span>
        </button>
      \`;
    }).join('');

    // Attach click events
    container.querySelectorAll('.color-cat-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-cat-id');
        setActiveCategory(catId, btn);
      });
    });
  }

  // B. Render Left Sidebar Collection Pills (Desktop)
  function renderCollectionPills() {
    const container = document.getElementById('collection-pills');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => {
      const isActive = state.activeCategory === cat.id && !state.searchQuery;
      return \`
        <button type="button" data-collection-id="\${cat.id}"
          class="col-pill-btn \${isActive ? 'active' : ''}">
          <span class="truncate">\${cat.name}</span>
          \${isActive 
            ? \`<svg width="15" height="15" style="color:#FFFFFF;" class="shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>\` 
            : \`<span class="col-pill-count shrink-0">\${cat.count.toLocaleString('vi-VN')}</span>\`
          }
        </button>
      \`;
    }).join('');

    container.querySelectorAll('.col-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const colId = btn.getAttribute('data-collection-id');
        setActiveCategory(colId);
      });
    });
  }

  // C. Switch Active Category & Sync UI
  function setActiveCategory(catId, clickedTabEl) {
    state.activeCategory = catId;
    state.displayLimit = state.pageSize;
    state.searchQuery = '';

    const searchInput = document.getElementById('color-search-input');
    if (searchInput) searchInput.value = '';
    const clearBtn = document.getElementById('color-search-clear');
    if (clearBtn) clearBtn.classList.add('hidden');

    // Sync toolbar dropdown
    const toolbarSelect = document.getElementById('toolbar-collection-select');
    if (toolbarSelect) toolbarSelect.value = catId;

    // Scroll active tab into view smoothly
    if (clickedTabEl) {
      clickedTabEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } else {
      const tabEl = document.querySelector(\`#color-category-tabs [data-cat-id="\${catId}"]\`);
      if (tabEl) tabEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    renderCategoryTabs();
    renderCollectionPills();
    renderSwatchGrid();
  }

  // D. Render Color Swatch Grid (Chunked Progressive Pagination)
  function renderSwatchGrid() {
    const gridEl = document.getElementById('swatch-grid');
    const emptyEl = document.getElementById('swatch-empty');
    const countBadge = document.getElementById('color-count-badge');
    const loadMoreWrap = document.getElementById('load-more-wrap');
    const loadMoreBtn = document.getElementById('btn-load-more');
    const loadMoreCounter = document.getElementById('load-more-counter');
    if (!gridEl) return;

    const filtered = getFilteredColors();

    // Update count badge
    if (countBadge) {
      countBadge.textContent = \`\${filtered.length.toLocaleString('vi-VN')} màu\`;
    }

    if (filtered.length === 0) {
      gridEl.innerHTML = '';
      if (emptyEl) emptyEl.classList.remove('hidden');
      if (loadMoreWrap) loadMoreWrap.classList.add('hidden');
      return;
    } else {
      if (emptyEl) emptyEl.classList.add('hidden');
    }

    // Determine grid classes based on viewMode
    const isCompact = state.viewMode === 'compact';
    gridEl.className = isCompact ? 'color-swatch-grid compact-mode' : 'color-swatch-grid';

    // Slice to displayLimit
    const visibleList = filtered.slice(0, state.displayLimit);

    gridEl.innerHTML = visibleList.map(c => {
      const isSelected = state.selectedColor && state.selectedColor.code === c.code;

      return \`
        <div data-color-code="\${c.code}" class="swatch-card \${isSelected ? 'active' : ''}">
          <!-- Color Swatch Box -->
          <div class="swatch-color-box" style="background-color: \${c.hex};">
            \${isSelected ? \`
              <div class="swatch-active-badge">
                <svg width="10" height="10" class="stroke-current" fill="none" stroke-width="3" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            \` : ''}
          </div>

          <!-- Color Label Below (Code + HEX) -->
          <div class="swatch-label-wrap">
            <div class="swatch-code">\${c.code}</div>
            <div class="swatch-hex">\${c.hex.toUpperCase()}</div>
          </div>
        </div>
      \`;
    }).join('');

    // Attach click events
    gridEl.querySelectorAll('.swatch-card').forEach(card => {
      card.addEventListener('click', () => {
        const code = card.getAttribute('data-color-code');
        const colorObj = UNIQUE_COLORS.find(c => c.code === code) || RAW_ITEMS.find(c => c.code === code);
        if (colorObj) {
          selectColor(colorObj);
        }
      });
    });

    // Update Load More Controls
    if (loadMoreWrap) {
      if (state.displayLimit < filtered.length) {
        loadMoreWrap.classList.remove('hidden');
        const remaining = filtered.length - visibleList.length;
        if (loadMoreCounter) {
          loadMoreCounter.innerHTML = \`Đang hiển thị <strong class="text-[#073B2E]">\${visibleList.length.toLocaleString('vi-VN')}</strong> / \${filtered.length.toLocaleString('vi-VN')} màu\`;
        }
        if (loadMoreBtn) {
          loadMoreBtn.innerHTML = \`
            <span>Xem thêm (\${remaining.toLocaleString('vi-VN')} màu)</span>
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>
          \`;
        }
      } else {
        loadMoreWrap.classList.add('hidden');
      }
    }
  }

  // E. Select Color & Update Active Banner
  function selectColor(colorObj) {
    state.selectedColor = colorObj;
    updateActiveBanner();

    // Toggle active class on cards without full re-render
    const gridEl = document.getElementById('swatch-grid');
    if (gridEl) {
      gridEl.querySelectorAll('.swatch-card').forEach(card => {
        const code = card.getAttribute('data-color-code');
        if (code === colorObj.code) {
          card.classList.add('active');
          const box = card.querySelector('.swatch-color-box');
          if (box && !box.querySelector('.swatch-active-badge')) {
            const badge = document.createElement('div');
            badge.className = 'swatch-active-badge';
            badge.innerHTML = \`<svg width="10" height="10" class="stroke-current" fill="none" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>\`;
            box.appendChild(badge);
          }
        } else {
          card.classList.remove('active');
          const badge = card.querySelector('.swatch-active-badge');
          if (badge) badge.remove();
        }
      });
    }
  }

  // F. Update Active Preview Banner (Pure HEX, Auto-Contrast, Copy & Favorite)
  function updateActiveBanner() {
    const banner = document.getElementById('active-color-banner');
    const codeEl = document.getElementById('active-banner-code');
    const nameEl = document.getElementById('active-banner-name');
    const hexEl = document.getElementById('active-banner-hex');
    const tagEl = document.getElementById('active-banner-tag');
    const favBtn = document.getElementById('btn-fav-color');
    const iconHeart = document.getElementById('icon-heart');
    const copyBtn = document.getElementById('btn-copy-color');
    if (!banner || !state.selectedColor) return;

    const hex = state.selectedColor.hex;
    banner.style.backgroundColor = hex;

    if (codeEl) codeEl.textContent = state.selectedColor.code;
    if (nameEl) {
      const cats = state.selectedColor.allCategories || [state.selectedColor.catName];
      nameEl.textContent = cats.join(' · ');
    }
    if (hexEl) hexEl.textContent = hex.toUpperCase();

    // Calculate contrast luminance
    const lum = getLuminance(hex);
    const isLight = lum > 155;
    const textColor = isLight ? '#1F2937' : '#FFFFFF';
    const subColor = isLight ? 'rgba(31, 41, 55, 0.78)' : 'rgba(255, 255, 255, 0.88)';
    const btnBg = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.25)';
    const hexBg = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.2)';

    if (codeEl) codeEl.style.color = textColor;
    if (nameEl) nameEl.style.color = subColor;
    if (tagEl) tagEl.style.color = subColor;
    if (hexEl) {
      hexEl.style.backgroundColor = hexBg;
      hexEl.style.color = textColor;
    }

    if (favBtn) {
      favBtn.style.backgroundColor = btnBg;
      favBtn.style.color = textColor;
    }
    if (iconHeart) {
      const isFav = state.favorites.has(state.selectedColor.code);
      if (isFav) {
        iconHeart.setAttribute('fill', '#EF4444');
        iconHeart.setAttribute('stroke', '#EF4444');
      } else {
        iconHeart.setAttribute('fill', 'none');
        iconHeart.setAttribute('stroke', 'currentColor');
      }
    }
    if (copyBtn) {
      copyBtn.style.backgroundColor = btnBg;
      copyBtn.style.color = textColor;
    }
  }

  // --- 6. GLOBAL PRESET PALETTE FUNCTION ---
  window.applyPresetPalette = function (hexArray, title) {
    let match = null;
    if (Array.isArray(hexArray) && hexArray.length > 0) {
      // Find exact hex match or code match
      for (const target of hexArray) {
        match = UNIQUE_COLORS.find(c => c.hex.toLowerCase() === target.toLowerCase() || c.code.toLowerCase() === target.toLowerCase());
        if (match) break;
      }
    }

    if (!match) {
      match = UNIQUE_COLORS[0];
    }

    if (match) {
      // Switch to its category if not in all
      state.activeCategory = match.catId || 'all';
      state.activeShade = 'all';
      state.activeBrightness = 'all';
      state.activeTone = 'all';
      state.searchQuery = '';
      state.displayLimit = state.pageSize;

      const searchInput = document.getElementById('color-search-input');
      if (searchInput) searchInput.value = '';
      const clearBtn = document.getElementById('color-search-clear');
      if (clearBtn) clearBtn.classList.add('hidden');

      const tbCol = document.getElementById('toolbar-collection-select');
      if (tbCol) tbCol.value = state.activeCategory;
      const tbShade = document.getElementById('toolbar-shade-select');
      if (tbShade) tbShade.value = 'all';
      const filterShade = document.getElementById('filter-shade');
      if (filterShade) filterShade.value = 'all';
      const filterBright = document.getElementById('filter-brightness');
      if (filterBright) filterBright.value = 'all';
      const filterTone = document.getElementById('filter-tone');
      if (filterTone) filterTone.value = 'all';

      renderCategoryTabs();
      renderCollectionPills();
      selectColor(match);
      renderSwatchGrid();
      showToast(\`Đã chọn màu chủ đạo "\${match.code} (\${match.hex.toUpperCase()})" (\${title})\`);
    }

    const studioEl = document.getElementById('color-studio-app');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- 7. EVENT BINDINGS & INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Search with debounce
    const searchInput = document.getElementById('color-search-input');
    const searchClear = document.getElementById('color-search-clear');
    let searchDebounce = null;

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchDebounce);
        const val = e.target.value;
        if (searchClear) {
          if (val) searchClear.classList.remove('hidden');
          else searchClear.classList.add('hidden');
        }
        searchDebounce = setTimeout(() => {
          state.searchQuery = val;
          state.displayLimit = state.pageSize;
          renderSwatchGrid();
        }, 180);
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        searchClear.classList.add('hidden');
        state.searchQuery = '';
        state.displayLimit = state.pageSize;
        renderSwatchGrid();
      });
    }

    // 2. Toolbar Collection Select (Mobile Dropdown Sync)
    const tbCol = document.getElementById('toolbar-collection-select');
    if (tbCol) {
      tbCol.addEventListener('change', (e) => {
        setActiveCategory(e.target.value);
      });
    }

    // 3. Toolbar & Sidebar Shade Filter
    const tbShade = document.getElementById('toolbar-shade-select');
    const filterShade = document.getElementById('filter-shade');
    function syncShade(val) {
      state.activeShade = val;
      state.displayLimit = state.pageSize;
      if (tbShade) tbShade.value = val;
      if (filterShade) filterShade.value = val;
      renderSwatchGrid();
    }
    if (tbShade) tbShade.addEventListener('change', (e) => syncShade(e.target.value));
    if (filterShade) filterShade.addEventListener('change', (e) => syncShade(e.target.value));

    // 4. Brightness & Tone Filters
    const filterBright = document.getElementById('filter-brightness');
    if (filterBright) {
      filterBright.addEventListener('change', (e) => {
        state.activeBrightness = e.target.value;
        state.displayLimit = state.pageSize;
        renderSwatchGrid();
      });
    }

    const filterTone = document.getElementById('filter-tone');
    if (filterTone) {
      filterTone.addEventListener('change', (e) => {
        state.activeTone = e.target.value;
        state.displayLimit = state.pageSize;
        renderSwatchGrid();
      });
    }

    // 5. Reset Filters Button
    const btnReset = document.getElementById('btn-reset-filters');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        state.activeCategory = 'all';
        state.activeShade = 'all';
        state.activeBrightness = 'all';
        state.activeTone = 'all';
        state.searchQuery = '';
        state.displayLimit = state.pageSize;

        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.classList.add('hidden');
        if (tbCol) tbCol.value = 'all';
        if (tbShade) tbShade.value = 'all';
        if (filterShade) filterShade.value = 'all';
        if (filterBright) filterBright.value = 'all';
        if (filterTone) filterTone.value = 'all';

        renderCategoryTabs();
        renderCollectionPills();
        renderSwatchGrid();
        showToast('Đã xóa các bộ lọc');
      });
    }

    // 6. View Mode Toggle (Grid vs Compact)
    const btnGrid = document.getElementById('btn-view-grid');
    const btnCompact = document.getElementById('btn-view-compact');
    if (btnGrid && btnCompact) {
      btnGrid.addEventListener('click', () => {
        state.viewMode = 'grid';
        btnGrid.classList.add('active');
        btnCompact.classList.remove('active');
        renderSwatchGrid();
      });

      btnCompact.addEventListener('click', () => {
        state.viewMode = 'compact';
        btnCompact.classList.add('active');
        btnGrid.classList.remove('active');
        renderSwatchGrid();
      });
    }

    // 7. Load More Button (Progressive Pagination)
    const btnLoadMore = document.getElementById('btn-load-more');
    if (btnLoadMore) {
      btnLoadMore.addEventListener('click', () => {
        state.displayLimit += state.pageSize;
        renderSwatchGrid();
      });
    }

    // 8. Auto-load on Sentinel Intersection
    const sentinel = document.getElementById('load-more-sentinel');
    if (sentinel && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const filtered = getFilteredColors();
            if (state.displayLimit < filtered.length) {
              state.displayLimit += state.pageSize;
              renderSwatchGrid();
            }
          }
        });
      }, { rootMargin: '200px' });
      observer.observe(sentinel);
    }

    // 9. Copy Color Code & HEX
    const btnCopy = document.getElementById('btn-copy-color');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        if (!state.selectedColor) return;
        const textToCopy = \`\${state.selectedColor.code} (\${state.selectedColor.hex.toUpperCase()})\`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(\`Đã sao chép: \${textToCopy}\`);
          }).catch(() => {
            showToast(\`Mã màu: \${textToCopy}\`);
          });
        } else {
          showToast(\`Mã màu: \${textToCopy}\`);
        }
      });
    }

    // 10. Favorite Toggle
    const btnFav = document.getElementById('btn-fav-color');
    if (btnFav) {
      btnFav.addEventListener('click', () => {
        if (!state.selectedColor) return;
        const code = state.selectedColor.code;
        if (state.favorites.has(code)) {
          state.favorites.delete(code);
          showToast(\`Đã xóa \${code} khỏi mục yêu thích\`);
        } else {
          state.favorites.add(code);
          showToast(\`Đã lưu \${code} vào mục yêu thích\`);
        }
        saveFavorites();
        updateActiveBanner();
      });
    }

    // --- INITIAL RENDER ---
    renderCategoryTabs();
    renderCollectionPills();
    renderSwatchGrid();
    updateActiveBanner();
  });

})();
`;

fs.writeFileSync(TARGET_JS_PATH, jsContent, 'utf8');
console.log('Successfully generated wanders_color_studio_v2.js. Size: ' + jsContent.length + ' bytes');
