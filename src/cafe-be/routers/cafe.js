const express = require('express');
const connection = require('../config/mysql');
const router = express.Router();

// Get cafes
router.get('/getCafes', async (req, res) => {
    try {
        const location = req.query.location;
        let query = `
            SELECT c.id, c.name, c.description, c.logo, c.location, COUNT(ec.employee_id) AS employee
            FROM cafe c
            LEFT JOIN employeecafe ec ON c.id = ec.cafe_id`;
        
        if (location) {
            query += ` WHERE c.location = ?`;
        }
        
        query += ` GROUP BY c.id, c.name, c.description, c.logo, c.location ORDER BY employee DESC`;
        
        connection.query(query, [location], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new cafe
router.post('/createCafe', async (req, res) => {
    try {
        const { name, description, logo, location } = req.body;
        const query = `INSERT INTO cafe (name, description, logo, location) VALUES (?, ?, ?, ?)`;
        
        connection.query(query, [name, description, logo, location], (err, result) => {
            if (err) {
                if (err.code === 'ER_SIGNAL_EXCEPTION') {
                    return res.status(400).json({ error: err.sqlMessage });
                }
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Cafe created successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a cafe
router.put('/updateCafe', async (req, res) => {
    try {
        const { id, name, description, logo, location } = req.body;
        const query = `UPDATE cafe SET name = ?, description = ?, logo = ?, location = ? WHERE id = ?`;
        
        connection.query(query, [name, description, logo, location, id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Cafe updated successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a cafe
router.delete('/deleteCafe', async (req, res) => {
    try {
        const { id } = req.body;
        const query = `DELETE FROM cafe WHERE id = ?`;
        
        connection.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const deleteEmployeeCafeQuery = `DELETE FROM employeecafe WHERE cafe_id = ?`;
            
            connection.query(deleteEmployeeCafeQuery, [id], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Cafe deleted successfully' });
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get cafe names and IDs for dropdown
router.get('/getCafeDropdown', async (req, res) => {
    try {
        const query = `SELECT id, name FROM cafe ORDER BY name ASC`;
        
        connection.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
