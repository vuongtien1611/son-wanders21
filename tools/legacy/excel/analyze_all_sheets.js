const fs = require('fs');
const data = JSON.parse(fs.readFileSync('excel_data.json', 'utf8'));

const analysis = [];

for (const [sheetName, sheetInfo] of Object.entries(data)) {
  const rows = sheetInfo.rows;
  
  // Find product title (usually in rows 1 to 5)
  let productTitle = '';
  let productDesc = '';
  let specs = [];
  let features = [];
  let application = [];
  let packaging = [];
  
  for (let i = 0; i < rows.length; i++) {
    const text = rows[i].filter(Boolean).join(' ').trim();
    if (!text) continue;
    
    // Look for product title
    if (!productTitle && (text.includes('SƠN') || text.includes('CHỐNG THẤM') || text.includes('BỘT BẢ') || text.includes('KEO') || text.includes('PHỤ GIA') || text.includes('MEN') || text.includes('CLEAR') || text.includes('NHŨ'))) {
      if (!text.startsWith('MÔ TẢ') && !text.startsWith('ĐẶC ĐIỂM') && !text.startsWith('THÔNG SỐ')) {
        productTitle = text;
      }
    }
  }

  // Also check first 5 non-empty rows for title
  const first5 = rows.map(r => r.filter(Boolean).join(' ').trim()).filter(Boolean).slice(0, 5);

  analysis.push({
    sheetName,
    rowCount: sheetInfo.rowCount,
    first5Rows: first5
  });
}

console.log(JSON.stringify(analysis, null, 2));

