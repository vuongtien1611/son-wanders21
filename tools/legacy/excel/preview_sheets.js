const fs = require('fs');
const data = JSON.parse(fs.readFileSync('excel_data.json', 'utf8'));

for (const [sheetName, sheetInfo] of Object.entries(data)) {
  console.log(`\n=================== SHEET: ${sheetName} (${sheetInfo.rowCount} rows) ===================`);
  // Print non-empty rows up to 15
  let printed = 0;
  for (let i = 0; i < sheetInfo.rows.length && printed < 15; i++) {
    const row = sheetInfo.rows[i].filter(cell => cell !== '');
    if (row.length > 0) {
      console.log(`[Row ${i + 1}]`, row.join(' | '));
      printed++;
    }
  }
}

