const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const cafeRouter = require('./routers/cafe');
const employeeRouter = require('./routers/employee');


const port = process.env.PORT;
app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.use(express.json());

app.use('/cafe', cafeRouter);
app.use('/employee', employeeRouter);


app.listen(port,'0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});