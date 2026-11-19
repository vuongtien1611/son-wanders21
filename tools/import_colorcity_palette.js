const fs = require('fs');
const path = require('path');

const CSV_PATH = fs.existsSync(path.join(__dirname, '../src/data/ma_mau_colorcity_pro.csv'))
  ? path.join(__dirname, '../src/data/ma_mau_colorcity_pro.csv')
  : 'C:/Users/Admin/Documents/sơn wanders/ma_mau_colorcity_pro.csv';
const SRC_DATA_DIR = 'C:/Users/Admin/Documents/sơn wanders/giao-dien/src/data';
const PROD_DATA_DIR = 'C:/Users/Admin/Documents/sơn wanders/giao-dien/website_download/data';

fs.mkdirSync(SRC_DATA_DIR, { recursive: true });
fs.mkdirSync(PROD_DATA_DIR, { recursive: true });

let rawCsv = fs.readFileSync(CSV_PATH, 'utf8');
if (rawCsv.charCodeAt(0) === 0xFEFF) {
  rawCsv = rawCsv.slice(1);
}

const CATEGORY_MAP = {
  'Pastel': { id: 'pastel', name: 'Pastel', fullName: 'Pastel' },
  'Red - Đỏ': { id: 'red', name: 'Đỏ', fullName: 'Red – Đỏ' },
  'Grey - Xám': { id: 'grey', name: 'Xám', fullName: 'Grey – Xám' },
  'Blue - Xanh dương': { id: 'blue', name: 'Xanh dương', fullName: 'Blue – Xanh dương' },
  'Brown - Nâu': { id: 'brown', name: 'Nâu', fullName: 'Brown – Nâu' },
  'Yellow - Vàng': { id: 'yellow', name: 'Vàng', fullName: 'Yellow – Vàng' },
  'Green - Xanh lá': { id: 'green', name: 'Xanh lá', fullName: 'Green – Xanh lá' },
  'Purple - Tím': { id: 'purple', name: 'Tím', fullName: 'Purple – Tím' }
};

function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  return {
    r: parseInt(c.substr(0, 2), 16),
    g: parseInt(c.substr(2, 2), 16),
    b: parseInt(c.substr(4, 2), 16)
  };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

const lines = rawCsv.split(/\r?\n/).filter(l => l.trim().length > 0);
const header = lines[0];
const rows = lines.slice(1);

console.log(`Processing CSV: ${rows.length} rows...`);

const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const invalidRows = [];
const parsedItems = [];
const seenInCat = new Set();
let exactDupesCount = 0;

rows.forEach((line, index) => {
  const parts = line.split(',').map(s => s.trim());
  if (parts.length < 3) {
    invalidRows.push({ lineIndex: index + 2, raw: line, reason: 'Missing columns' });
    return;
  }
  const [csvCat, code, hex] = parts;
  const catMeta = CATEGORY_MAP[csvCat];
  if (!catMeta) {
    invalidRows.push({ lineIndex: index + 2, raw: line, reason: `Unknown category "${csvCat}"` });
    return;
  }
  if (!hexRegex.test(hex)) {
    invalidRows.push({ lineIndex: index + 2, raw: line, reason: `Invalid HEX "${hex}"` });
    return;
  }

  // Deduplicate exact same code within same category
  const catKey = `${catMeta.id}||${code.toLowerCase()}`;
  if (seenInCat.has(catKey)) {
    exactDupesCount++;
    return;
  }
  seenInCat.add(catKey);

  const { r, g, b } = hexToRgb(hex);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const { h, s, l } = rgbToHsl(r, g, b);

  const shade = lum >= 195 ? 'light' : lum >= 105 ? 'medium' : 'deep';
  const brightness = lum >= 180 ? 'high' : lum >= 100 ? 'mid' : 'dark';
  const tone = s <= 12 ? 'neutral' : (h >= 150 && h <= 285) ? 'cool' : 'warm';

  parsedItems.push({
    code,
    hex: hex.toLowerCase(),
    catId: catMeta.id,
    catName: catMeta.name,
    catFull: catMeta.fullName,
    shade,
    brightness,
    tone,
    lum: Math.round(lum)
  });
});

console.log(`Parsed valid items: ${parsedItems.length}`);
console.log(`Exact dupes filtered in same category: ${exactDupesCount}`);
console.log(`Invalid rows: ${invalidRows.length}`);

// Group by category
const categoryCounts = {};
Object.values(CATEGORY_MAP).forEach(c => {
  categoryCounts[c.id] = { name: c.name, count: 0 };
});
parsedItems.forEach(item => {
  categoryCounts[item.catId].count++;
});

console.log('Category breakdown:');
console.table(categoryCounts);

// Generate unique colors across all categories for "Tất cả"
const uniqueAllMap = new Map();
parsedItems.forEach(item => {
  if (!uniqueAllMap.has(item.code)) {
    uniqueAllMap.set(item.code, {
      ...item,
      categories: [item.catName]
    });
  } else {
    const existing = uniqueAllMap.get(item.code);
    if (!existing.categories.includes(item.catName)) {
      existing.categories.push(item.catName);
    }
  }
});
const uniqueAllList = Array.from(uniqueAllMap.values());
console.log(`Total unique colors for "Tất cả": ${uniqueAllList.length}`);

// Build complete structure
const colorCityPalette = {
  version: '2.0.0',
  source: 'ma_mau_colorcity_pro.csv',
  generatedAt: new Date().toISOString(),
  totalRows: parsedItems.length,
  totalUnique: uniqueAllList.length,
  categories: [
    { id: 'all', name: 'Tất cả', count: uniqueAllList.length },
    { id: 'pastel', name: 'Pastel', fullName: 'Pastel', count: categoryCounts['pastel'].count },
    { id: 'red', name: 'Đỏ', fullName: 'Red – Đỏ', count: categoryCounts['red'].count },
    { id: 'grey', name: 'Xám', fullName: 'Grey – Xám', count: categoryCounts['grey'].count },
    { id: 'blue', name: 'Xanh dương', fullName: 'Blue – Xanh dương', count: categoryCounts['blue'].count },
    { id: 'brown', name: 'Nâu', fullName: 'Brown – Nâu', count: categoryCounts['brown'].count },
    { id: 'yellow', name: 'Vàng', fullName: 'Yellow – Vàng', count: categoryCounts['yellow'].count },
    { id: 'green', name: 'Xanh lá', fullName: 'Green – Xanh lá', count: categoryCounts['green'].count },
    { id: 'purple', name: 'Tím', fullName: 'Purple – Tím', count: categoryCounts['purple'].count }
  ],
  items: parsedItems
};

// Write JSON files
fs.writeFileSync(path.join(SRC_DATA_DIR, 'color_palette.json'), JSON.stringify(colorCityPalette, null, 2), 'utf8');
fs.writeFileSync(path.join(PROD_DATA_DIR, 'color_palette.json'), JSON.stringify(colorCityPalette, null, 2), 'utf8');
console.log('Saved color_palette.json to src/data/ and website_download/data/');
