const fs = require('fs');
const products = JSON.parse(fs.readFileSync('parsed_products.json', 'utf8'));

for (let i = 8; i < 16; i++) {
  const p = products[i];
  console.log(`[${i + 1}] Sheet: "${p.sheetName}" | Rows: ${p.rowCount}`);
  console.log(`    Title: ${p.title}`);
  console.log(`    Desc: ${p.desc ? p.desc.substring(0, 100) + '...' : '(none)'}`);
  console.log(`    Raw first 5:`, p.rawSnippet.slice(0, 3));
}

