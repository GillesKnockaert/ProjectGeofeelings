var authController = (function () {
        //load required packages
        var User = require('../data/models/user').userModel;
        var passport = require('passport');
        var BasicStrategy = require('passport-http').BasicStrategy;

        var jwt = require('jsonwebtoken');

        passport.use(new BasicStrategy(
            function (username, password, next) {
                User.findOne({name: username}, function (err, user) {
                    if (err) {
                        return next(err);
                    }

                    //no user found with that username
                    //no error, but we stop the call chain
                    if (!user) {
                        return next(null, false);
                    }

                    //make sure the password is correct
                    user.verifyPassword(password, function (err, isMatch) {
                        //error
                        if (err) {
                            return next(err);
                        }
                        //password did not match
                        if (!isMatch) {
                            return next(null, false);
                        }

                        //succes: we return the user to the next middleware
                        return next(null, user);
                    });
                });
            }
        ));

        var isAuthenticated = passport.authenticate('basic', {session: false});

        var authenticateRequest = function (req, res, next) {
            var app = require('../../server.js');
            // check header or url parameters or post parameters for token
            var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

            // decode token
            if (token) {

                // verifies secret and checks exp
                jwt.verify(token, app.get('secret'), function (err, decoded) {
                    if (err) {
                        return res.json(
                            {
                                success: false,
                                message: 'Failed to authenticate token.'
                            }
                        );
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                });

            } else {

                // if there is no token
                // return an error
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });

            }
        }

        var isAdmin = function (req, res, next) {
            if (!req.decoded.isAdmin) {

                return res.status(403).send({
                    success: false,
                    message: 'You must be an admin.'
                });
            }
            next();
        }


        return {
            isAuthenticated: isAuthenticated,
            authenticateReq: authenticateRequest,
            isAdmin: isAdmin
        }
    })
();

module.exports = authController;