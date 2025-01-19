
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

// Products routes
router.get('/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error retrieving products: ' + err.message);
        } else {
            res.json(rows);
        }
    });
});

router.post('/products', (req, res) => {
    const { name, description, price, stock } = req.body;
    const query = 'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)';
    db.run(query, [name, description, price, stock], function (err) {
        if (err) {
            res.status(500).send('Error adding product: ' + err.message);
        } else {
            res.status(201).json({ id: this.lastID, name, description, price, stock });
        }
    });
});

// Invoices routes
router.get('/invoices', (req, res) => {
    const query = `SELECT invoices.*, clients.name AS client_name
                   FROM invoices
                   INNER JOIN clients ON invoices.client_id = clients.id`;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).send('Error retrieving invoices: ' + err.message);
        } else {
            res.json(rows);
        }
    });
});

router.post('/invoices', (req, res) => {
    const { client_id, date, total } = req.body;
    const query = 'INSERT INTO invoices (client_id, date, total) VALUES (?, ?, ?)';
    db.run(query, [client_id, date, total], function (err) {
        if (err) {
            res.status(500).send('Error adding invoice: ' + err.message);
        } else {
            res.status(201).json({ id: this.lastID, client_id, date, total });
        }
    });
});
