//load required packages
var passport = require('passport');

var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../data/models/user').userModel;
/*
passport.use(new BasicStrategy(
    function(username, password, next){
        User.findOne({name: username}, function(err, user){
            if(err){
                return next(err);
            }

            //no user found with that username
            //no error, but we stop the call chain
            if(!user){
                return next(null,false);
            }

            //make sure the password is correct
            user.verifyPassword(password,function(err, isMatch){
                //error
                if(err){
                    return next(err);
                }
                //password did not match
                if(!isMatch){
                    return next(null, false);
                }

                //succes: we return the user to the next middleware
                return next(null, user);
            });
        });
    }
));
*/
//we create and export a function named isAuthenticated
//we tell passport to use our basic strategy
//we set session to false to not store session variables
//exports.isAuthenticated = passport.authenticate('basic', { session : false });

//test
var authController = function(User){
    var passport = require('passport');

    var BasicStrategy = require('passport-http').BasicStrategy;
    //var User = require('../models/user').userModel;

    passport.use(new BasicStrategy(
        function(username, password, next){
            User.findOne({name: username}, function(err, user){
                if(err){
                    return next(err);
                }

                //no user found with that username
                //no error, but we stop the call chain
                if(!user){
                    return next(null,false);
                }

                //make sure the password is correct
                user.verifyPassword(password,function(err, isMatch){
                    //error
                    if(err){
                        return next(err);
                    }
                    //password did not match
                    if(!isMatch){
                        return next(null, false);
                    }

                    //succes: we return the user to the next middleware
                    return next(null, user);
                });
            });
        }
    ));

    var isAuthenticated = passport.authenticate('basic', { session : false });



    return {
        isAuthenticated: isAuthenticated
    }
}

module.exports = authController;