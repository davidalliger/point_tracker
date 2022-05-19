const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const { environment } = require('./config');
const isProduction = environment === 'production';
const routes = require('./routes');

require('dotenv').config();

const app = express();

app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

app.use(routes);

app.get('/', (req, res) => {

});

app.use((req, res, next) => {
    const err = new Error('The requested resource could not be found.');
    err.status = 404;
    next(err);
})

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
