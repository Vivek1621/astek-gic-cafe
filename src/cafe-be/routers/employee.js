const express = require('express');
const connection = require('../config/mysql');
const router = express.Router();

// Get employees
router.get('/getEmployees', (req, res) => {
    const cafe = req.query.cafe;
    let query = `
      SELECT e.id, e.name, e.email_address, e.phone_number, DATEDIFF(CURDATE(), ec.start_date) AS days_worked, c.name AS cafe
      FROM employee e
      LEFT JOIN employeecafe ec ON e.id = ec.employee_id
      LEFT JOIN cafe c ON ec.cafe_id = c.id
    `;
    if (cafe) {
        query += ` WHERE c.name = ?`;
    }
    query += ` ORDER BY days_worked DESC`;
    connection.query(query, [cafe], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new employee
router.post('/createEmployee', (req, res) => {

    const { name, email_address, phone_number, gender, cafe_id, start_date } = req.body;
    
    const employeeQuery = `INSERT INTO employee (name, email_address, phone_number, gender) VALUES (?, ?, ?, ?)`;
    const employeeCafeQuery = `INSERT INTO employeecafe (employee_id, cafe_id, start_date) VALUES ((SELECT id FROM employee WHERE email_address = ?), ?, ?)`;
    connection.query(employeeQuery, [name, email_address, phone_number, gender], (err, result) => {

        if (err) throw err;
        connection.query(employeeCafeQuery, [email_address, cafe_id, start_date], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Employee created successfully' });
        });
    });
});

// Update an employee
router.put('/updateEmployee', (req, res) => {
    const { id, name, email_address, phone_number, gender, cafe_id, start_date } = req.body;
    const employeeQuery = `UPDATE employee SET name = ?, email_address = ?, phone_number = ?, gender = ? WHERE id = ?`;
    const employeeCafeQuery = `UPDATE employeecafe SET cafe_id = ?, start_date = ? WHERE employee_id = ?`;
    connection.query(employeeQuery, [name, email_address, phone_number, gender, id], (err, result) => {
        if (err) throw err;
        connection.query(employeeCafeQuery, [cafe_id, start_date, id], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Employee updated successfully'});
        });
    });
});

// Delete an employee
router.delete('/deleteEmployee', (req, res) => {
    const { id } = req.body;
    const query = `DELETE FROM employee WHERE id = ?`;
    const deleteEmployeeCafeQuery = `DELETE FROM employeecafe WHERE employee_id = ?`;
    connection.query(deleteEmployeeCafeQuery, [id], (err, result) => {
        if (err) throw err;
        connection.query(query, [id], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Employee deleted successfully', id });
        });
    });
});

module.exports = router;
