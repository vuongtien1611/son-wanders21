const fs = require('fs');
const data = JSON.parse(fs.readFileSync('excel_data.json', 'utf8'));

const products = [];

for (const [sheetName, sheetInfo] of Object.entries(data)) {
  const rows = sheetInfo.rows;
  
  const textLines = rows.map(r => r.filter(c => c !== '').join(' | ').trim()).filter(Boolean);
  
  // Find title in first 5 rows
  let title = '';
  for (let i = 0; i < Math.min(6, textLines.length); i++) {
    const l = textLines[i];
    if (l !== 'Sơn WANDERS' && !l.startsWith('MÔ TẢ') && !l.startsWith('ĐẶC ĐIỂM') && !l.startsWith('THÔNG SỐ')) {
      title = l;
      break;
    }
  }

  // Extract sections
  let desc = '';
  let features = [];
  let specs = [];
  let packaging = [];
  let standards = [];
  let surfacePrep = [];
  let application = [];
  let notes = [];

  let currentSection = '';

  for (const line of textLines) {
    const upper = line.toUpperCase();
    if (upper.startsWith('MÔ TẢ SẢN PHẨM')) {
      currentSection = 'desc';
      continue;
    } else if (upper.startsWith('ĐẶC ĐIỂM SẢN PHẨM') || upper.startsWith('TÍNH NĂNG') || upper.startsWith('ƯU ĐIỂM')) {
      currentSection = 'features';
      continue;
    } else if (upper.startsWith('THÔNG SỐ KỸ THUẬT')) {
      currentSection = 'specs';
      continue;
    } else if (upper.startsWith('CHUẨN BỊ BỀ MẶT') || upper.startsWith('HƯỚNG DẪN THI CÔNG') || upper.startsWith('THI CÔNG')) {
      currentSection = 'application';
      continue;
    }

    if (currentSection === 'desc' && !desc) {
      desc = line;
    } else if (currentSection === 'features') {
      features.push(line);
    } else if (currentSection === 'specs') {
      specs.push(line);
    } else if (currentSection === 'application') {
      application.push(line);
    }

    if (line.includes('ISO') || line.includes('QCVN') || line.includes('tiêu chuẩn')) {
      standards.push(line);
    }
    if (line.toLowerCase().includes('bao bì') || line.toLowerCase().includes('đóng gói') || line.toLowerCase().includes('lít') || line.toLowerCase().includes('kg')) {
      packaging.push(line);
    }
  }

  products.push({
    sheetName,
    rowCount: sheetInfo.rowCount,
    title,
    desc,
    features: features.slice(0, 5),
    specs: specs.slice(0, 10),
    packaging: [...new Set(packaging)],
    standards: [...new Set(standards)],
    rawSnippet: textLines.slice(0, 8)
  });
}

fs.writeFileSync('parsed_products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Parsed', products.length, 'sheets successfully!');

