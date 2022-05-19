const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const routes = require('./routes');

require('dotenv').config();

const app = express();

app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

app.use(routes);

app.get('/', (req, res) => {

});

const { port } = require('./config');

app.listen(port, () => console.log(`Listening on port ${port}...`));
