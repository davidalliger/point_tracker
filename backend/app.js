const express = require('express');
// const cookieParser = require('cookie-parser');
const cors = require('cors');
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const isProduction = environment === 'production';
const routes = require('./routes');

require('dotenv').config();

const app = express();

if (!isProduction) app.use(cors());

app.use(express.json());

app.use(routes);

app.use((req, res, next) => {
    const err = new Error('The requested resource could not be found.');
    err.title = 'Resource Not Found';
    err.errors = ['The requested resource could not be found.']
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map(e => e.message);
        err.title = 'Validation Error'
    }
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: isProduction ? null : err.message,
        errors:err.errors,
        stack: isProduction ? null : err.stack
    });
});

module.exports = app;
