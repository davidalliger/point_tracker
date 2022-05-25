const express = require('express');
const apiRouter = require('./api');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
    const path = require('path');

    router.get('/', (req, res) => {
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });

    router.use(express.static(path.resolve('../frontend/build')));

    router.get(/^(?!\/?api).*/, (req, res) => {
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });
}

module.exports = router;
