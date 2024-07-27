const express = require('express');
const connection = require('../config/mysql');
const router = express.Router();

// Get cafes
router.get('/getCafes', (req, res) => {
    const location = req.query.location;
    let query = `
      SELECT c.id, c.name, c.description, c.logo, c.location, COUNT(ec.employee_id) AS employee
      FROM cafe c
      LEFT JOIN employeecafe ec ON c.id = ec.cafe_id
    `;
    if (location) {
        query += ` WHERE c.location = ?`;
    }
    query += ` GROUP BY c.id ORDER BY employee DESC`;
    connection.query(query, [location], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new cafe
router.post('/createCafe', (req, res) => {
    const { name, description, logo, location } = req.body;
    const query = `INSERT INTO cafe (name, description, logo, location) VALUES ( ?, ?, ?, ?)`;
    connection.query(query, [name, description, logo, location], (err, result) => {
        if (err) {
            if (err.code === 'ER_SIGNAL_EXCEPTION') {
                return res.status(400).json({ error: err.sqlMessage });
            }
            throw err;
        }
        res.json({ message: 'Cafe created successfully' });
    });
});

// Update a cafe
router.put('/updateCafe', (req, res) => {
    const { id, name, description, logo, location } = req.body;
    const query = `UPDATE cafe SET name = ?, description = ?, logo = ?, location = ? WHERE id = ?`;
    connection.query(query, [name, description, logo, location, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Cafe updated successfully' });
    });
});

// Delete a cafe
router.delete('/deleteCafe', (req, res) => {
    const { id } = req.body;
    const query = `DELETE FROM cafe WHERE id = ?`;
    connection.query(query, [id], (err, result) => {
        if (err) throw err;
        const deleteEmployeeCafeQuery = `DELETE FROM employeecafe WHERE cafe_id = ?`;
        connection.query(deleteEmployeeCafeQuery, [id], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Cafe deleted successfully'});
        });
    });
});

module.exports = router;
