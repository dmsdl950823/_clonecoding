const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors'); // color console
const morgan = require('morgan');

const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' })
const app = express()

connectDB()

const transactions = require('./routes/transactions')
app.use('/api/v1/transactions', transactions)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))