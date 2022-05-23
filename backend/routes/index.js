const express = require('express');
const apiRouter = require('./api');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.use('/api', apiRouter);


module.exports = router;
