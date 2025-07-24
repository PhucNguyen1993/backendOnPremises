const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Kết nối PostgreSQL1ywqqqqaaaqq  
const pool = new Pool({
  host: 'nodejs123stack-dev-clinicpostgres9724a339-ftcsga1pa623.cgv8eygaaeib.us-east-1.rds.amazonaws.com',
  user: 'clinic_admin',
  password: 'yourPassword',
  database: 'clinic',
    ssl: {
      rejectUnauthorized: false,
    },
  port: 5432,
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

// API: Lấy danh sách bệnh nhân
app.get('/patients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patients ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi server');
  }
});


// API: Thêm bệnh nhân mới
app.post('/patients', async (req, res) => {
  const { name, dob, phone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO patients (name, dob, phone) VALUES ($1, $2, $3) RETURNING *',
      [name, dob, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Không thể thêm bệnh nhân');
  }
});

app.listen(port, () => {
  console.log(`Server chạy ở http://localhost:${port}`);
});
