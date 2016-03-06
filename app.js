var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var timer_reset = require('./routes/timer_reset');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/timer_reset', timer_reset);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

var NanoTimer = require('nanotimer');

app.locals.count = "5s";
app.locals.timers = {};


function something() {

    /*
     * initialize from cache (redis)
     */
    var sellerid = '00000002';
    var timer = new NanoTimer();
    timer.setTimeout(timerExpiration, [timer], app.locals.count);
    app.locals.timers.sellerid = timer;


}


function timerExpiration(timer) {
    console.log('timer expiration!');
    /*
     * make request to expiration web service
     */
    var request = require('request');
    request('http://es.filamnt.io', function (error, response, body) {
        console.log("request made");
        console.log(error);
        console.log(response);
        console.log(body);
    });
}

something();
