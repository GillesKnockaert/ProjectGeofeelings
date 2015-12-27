var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var bodyParser = require('body-parser');

//region ROUTES
//endpoints API service vastleggen
var frontendRoutes = require('./server/routes/indexRoute');
var usersRoute = require('./server/routes/usersRoutes');
var statusRoute = require('./server/routes/statusRoutes');
var authRoute = require('./server/routes/authRoutes');
var locationsRoute = require('./server/routes/locationsRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());



//mongoose models
var User = require('./server/models/user');
var Status = require('./server/models/status');
var Location = require('./server/models/location');

//registreren van de routes
app.use('/', frontendRoutes); //--> front end
app.use('/api/users/', usersRoute(User));  //gebruik de usersRoute module voor alle routes die starten met /api/users
app.use('/api/status/', statusRoute(User, Status));
app.use('/api/authenticate', authRoute(User));
app.use('/api/locations', locationsRoute(Location));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//app is default een EventEmitter
app.on("appMessage" , function (data) {
    console.log("data " , data)
})

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
