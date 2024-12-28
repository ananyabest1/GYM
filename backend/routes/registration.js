const express = require('express');
const router = express.Router();
const connection = require('../config/database');

// Fetch available batches
router.get('/batches', (req, res) => {
  const batches = [
    { id: 'batch1', name: 'Morning Batch (7-8 AM)' },
    { id: 'batch2', name: 'Afternoon Batch (12-1 PM)' },
    { id: 'batch3', name: 'Evening Batch (5-6 PM)' }
  ];
  res.json(batches);
});

// Register a new user
router.post('/register', (req, res) => {
  const { name, email, phone, address, password, batch } = req.body;
  const query = `
    INSERT INTO registrations (name, email, phone, address, password, batch, payment_status)
    VALUES (?, ?, ?, ?, ?, ?, 'Paid')
  `;

  connection.query(query, [name, email, phone, address, password, batch], (err) => {
    if (err) {
      console.error('Error inserting registration:', err);
      return res.status(500).json({ message: 'Registration failed' });
    }
    res.status(200).json({ message: 'Registration successful' });
  });
});

// View unpaid fees
router.get('/unpaid', (req, res) => {
  const query = `
    SELECT * FROM registrations WHERE payment_status = 'Unpaid'
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching unpaid registrations:', err);
      return res.status(500).json({ message: 'Failed to fetch unpaid fees' });
    }
    res.json(results);
  });
});

// Calculate outstanding dues
router.get('/dues', (req, res) => {
  const query = `
    SELECT name, email, COUNT(*) * 50 AS outstanding_dues
    FROM registrations
    WHERE payment_status = 'Unpaid'
    GROUP BY email
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error calculating dues:', err);
      return res.status(500).json({ message: 'Failed to calculate dues' });
    }
    res.json(results);
  });
});

module.exports = router;
