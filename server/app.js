const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const nutri_score = require('./routes/nutri_score');
const products = require('./routes/products');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/nutriscore', nutri_score);
app.use('/products', products);
app.use('/recipes', recipes);
// *****************************
// IMPORTANT:
// This route needs to be the last route declared !!!
// Else some routes could be overridden
app.use('/', indexRouter);
// *****************************


app.use((req, res, next) => {
    if (req.originalUrl === '/favicon.ico') {
        // if (/\/favicon\.?(jpe?g|png|ico|gif)?$/i.test(req.url)) {
        res.status(204).send(null);
    } else {
        next();
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.toString());
});


module.exports = app;



