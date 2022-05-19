const express = require('express');
const apiRouter = require('/api', apiRouter);

const router = express.Router();

router.use('/api', apiRouter);

module.exports = router;
