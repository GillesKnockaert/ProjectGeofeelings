/*controller that controls the different endpoints for the User model*/


var UserController = (function () {
    var User = require('../data/models/user');
    var jwt = require('jsonwebtoken'); //create and verify our JSON Web Tokens
    var httpErrors = require('httperrors');


    var getUsers = function (cb) {
        User.find({})
            .lean()
            .sort('name')
            .exec(function (err, users) {
                if (err) {
                    var error = httpErrors(404);
                    error.message = "Could not find users.";
                    return cb(error, null);
                }
                cb(null, users);
            });
    };

    var getAllUserData = function (req, res, cb) {
        var user_id = req.params.user_id;

        User.findById(user_id)
            .lean()
            //.populate('connections status')
            .populate({path: "status connections"})
            .exec(function (err, user) {
                if (err) {
                    var error = httpErrors(404);
                    error.message = "Could not find user.";
                    return cb(error, null);
                }

                var options = [
                    {
                        path: 'status._location',
                        model: 'Location',
                        options: {lean: true}
                    },
                    {
                        path: 'connections.status',
                        model: 'Status',
                        options: {lean: true}
                    },
                ];

                User.populate(user, options, function (err, user) {
                    if (err) {
                        var error = httpErrors(404);
                        error.message = "Could not find user.";
                        return cb(error, null);
                    }

                    var options = [
                        {
                            path: 'connections.status._location',
                            model: 'Location',
                            options: {lean: true}
                        }
                    ];

                    User.populate(user, options, function (err, user) {
                        if (err) {
                            var error = httpErrors(404);
                            error.message = "Could not find user.";
                            return cb(error, null);
                        }
                        return cb(null, user);

                    })


                });

            });
    };

    var getUserConnections = function (req, res, cb) {
        var user_id = req.params.user_id;

        User.findById(user_id)
            .lean()
            .select('connections')
            .exec(function (err, user) {
                if (err) {
                    var error = httpErrors(404);
                    error.message = "Could not find connections.";
                    return cb(err, null);
                }

                var options = [
                    {
                        path: 'connections',
                        model: 'User',
                        options: {lean: true}
                    }
                ];

                User.populate(user, options, function (err, connections) {
                    if (err) {
                        var error = httpErrors(404);
                        error.message = "Could not find user.";
                        return cb(error, null);
                    }
                    return cb(null, connections);
                });
            });
    };

    var updateUser = function (req, res) {

    }

    var registerUser = function (req, res, next) {
        //validate the input
        req.checkBody('name', 'Name is required.').notEmpty();
        req.checkBody('password', 'Password is required.').notEmpty();
        req.checkBody('isContactable', 'Contactable is required.').notEmpty().isBoolean();

        // check the validation object for errors
        var errors = req.validationErrors();

        if (errors) {
            var err = httpErrors(400);
            err.message = "Name and password are required.";
            return next(err, null);

        } else {
            var user = req.body;

            User.create(user, function (err) {
                if (err) {
                    var error = httpErrors(500);
                    error.message = "Something went wrong while registering.";
                    return next(error, null);
                } else {
                    return next(null, user);
                }
            });
        }
    }

    var authenticateUser = function (req, res, next) {
        var app = require('../../server.js');


        //validate the input
        req.checkBody('name', 'Name is required.').notEmpty();
        req.checkBody('password', 'Password is required.').notEmpty();

        // check the validation object for errors
        var errors = req.validationErrors();

        if (errors) {
            var error = new httpErrors(400);
            error.message = "Name and password are required.";
            return next(error, null);
        }


        //user opzoeken in de DB obv doorgestuurde user name
        User.findOne({name: req.body.name}, function (err, user) {
            if (!user) {
                var error = new httpErrors(400);
                error.message = "Authentication failed. User doesn\'t exists";
                //res.json({success: false, message: 'Authentication failed. User doesn\'t exists'});
                return next(error, null);
            }

            //user gevonden
            //checken of het password van de user overeen komt met het doorgestuurde password
            user.verifyPassword(req.body.password, function (err, isMatch) {
                if (err) {
                    //res.json({message: err});
                    var error = new httpErrors(400);
                    error.message = "Something went wrong while retreiving information fomr the database";
                    return next(error, null);
                } else if (!isMatch) {
                    //res.json({success: false, message: "Authentication failed. Wrong password."});
                    //return;
                    var error = new httpErrors(400);
                    error.message = "Authentication failed. Wrong password.";
                    return next(error, null);
                } else {
                    //de gebruiker is gevonden en het paswoord is juist
                    //token aanmaken
                    user.password = ''; //don't send the password with the token --> security
                    var token = jwt.sign(user, app.get('secret'), {
                        expiresIn: 86400 //expires in 24h
                    });

                    return next(null, token);
                }
            });
        });
    }

    return {
        registerUser: registerUser,
        getUsers: getUsers,
        getAllUserData: getAllUserData,
        authenticateUser: authenticateUser,
        getUserConnections: getUserConnections
    }
})();

module.exports = UserController;

