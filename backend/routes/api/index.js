const router = require('express').Router();
const balancesRouter = require('./balances.js');
const transactionsRouter = require('./transactions');

router.use('/balances', balancesRouter);

router.use('/transactions', transactionsRouter);

module.exports = router
