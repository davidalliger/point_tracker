const router = require('express').Router();
const balancesRouter = require('./balances.js');
const transactionsRouter = require('./transactions');
const path = require(path);

router.use('/balances', balancesRouter);

router.use('/transactions', transactionsRouter);

module.exports = router;
