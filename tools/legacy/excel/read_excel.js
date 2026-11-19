const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const excelPath = 'C:\\Users\\Admin\\Documents\\sơn myhouse\\Sơn WANDERS.xlsx';
const workbook = xlsx.readFile(excelPath);

console.log('Sheet Names Count:', workbook.SheetNames.length);
console.log('Sheet Names:', workbook.SheetNames);

const result = {};

for (const name of workbook.SheetNames) {
  const sheet = workbook.Sheets[name];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: '' });
  result[name] = {
    rowCount: data.length,
    rows: data
  };
  console.log(`Sheet "${name}": ${data.length} rows`);
}

fs.writeFileSync('excel_data.json', JSON.stringify(result, null, 2), 'utf8');
console.log('Saved to excel_data.json');

