var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//  adding cors
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const tareasRouter = require('./routes/tareas');

var app = express();
// adding cors
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tareas', tareasRouter);

module.exports = app;
