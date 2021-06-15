const express = require('express');
const router = express.Router();
const { getTransactions } = require('../controllers/transactions')

// router.get('/', (req, res) => res.send('Hello World!'));
router
  .route('/')
  .get(getTransactions);

module.exports = router;