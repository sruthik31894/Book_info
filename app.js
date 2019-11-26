var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var csp = require('helmet-csp');

require('./app_api/models/db');
const apiRouter = require('./app_api/routes/books');

var app = express();

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_api')));

const corsOpt = {
  credentials: true,
  origin: process.env.CORS_ALLOW_ORIGIN || 'http://localhost:4200', // this work well to configure origin url in the server
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'] // allow json and token in the headers
};
app.use(cors(corsOpt));
app.options('*', cors(corsOpt));
/*
app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "font-src 'self' data");
  return next();
});
*/
app.use(csp({
  directives: {
    defaultSrc: [`'self'`],
    fontSrc: [`'self'`],
    connectSrc: [`https://fonts.googleapis.com`]
  }
}));

app.use('/api', apiRouter);
app.use('/api/users', require('./app_api/routes/users'));
app.use('/api/auth', require('./app_api/routes/auth'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
