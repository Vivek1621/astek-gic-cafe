const express = require('express')
const app = express();
const dotenv = require('dotenv').config();
const cafeRouter = require('./routers/cafe');
const employeeRouter = require('./routers/employee');


const port = process.env.PORT;

app.use(express.json());

app.use('/cafe', cafeRouter);
app.use('/employee', employeeRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});