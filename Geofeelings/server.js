/*
* kern van de nodejs applicatie
* wnn een gebruiker een request doet zal server.js
* het gepaste antwoord geven (obv de url)
* */

//region MODULE IMPORTS
var express = require('express'),
    logger = require('morgan'), //logger binnen Express
    bodyParser = require('body-parser'),  //voor parsen van body of JSON
    less = require('less'),
    path = require('path')
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose');

//endregion

//region MONGODB SETUP
/*
 mongoose.connect('mongodb://localhost/geofeelings');
 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error ...'));
 db.once('open',function callback(){
 console.log("geofeelings db opened");
 });
 */

//region MongoDB & Monk
var mongo = require('mongodb');  //we willen praten met mongo
var monk = require('monk'); //we praten dmv monk
var db = monk('localhost:27017/geofeelings'); // onze DB is hier te vinden

//endregion


//region WEB PAGES
/*per pagina dient een route file aangemaakt te worden*/
var routes = require('./server/routes/index');
var users = require('./server/routes/users');
var helloworld = require('./server/routes/helloworld');
var instructions = require('./server/routes/instructions');
//endregion

//region EXPRESS SETUP
/*het app object is verantwoordelijk voor het afhandelen van de requests*/
var app = express(); //variabele voor een applicatie die we met express willen maken

 // view engine setup
 app.set('views', path.join(__dirname, 'views')); //in deze folder zijn de views te vinden
 app.set('view engine', 'jade');

 // uncomment after placing your favicon in /public
 //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 app.use(logger('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(cookieParser());
 app.use(require('less-middleware')(path.join(__dirname, 'public')));
 app.use(express.static(path.join(__dirname, 'public'))); //responsible for serving the static assets (images, CSS files, and JavaScript files) of an Express application.
                                                            /*That tells express/node that the public directory should act as your web root.
                                                            Everything in it can be referenced via /,
                                                            so if you also have a CSS folder in there, you might use /css/styles.css*/
//endregion

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;  // db = Monk connection object --> we voegen deze functie toe aan app.use zodat iedere HTTP request het object meekrijgt
    next();
});

/*wnn een gebruiker naar de home of / directory wil -> gebruik routes object*/
app.use('/', routes);
/*wnn een gebruiker naar de /users directory wil -> gebruik users object*/
app.use('/users', users);
app.use('/helloworld', helloworld);
app.use('/instructions', instructions);

// a middleware with no mount path; gets executed for every request to the app
 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
 });

 // error handlers

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





//maakt de variabele 'app' beschikbaar voor andere o.a. bin/www.js
 module.exports = app;  //app is onze express applicatie

/*------------------------------------------------------------------------------------------------------------*/
//bepalen of we in productie of development fase mode
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';








