const fs = require('fs');
const path = require('path');
const SUGGESTED_COMBINATIONS = require('../data/color_combinations.json');
const {
  renderHead,
  renderHeader,
  renderConsultationCta,
  renderFooter,
  renderMobileDrawer,
  renderCoreScripts,
} = require('../components/layout');

const ROOT = path.resolve(__dirname, '../../website_download');

function generatePageHtml(isSubdir = false, pageTitle = 'Bảng màu & Color Studio — WANDERS', canonicalPath = 'bang-mau.html') {
  const prefix = isSubdir ? '../' : './';

  return `<!DOCTYPE html>
<html lang="vi">
${renderHead({
  prefix,
  title: pageTitle,
  description: 'Khám phá bảng màu sơn WANDERS: trải nghiệm Color Studio, tra cứu nhanh, chọn mẫu màu và xem mã HEX cho không gian kiến trúc.',
  ogImage: 'images/base44/2bf1eb277_generated_476435e1.png',
  canonicalPath,
  extraCss: ['wanders_color_studio.css'],
})}
<body class="font-body antialiased">
  ${renderHeader(prefix, 'bang-mau')}

  <main>
    <!-- ============================================================ -->
    <!-- HERO BANNER (ARCHITECTURAL DEEP FOREST GREEN)                -->
    <!-- ============================================================ -->
    <section class="color-hero-section">
      <div class="absolute inset-0">
        <span class="inline-block relative h-full w-full object-cover">
          <img class="w-full h-full inset-0 absolute object-cover" alt="Bảng màu WANDERS" width="1440" height="440" src="${prefix}images/base44/2bf1eb277_generated_476435e1.png">
        </span>
        <div class="color-hero-overlay"></div>
      </div>

      <div class="wanders-container color-hero-inner">
        <p class="w-eyebrow w-eyebrow--light w-hero-stagger w-hero-stagger--1">
          <span class="w-eyebrow-line"></span>Color Studio · Hơn 1.000 sắc độ chuẩn
        </p>
        <h1 class="w-subhero-title mt-4 max-w-[24ch] text-[#FFFFFF] w-hero-stagger w-hero-stagger--2">
          Bảng màu WANDERS
        </h1>
        <p class="mt-3 max-w-[58ch] text-[14.5px] leading-[1.7] text-[#F6F3EC]/85 sm:text-[15.5px] w-hero-stagger w-hero-stagger--3">
          Tra cứu nhanh hơn 1.000 sắc độ màu chuẩn xác theo hệ thống WANDERS & Color City Pro. Đối chiếu mã màu, thông số HEX và phân loại chuyên nghiệp cho không gian sống.
        </p>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- COLOR STUDIO (ACCURATE ARCHITECTURAL TOOL — PURE HEX)        -->
    <!-- ============================================================ -->
    <section id="color-studio-app">
      <div class="wanders-container">

        <div id="studio-toast" class="studio-toast">
          <svg width="20" height="20" style="color: #D6AD45;" class="shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <span id="studio-toast-msg">Đã sao chép!</span>
        </div>

        <div class="color-studio-layout">
          <aside class="color-filter-panel studio-sidebar-card space-y-6">
            <div>
              <h3 class="text-[14px] font-bold tracking-tight mb-2.5" style="color: #073B2E;">Nhóm màu chuẩn</h3>
              <div id="collection-pills" class="space-y-1.5"></div>
            </div>

            <div>
              <h3 class="text-[13px] font-semibold mb-2.5" style="color: #273238;">Lọc nâng cao</h3>
              <div class="space-y-2.5">
                <div>
                  <label for="filter-shade" class="block text-[11px] font-medium mb-1" style="color: #5A6468;">Sắc độ</label>
                  <select id="filter-shade" class="studio-select w-full text-[12.5px]">
                    <option value="all">Tất cả sắc độ</option>
                    <option value="light">Sắc độ nhạt (Pastel)</option>
                    <option value="medium">Sắc độ vừa (Trung tính)</option>
                    <option value="deep">Sắc độ đậm (Sâu)</option>
                  </select>
                </div>

                <div>
                  <label for="filter-brightness" class="block text-[11px] font-medium mb-1" style="color: #5A6468;">Độ sáng</label>
                  <select id="filter-brightness" class="studio-select w-full text-[12.5px]">
                    <option value="all">Tất cả độ sáng</option>
                    <option value="high">Sáng cao</option>
                    <option value="mid">Sáng vừa</option>
                    <option value="dark">Trầm / Tối</option>
                  </select>
                </div>

                <div>
                  <label for="filter-tone" class="block text-[11px] font-medium mb-1" style="color: #5A6468;">Tông màu</label>
                  <select id="filter-tone" class="studio-select w-full text-[12.5px]">
                    <option value="all">Tất cả tông</option>
                    <option value="warm">Tông ấm (Warm)</option>
                    <option value="cool">Tông lạnh (Cool)</option>
                    <option value="neutral">Trung tính (Neutral)</option>
                  </select>
                </div>
              </div>

              <button id="btn-reset-filters" type="button" class="mt-4 flex items-center gap-1.5 text-[12px] transition-colors hover:text-[#073B2E]" style="color: #5A6468;">
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                <span>Xóa bộ lọc</span>
              </button>
            </div>
          </aside>

          <div class="color-main-panel min-w-0">
            <!-- Pinned Controls: Banner, Search, Categories & Filters (Fixed on Desktop) -->
            <div class="studio-pinned-controls">
              <!-- Active Color Preview Banner (Pure Flat HEX, 220ms transition) -->
              <div id="active-color-banner" class="studio-active-banner" style="background-color: #EBDFC7;">
                <div class="studio-active-banner-overlay"></div>

                <div class="flex items-center justify-between relative z-10">
                  <span id="active-banner-tag" class="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1F2937]/90">
                    MÀU ĐANG XEM
                  </span>

                  <div class="flex items-center gap-2">
                    <button id="btn-fav-color" type="button" aria-label="Lưu yêu thích" class="banner-action-btn text-[#1F2937]">
                      <svg id="icon-heart" width="16" height="16" class="fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </button>

                    <button id="btn-copy-color" type="button" aria-label="Sao chép mã màu" class="banner-action-btn text-[#1F2937]">
                      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="relative z-10 flex items-end justify-between gap-4">
                  <div>
                    <div id="active-banner-code" class="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2937] leading-none">
                      1340
                    </div>
                    <div class="flex flex-wrap items-center gap-2.5 mt-1.5">
                      <span id="active-banner-name" class="text-[14px] sm:text-[15px] font-medium text-[#1F2937]/90">
                        Pastel
                      </span>
                      <span id="active-banner-hex" class="text-[12px] font-mono px-2.5 py-0.5 rounded-md bg-black/10 text-[#1F2937]">
                        #EBDFC7
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Real-time Search Input -->
              <div class="studio-search-bar mt-3.5 mb-2">
                <div class="relative w-full">
                  <svg width="17" height="17" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input id="color-search-input" type="text" placeholder="Tìm kiếm theo mã màu (ví dụ 1340, 2001-P) hoặc HEX..." class="w-full h-11 rounded-xl">
                  <button id="color-search-clear" type="button" aria-label="Xóa tìm kiếm" class="hidden absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              </div>

              <!-- Horizontal Scrollable Category Tabs Bar (9 Tabs) -->
              <nav id="color-category-tabs" class="w-cat-tabs-scroll color-category-tabs" aria-label="Nhóm màu WANDERS"></nav>

              <!-- Preset Combination Active Banner (Hidden by default) -->
              <div id="studio-preset-banner" class="studio-preset-banner hidden">
                <div class="preset-banner-info">
                  <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="text-[#073B2E] shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  <span>Đang xem bộ màu gợi ý: <strong id="preset-banner-title">Pastel trang nhã</strong> (3 mã màu)</span>
                </div>
                <button id="btn-exit-preset" type="button" class="btn-exit-preset">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span>Quay lại bảng màu đầy đủ</span>
                </button>
              </div>

              <div class="studio-toolbar">
                <div class="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
                  <select id="toolbar-collection-select" aria-label="Chọn nhóm màu" class="studio-select text-[12.5px]">
                    <option value="all">Tất cả màu (1.002)</option>
                    <option value="pastel">Pastel (154)</option>
                    <option value="red">Đỏ (227)</option>
                    <option value="grey">Xám (152)</option>
                    <option value="blue">Xanh dương (176)</option>
                    <option value="brown">Nâu (160)</option>
                    <option value="yellow">Vàng (120)</option>
                    <option value="green">Xanh lá (160)</option>
                    <option value="purple">Tím (88)</option>
                  </select>

                  <select id="toolbar-shade-select" aria-label="Chọn sắc độ" class="studio-select text-[12.5px]">
                    <option value="all">Tất cả sắc độ</option>
                    <option value="light">Sắc độ nhạt</option>
                    <option value="medium">Sắc độ vừa</option>
                    <option value="deep">Sắc độ đậm</option>
                  </select>

                  <span id="color-count-badge" class="hidden sm:inline-flex text-[11.5px] font-semibold bg-white px-2.5 py-1.5 rounded-xl shadow-sm" style="color: #5A6468; border: 1px solid #E2DDD2;">
                    1.002 màu
                  </span>
                </div>

                <div class="view-toggle-wrap shrink-0">
                  <button id="btn-view-grid" type="button" aria-label="Lưới chuẩn" class="view-toggle-btn active">
                    <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                      <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                      <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                      <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                    </svg>
                  </button>
                  <button id="btn-view-compact" type="button" aria-label="Lưới thu gọn" class="view-toggle-btn">
                    <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <line x1="4" y1="6" x2="20" y2="6"></line>
                      <line x1="4" y1="12" x2="20" y2="12"></line>
                      <line x1="4" y1="18" x2="20" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Scrollable Swatch Grid Area (Desktop) / Paginated Swatch Grid (Mobile) -->
            <div id="swatch-grid-container" class="swatch-grid-container" tabindex="0" aria-label="Danh sách mã màu WANDERS">
              <div id="swatch-grid" class="color-swatch-grid"></div>

              <div id="load-more-wrap" class="load-more-wrap">
                <p id="load-more-counter" class="load-more-counter"></p>
                <button id="btn-load-more" type="button" class="w-btn-load-more">
                  <span>Xem thêm màu</span>
                  <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div id="load-more-sentinel" class="h-2 w-full"></div>
              </div>

              <div id="swatch-empty" class="hidden text-center py-16 bg-white rounded-2xl p-6" style="border: 1px solid #E2DDD2;">
                <svg width="44" height="44" class="mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p class="text-base font-semibold" style="color: #073B2E;">Không tìm thấy màu phù hợp</p>
                <p class="text-[13px] mt-1" style="color: #5A6468;">Hãy thử tìm với mã màu hoặc HEX khác, hoặc xóa bộ lọc.</p>
                <button type="button" onclick="document.getElementById('btn-reset-filters').click()" class="wanders-btn-primary inline-flex mt-4 px-5 py-2.5 text-[12px]">
                  Xóa bộ lọc
                </button>
              </div>
            </div>

            <!-- Mobile & Tablet Pagination (12 colors / page) -->
            <nav id="mobile-pagination" class="studio-pagination" aria-label="Phân trang bảng màu"></nav>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- GỢI Ý PHỐI MÀU (WHITE SECTION, PURE HEX SWATCHES)            -->
    <!-- ============================================================ -->
    <section class="suggested-section py-16 lg:py-20">
      <div class="wanders-container">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 w-reveal">
          <div>
            <p class="suggested-tag">
              <span class="suggested-tag-line"></span>GỢI Ý PHỐI MÀU
            </p>
            <h2 class="w-section-title mt-3" style="color: #073B2E;">
              Phối màu hài hòa cho không gian sống
            </h2>
          </div>
          <a href="#color-studio-app" class="w-text-link">
            <span>Lên đầu bảng màu</span>
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14"></path><path stroke-linecap="round" stroke-linejoin="round" d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>

        <div class="suggested-palettes-grid">
          ${SUGGESTED_COMBINATIONS.map((combo, idx) => {
            const delayClass = idx > 0 ? (' w-reveal-delay-' + idx) : '';
            const swatchesHtml = combo.colors.map(c => 
              '<span class="h-6 flex-1 rounded border border-black/10 cursor-pointer transition-transform hover:scale-105" style="background-color: ' + c.hex + ';" title="' + c.code + ' — ' + c.hex.toUpperCase() + ' (' + c.role + ')" onclick="if(window.WandersColorStudio) window.WandersColorStudio.openCombination(\'' + combo.id + '\', \'' + c.code + '\')"></span>'
            ).join('');

            return `
            <div class="suggested-palette-card group w-reveal${delayClass}">
              <div class="aspect-[16/10] overflow-hidden relative bg-[#E8E2D5]">
                <img src="${prefix}${combo.image}" alt="${combo.title}" width="350" height="219" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700">
              </div>
              <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="text-[16px] font-semibold" style="color: #073B2E;">${combo.title}</h3>
                  <p class="text-[13px] mt-1.5 leading-relaxed" style="color: #5A6468;">${combo.description}</p>
                  <div class="flex gap-1.5 mt-4">
                    ${swatchesHtml}
                  </div>
                </div>
                <button type="button" data-combination-id="${combo.id}" class="suggested-card-btn">
                  Xem chi tiết
                  <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
              </div>
            </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>

    ${renderConsultationCta(prefix)}
  </main>

  ${renderFooter(prefix)}
  ${renderMobileDrawer(prefix)}
  ${renderCoreScripts(prefix, { extraScripts: ['wanders_color_studio_v2.js'] })}
</body>
</html>`;
}

const targets = [
  { file: 'bang-mau.html', isSubdir: false, title: 'Bảng màu & Color Studio — WANDERS', canonical: 'bang-mau.html' },
  { file: 'cam-hung-mau-sac.html', isSubdir: false, title: 'Cảm hứng màu sắc & Color Studio — WANDERS', canonical: 'cam-hung-mau-sac.html' },
  { file: 'bang-mau/index.html', isSubdir: true, title: 'Bảng màu & Color Studio — WANDERS', canonical: 'bang-mau.html' },
  { file: 'cam-hung-mau-sac/index.html', isSubdir: true, title: 'Cảm hứng màu sắc & Color Studio — WANDERS', canonical: 'cam-hung-mau-sac.html' }
];

function buildColorPages() {
  targets.forEach((t) => {
    const outPath = path.join(ROOT, t.file);
    const dir = path.dirname(outPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(outPath, generatePageHtml(t.isSubdir, t.title, t.canonical), 'utf8');
    console.log('Built unified Color Studio page:', t.file);
  });
}

if (require.main === module) {
  buildColorPages();
}

module.exports = { buildColorPages };
