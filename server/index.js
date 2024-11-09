const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// API Routes
app.get('/api/messages', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM messages');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.post('/api/messages', async (req, res) => {
  const { text, location } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO messages (text, location, status) VALUES (?, ?, ?)',
      [text, location, 'pending']
    );
    res.status(201).json({ id: result.insertId, text, location });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
});

app.patch('/api/messages/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.query(
      'UPDATE messages SET status = ? WHERE id = ?',
      [status, id]
    );
    res.json({ id, status });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message status' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});