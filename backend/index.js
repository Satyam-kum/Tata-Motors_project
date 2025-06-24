// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const XLSX = require('xlsx');
// const alasql = require('alasql');
// const path = require('path');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // Load Excel data once on server start
// const workbook = XLSX.readFile(path.join(__dirname, 'data.xlsx')); // Put your Excel file in backend folder and name it 'data.xlsx'
// const sheetName = workbook.SheetNames[0];
// const worksheet = workbook.Sheets[sheetName];

// // Convert sheet to JSON array of objects
// const jsonData = XLSX.utils.sheet_to_json(worksheet);

// // Register the data as a table in alasql
// alasql('CREATE TABLE excelData');
// alasql.tables.excelData.data = jsonData;

// app.post('/execute-sql', (req, res) => {
//   const { query } = req.body;

//   if (!query || typeof query !== 'string') {
//     return res.json({ status: 'error', message: 'Invalid query.' });
//   }

//   try {
//     // Run the query on the excelData table
//     const result = alasql(query);

//     if (!Array.isArray(result)) {
//       return res.json({ status: 'error', message: 'Query did not return a result set.' });
//     }

//     // Extract columns from the first row keys if available
//     const columns = result.length > 0 ? Object.keys(result[0]) : [];

//     // Extract rows as arrays of values
//     const rows = result.map(row => columns.map(col => row[col]));

//     res.json({
//       status: 'success',
//       columns,
//       rows,
//     });
//   } catch (err) {
//     res.json({
//       status: 'error',
//       message: err.message || 'Error executing query.',
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const alasql = require('alasql');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Load Excel data once on server start
const workbook = XLSX.readFile(path.join(__dirname, 'data.xlsx')); // Put your Excel file in backend folder and name it 'data.xlsx'
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert sheet to JSON array of objects
const jsonData = XLSX.utils.sheet_to_json(worksheet);

// Register the data as a table in alasql
alasql('CREATE TABLE excelData');
alasql.tables.excelData.data = jsonData;

app.post('/execute-sql', (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    return res.json({ status: 'error', message: 'Invalid query.' });
  }

  try {
    // Run the query on the excelData table
    const result = alasql(query);

    if (!Array.isArray(result)) {
      return res.json({ status: 'error', message: 'Query did not return a result set.' });
    }

    if (result.length === 0) {
      return res.json({
        status: 'empty',
        message: 'No results found for this query.',
        columns: [],
        rows: []
      });
    }

    // Extract columns from the first row keys if available
    const columns = Object.keys(result[0]);

    // Extract rows as arrays of values
    const rows = result.map(row => columns.map(col => row[col]));

    res.json({
      status: 'success',
      columns,
      rows,
    });
  } catch (err) {
    res.json({
      status: 'error',
      message: err.message || 'Error executing query.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// SELECT * FROM excelData