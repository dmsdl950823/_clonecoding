// npx eslint --init
const express = require('express');
const morgan = require('morgan'); // incomming requiest's size logger
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middelware = require('./middlewares');
// const logs = require('./api/logs');

const app = express();

console.log(process.env.DATABASE_URL);
// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
// });

app.use(morgan('common')); // date, REQUEST TYPE, status ..
app.use(helmet()); // hide header :: X-Powered-By: Express
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

// app.use('/api/logs', logs);

// [not-found] middelware page
app.use(middelware.notFound);
// Error Handler
app.use(middelware.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
