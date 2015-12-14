/*
* kern van de nodejs applicatie
* wnn een gebruiker een request doet zal server.js
* het gepaste antwoord geven (obv de url)
* */

"use strict";

//region SET UP ==================================================================
var express = require('express'),
    logger = require('morgan'), //log requests to the console (express4)
    bodyParser = require('body-parser'),  // pull information from HTML POST (express4)
    path = require('path'),
    methodOverride = require('method-override'); //simulate DELETE and PUT (express4)

var passport = require('passport');
var db = require('./server/config/db'); //load config
var app = express(); //create our app w/ express
var server = require('http').createServer(app);

//endregion

//region CONFIGURATION ==================================================================

//MONGODB
db.connect(db.url, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo database.');
        process.exit(1);
    } else {
        console.log('Connected to the Geofeelings DB');
    }
});

//EXPRESS SETUP

 // view engine setup
 app.set('views', path.join(__dirname, 'views')); //in deze folder zijn de views te vinden
 app.set('view engine', 'jade');

 // uncomment after placing your favicon in /public
 //server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

 app.use(logger('dev'));    // log every request to the console

 // get all data/stuff of the body (POST) parameters
 // parse application/json
 app.use(bodyParser.json());

 // parse application/vnd.api+json as json
 app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

 // parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: true }));

 // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
 app.use(methodOverride('X-HTTP-Method-Override'));

 app.use(express.static(path.join(__dirname, 'public'))); //responsible for serving the static assets (images, CSS files, and JavaScript files) of an Express application.
                                                            /*That tells express/node that the public directory should act as your web root.
                                                            Everything in it can be referenced via /,

                                                            so if you also have a CSS folder in there, you might use /css/styles.css*/


  // Use the passport package in our application
  app.use(passport.initialize());

//endregion

//region ROUTES
//endpoints API service vastleggen
var frontendRoutes = require('./server/routes/routes');
var usersRoute = require('./server/routes/usersRoute');
var statusesRoute = require('./server/routes/statusesRoutes');
var authRoute = require('./server/routes/authRoute');



//registreren van de routes
app.use('/', frontendRoutes); //--> front end
app.use('/api/users/', usersRoute);  //gebruik de usersRoute module voor alle routes die starten met /api/users
app.use('/api/statuses/', statusesRoute);
app.use('api/authenticate', authRoute);



// a middleware with no mount path; gets executed for every request to the server
 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
     console.log("MIDDLEWARE!")
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
 });

//endregion

//region ERROR HANDLERS ==================================================================

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

//endregion


//region EXPORTS ========================================================================
//maakt de variabele 'server' beschikbaar voor andere o.a. bin/www.js
 module.exports = app;  //server is onze express applicatie
//endregion

/*------------------------------------------------------------------------------------------------------------*/
//bepalen of we in productie of development fase mode
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// Start the server
server.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening to your feelings at http://%s:%s', host, port);
});




