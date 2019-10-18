var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var certificacionRouter = require('./routes/certificacion');
var clienteRouter = require('./routes/cliente');
var controlRouter = require('./routes/control');
var cotizacionRouter = require('./routes/cotizacion');
var datosControlRouter = require('./routes/datosControl');
var datosCotiazacionRouter = require('./routes/datosCotiazacion');
var list_docsRouter = require('./routes/list_docs');
var proyectoRouter = require('./routes/proyecto');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/certificacion', certificacionRouter);
app.use('/cliente', clienteRouter);
app.use('/control', controlRouter);
app.use('/cotizacion', cotizacionRouter);
app.use('/datosControl', datosControlRouter);
app.use('/datosCotiazacion', datosCotiazacionRouter);
app.use('/list_docs', list_docsRouter);
app.use('/proyecto', proyectoRouter);


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

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

module.exports = app;
