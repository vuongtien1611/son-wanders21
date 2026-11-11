/**
 * WANDERS PRODUCTION BUILD ORCHESTRATOR
 * Pipeline: src/ -> website_download/
 *   1. Sync src/css/*.css -> website_download/assets/css/*.css
 *   2. Sync src/js/*.js   -> website_download/assets/js/*.js
 *   3. Remove stale flat assets/*.css|js and unused static/
 *   4. Compile all pages from src/pages/* + src/components/layout.js
 *   5. Write legacy redirects, pages_index.json, robots.txt, sitemap.xml
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const OUT_DIR = path.join(ROOT_DIR, 'website_download');
const products = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'data/wanders_products.json'), 'utf8'));

function syncAssets() {
  const outAssets = path.join(OUT_DIR, 'assets');
  const outCss = path.join(outAssets, 'css');
  const outJs = path.join(outAssets, 'js');
  fs.mkdirSync(outCss, { recursive: true });
  fs.mkdirSync(outJs, { recursive: true });

  // Clean old flat CSS/JS files in website_download/assets/
  for (const entry of fs.readdirSync(outAssets, { withFileTypes: true })) {
    if (entry.isFile() && (entry.name.endsWith('.css') || entry.name.endsWith('.js'))) {
      fs.unlinkSync(path.join(outAssets, entry.name));
    }
  }

  // Remove unused legacy static/ folder if present
  const staticDir = path.join(OUT_DIR, 'static');
  if (fs.existsSync(staticDir)) {
    fs.rmSync(staticDir, { recursive: true, force: true });
  }

  // Copy active CSS files from src/css/ -> website_download/assets/css/
  let cssCount = 0;
  for (const f of fs.readdirSync(path.join(SRC_DIR, 'css'))) {
    if (f.endsWith('.css')) {
      fs.copyFileSync(path.join(SRC_DIR, 'css', f), path.join(outCss, f));
      cssCount++;
    }
  }

  // Copy active JS files from src/js/ -> website_download/assets/js/
  let jsCount = 0;
  for (const f of fs.readdirSync(path.join(SRC_DIR, 'js'))) {
    if (f.endsWith('.js')) {
      fs.copyFileSync(path.join(SRC_DIR, 'js', f), path.join(outJs, f));
      jsCount++;
    }
  }

  console.log(`Synced Production assets: ${cssCount} CSS -> assets/css/, ${jsCount} JS -> assets/js/`);
}

function replaceLegacyWithRedirect(relPath, targetRel, title, desc) {
  const depth = relPath.split(/[\\/]/).length - 1;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  const fullPath = path.join(OUT_DIR, relPath);
  const targetHref = `${prefix}${targetRel}`;
  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="${prefix}images/base44/a963c52b6_image.png">
  <title>${title} — WANDERS</title>
  <meta name="description" content="${desc}">
  <meta name="robots" content="noindex, follow">
  <meta http-equiv="refresh" content="0; url=${targetHref}">
  <link rel="stylesheet" href="${prefix}assets/css/base44.css">
</head>
<body class="font-body antialiased flex min-h-screen items-center justify-center p-6" style="background:#F6F3EC;color:#273238;">
  <div class="max-w-md border p-8 text-center" style="border-color:#E2DDD2;background:#FFFFFF;">
    <p class="text-[11px] uppercase tracking-[0.22em]" style="color:#0F4C3A;">WANDERS Paint</p>
    <h1 class="mt-3 text-[22px] font-semibold" style="color:#073B2E;">${title}</h1>
    <p class="mt-3 text-[14px] leading-relaxed" style="color:#5A6468;">${desc}</p>
    <a href="${targetHref}" class="mt-6 inline-flex items-center gap-2 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em]" style="background:#073B2E;color:#F6F3EC;">
      Tiếp tục tới WANDERS →
    </a>
  </div>
  <script>
    window.location.replace(${JSON.stringify(targetHref)});
  </script>
</body>
</html>`;
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, html, 'utf8');
}

function writeSeoAndManifests() {
  const wandersPages = [
    { route: '/', title: 'WANDERS — Sơn trang trí & Color Studio' },
    { route: '/gioi-thieu.html', title: 'Giới thiệu WANDERS — Deine Wand mal anders' },
    { route: '/san-pham.html', title: 'Sản phẩm — WANDERS' },
    { route: '/bang-mau.html', title: 'Bảng màu & Color Studio — WANDERS' },
    { route: '/du-an.html', title: 'Dự án & Công trình — WANDERS' },
    { route: '/lien-he.html', title: 'Liên hệ — WANDERS' },
    ...products.map((p) => ({ route: '/' + p.link, title: `${p.name} (${p.code}) — WANDERS` })),
  ];
  fs.writeFileSync(path.join(OUT_DIR, 'pages_index.json'), JSON.stringify(wandersPages, null, 2), 'utf8');

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /data/

Sitemap: https://wanders.vn/sitemap.xml
`;
  fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robotsTxt, 'utf8');

  const base = 'https://wanders.vn';
  const urls = [
    '/',
    '/gioi-thieu.html',
    '/san-pham.html',
    '/san-pham/son-noi-that/index.html',
    '/san-pham/son-ngoai-that/index.html',
    '/san-pham/son-chong-tham/index.html',
    '/san-pham/son-lot/index.html',
    '/san-pham/son-chong-nong/index.html',
    '/san-pham/san-pham-khac/index.html',
    '/bang-mau.html',
    '/du-an.html',
    '/du-an/biet-thu-mai-bang/index.html',
    '/du-an/can-ho-trung-tam/index.html',
    '/du-an/quan-ca-phe-studio/index.html',
    '/du-an/sanh-lam-viec/index.html',
    '/du-an/nha-vuon-mot-tang/index.html',
    '/lien-he.html',
    ...products.map((p) => '/' + p.link),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${base}${u}</loc></url>`).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), xml, 'utf8');
  console.log('Generated: pages_index.json, robots.txt, sitemap.xml (' + urls.length + ' URLs)');
}

function runBuild() {
  syncAssets();

  const { buildMasterPages } = require('../src/pages/master-pages');
  const { buildAllProjectDetailPages } = require('../src/pages/project-pages');
  const { buildColorPages } = require('../src/pages/color-pages');
  const { buildProductDetailPages } = require('../src/pages/product-pages');

  buildMasterPages();
  buildAllProjectDetailPages();
  buildColorPages();
  buildProductDetailPages();

  const legacyRedirects = [
    ['tin-tuc.html', 'du-an.html', 'Dự án & Định hướng màu sắc', 'Khám phá chuyên mục Dự án & Công trình WANDERS.'],
    ['tin-tuc/index.html', 'du-an.html', 'Dự án & Định hướng màu sắc', 'Khám phá chuyên mục Dự án & Công trình WANDERS.'],
    ['tin-tuc/gia-son-nha/index.html', 'du-an.html', 'Dự án & Định hướng màu sắc', 'Khám phá chuyên mục Dự án & Công trình WANDERS.'],
    ['tin-tuc/quy-trinh-son-nha/index.html', 'du-an.html', 'Dự án & Định hướng màu sắc', 'Khám phá chuyên mục Dự án & Công trình WANDERS.'],
    ['tin-tuc/cac-loai-son-nha/index.html', 'du-an.html', 'Dự án & Định hướng màu sắc', 'Khám phá chuyên mục Dự án & Công trình WANDERS.'],
    ['tin-tuc_gia-son-nha.html', 'du-an.html', 'Dự án & Định hướng màu sắc', 'Khám phá chuyên mục Dự án & Công trình WANDERS.'],
    ['tin-tuc_quy-trinh-son-nha.html', 'du-an.html', 'Dự án & Định hướng màu sắc', 'Khám phá chuyên mục Dự án & Công trình WANDERS.'],
    ['tin-tuc_cac-loai-son-nha.html', 'du-an.html', 'Dự án & Định hướng màu sắc', 'Khám phá chuyên mục Dự án & Công trình WANDERS.'],
    ['dang-ky-dai-ly.html', 'lien-he.html', 'Liên hệ hợp tác đại lý', 'Chuyển tới trang Liên hệ WANDERS để đăng ký tư vấn hợp tác đại lý & nhà phân phối.'],
    ['dang-ky-dai-ly/index.html', 'lien-he.html', 'Liên hệ hợp tác đại lý', 'Chuyển tới trang Liên hệ WANDERS để đăng ký tư vấn hợp tác đại lý & nhà phân phối.'],
    ['nha-phan-phoi.html', 'lien-he.html', 'Liên hệ nhà phân phối', 'Chuyển tới trang Liên hệ WANDERS để nhận thông tin hợp tác phân phối.'],
    ['nha-phan-phoi/index.html', 'lien-he.html', 'Liên hệ nhà phân phối', 'Chuyển tới trang Liên hệ WANDERS để nhận thông tin hợp tác phân phối.'],
  ];
  for (const [rel, target, title, desc] of legacyRedirects) {
    replaceLegacyWithRedirect(rel, target, title, desc);
  }
  console.log(`Updated ${legacyRedirects.length} legacy redirect pages`);

  writeSeoAndManifests();
}

if (require.main === module) {
  runBuild();
}

module.exports = { runBuild };

