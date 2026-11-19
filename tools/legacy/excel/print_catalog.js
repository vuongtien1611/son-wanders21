const fs = require('fs');
const products = JSON.parse(fs.readFileSync('parsed_products.json', 'utf8'));

products.forEach((p, i) => {
  console.log(`[${i + 1}] Sheet: "${p.sheetName}" | Rows: ${p.rowCount}`);
  console.log(`    Title: ${p.title}`);
  console.log(`    Desc: ${p.desc ? p.desc.substring(0, 100) + '...' : '(none)'}`);
  console.log(`    Packaging: ${p.packaging.join('; ')}`);
  console.log(`    Standards: ${p.standards.join('; ')}`);
});

