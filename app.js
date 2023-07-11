const middleware = require('./src/middleware/middleware');
const express = require('express');

require('dotenv').config();
const app = express();

const routes = require('./src/routes');

app.disable('x-powered-by');
app.use(express.json({'limit':'10mb'}));
app.use(express.urlencoded({ extended: true }));

app.all('*', function(_, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	next();
}, middleware.getRequest);

app.use('/api', routes);

module.exports = app;