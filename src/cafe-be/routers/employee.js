const express = require('express');
const connection = require('../config/mysql');
const router = express.Router();

// get employee
router.get('/getEmployees', async (req, res) => {
    try {
        const cafe = req.query.cafe;
        let query = `
            SELECT e.id, e.name, e.email_address, e.gender, e.phone_number, DATEDIFF(CURDATE(), ec.start_date) AS days_worked, c.name AS cafe, c.id AS cafe_id, ec.start_date
            FROM employee e
            LEFT JOIN employeecafe ec ON e.id = ec.employee_id
            LEFT JOIN cafe c ON ec.cafe_id = c.id `;
        
        if (cafe) {
            query += ` WHERE c.id = ?`;
        }
        
        query += ` ORDER BY days_worked DESC`;
        
        connection.query(query, [cafe], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new employee
router.post('/createEmployee', async (req, res) => {
    try {
        const { name, email_address, phone_number, gender, cafe_id, start_date } = req.body;
        const employeeQuery = `INSERT INTO employee (name, email_address, phone_number, gender) VALUES (?, ?, ?, ?)`;
        const employeeCafeQuery = `INSERT INTO employeecafe (employee_id, cafe_id, start_date) VALUES ((SELECT id FROM employee WHERE email_address = ?), ?, ?)`;
        
        connection.query(employeeQuery, [name, email_address, phone_number, gender], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            connection.query(employeeCafeQuery, [email_address, cafe_id, start_date], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Employee created successfully' });
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an employee
router.put('/updateEmployee', async (req, res) => {
    try {
        const { id, name, email_address, phone_number, gender, cafe_id, start_date } = req.body;
        const employeeQuery = `UPDATE employee SET name = ?, email_address = ?, phone_number = ?, gender = ? WHERE id = ?`;
        const employeeCafeQuery = `UPDATE employeecafe SET cafe_id = ?, start_date = ? WHERE employee_id = ?`;
        
        connection.query(employeeQuery, [name, email_address, phone_number, gender, id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            connection.query(employeeCafeQuery, [cafe_id, start_date, id], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Employee updated successfully' });
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an employee
router.delete('/deleteEmployee', async (req, res) => {
    try {
        const { id } = req.body;
        const deleteEmployeeCafeQuery = `DELETE FROM employeecafe WHERE employee_id = ?`;
        const deleteEmployeeQuery = `DELETE FROM employee WHERE id = ?`;

        connection.query(deleteEmployeeCafeQuery, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            connection.query(deleteEmployeeQuery, [id], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Employee deleted successfully', id });
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
