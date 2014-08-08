var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//CouchDB dependencies
var cradle = require('cradle');

//Connect to Denis' Laptop DB
//TODO change it to production
var c = new(cradle.Connection)('10.0.8.184', 5984, {
      cache: true,
      raw: false,
      forceSave: true
  });
var db = c.database('freefood');
db.exists(function (err, exists) {
	if (err) {
      console.log('error', err);
    } else if (exists) {
      console.log('the force is with you.');
    } else {
      console.log('database does not exists.');
      db.create();
      /* populate design documents */
    }
  });

// app.locals.submitEvent = $(function() {
	// $('#registerEvent').submit(function(event) {
		// event.preventDefault(); // Stops browser from navigating away from page
		// var data;
		////build a json object or do something with the form, store in data
		// $.post('/registerEvent', data, function(resp) {
			// alert(resp);
			////do something when it was successful
		// });
	// });
// });			



// var res = db.view('freeFoodViews/getEventsByUni', function (err, res) {
	  // console.log(res);
	  // res.forEach(function (row) {
         // console.log("{Uni: %s,Time: %s,Location: %s,Organizer: %s,Description: %s,Picture: }",row.Uni,row.Time,row.Location,row.Organizer,row.Description);
      // });
	  // console.log(res);
  // });
  




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
	req.db = db;
	next();
});

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
