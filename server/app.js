const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const favicon = require('express-favicon');

// load .env only on development
if (!process.env.TRAVIS && !process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const controllers = require('./controllers');
const errorHandler = require('./errors/error_handler');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  // cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
}));

app.use('/api', controllers);

// serve static files
app.use(express.static(path.join(__dirname, '..', 'client', 'dist', 'client')));
app.use(favicon(path.join(__dirname, '..', 'client', 'dist', 'client', 'favicon.ico')));

//  handle all requests
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'client', 'index.html'));
});

// error handler
app.use(errorHandler);

module.exports = app;
