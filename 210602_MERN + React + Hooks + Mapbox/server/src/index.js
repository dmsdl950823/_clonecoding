// npx eslint --init
const express = require('express');
const morgan = require('morgan'); // incomming requiest's size logger
const helmet = require('helmet');
const cors = require('cors');

const middelware = require('./middlewares');

const app = express();
app.use(morgan('common')); // date, REQUEST TYPE, status ..
app.use(helmet()); // hide header :: X-Powered-By: Express
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

// [not-found] middelware page
app.use(middelware.notFound);

// Error Handler
app.use(middelware.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
