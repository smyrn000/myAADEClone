
const express = require('express');
const db = require('./db');

const router = express.Router();

// Registration route
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(query, [username, password], function (err) {
        if (err) {
            res.status(500).send('Error registering user: ' + err.message);
        } else {
            res.status(201).json({ id: this.lastID, username });
        }
    });
});

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.get(query, [username, password], (err, row) => {
        if (err) {
            res.status(500).send('Error logging in: ' + err.message);
        } else if (row) {
            res.json({ message: 'Login successful', user: row });
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// Clients route
router.get('/clients', (req, res) => {
    db.all('SELECT * FROM clients', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error retrieving clients: ' + err.message);
        } else {
            res.json(rows);
        }
    });
});

router.post('/clients', (req, res) => {
    const { name, contact_info } = req.body;
    const query = 'INSERT INTO clients (name, contact_info) VALUES (?, ?)';
    db.run(query, [name, contact_info], function (err) {
        if (err) {
            res.status(500).send('Error adding client: ' + err.message);
        } else {
            res.status(201).json({ id: this.lastID, name, contact_info });
        }
    });
});

// Export routes
module.exports = router;
