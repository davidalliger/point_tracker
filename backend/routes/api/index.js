const router = require('express').Router();
const accountsRouter = require('./accounts.js');
const transactionsRouter = require('./transactions.js');

router.use('/accounts', accountsRouter);

router.use('/transactions', transactionsRouter);

module.exports = router;
