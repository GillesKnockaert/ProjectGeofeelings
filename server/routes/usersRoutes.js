var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');
var util = require('util');
var expressJwt = require('express-jwt');

router.route('/register')
    .post(function (req, res, next) {
        userController.registerUser(req, res, function (error, user) {
            if (error) {
                console.log("Error registering user");
                //res.send('There have been registering errors: ' + util.inspect(error), 400);
                return next(error);
            }

            console.log("Success registering user");
            //res.send('Success registering new user: ' + util.inspect(user), 201);
            res.status(201).json({
                status: 201,
                data: user
            });

        });
    });


router.route('/login')
    .post(function (req, res, next) {
        userController.authenticateUser(req, res, function (error, token) {
            if (error) {
                console.log("Error logging in user");
                //res.send('There has been an error logging in: ' + util.inspect(error), 400);
                return next(error);
            }

            console.log("Success logging in user");
            //res.send('Success logging in user: ' + util.inspect(user), 201);
            res.status(200).json({
                status: 200,
                data : token
            });

        });
    });

router.route('/')
    .get(authController.authenticateReq, authController.isAdmin, function (req, res) {

        userController.getUsers(function (error, users) {
            if (error) {
                res.json(error);
            }

            res.json(users);
        });
    });

/*
 var routes = function (User, jwt, app) {
 var userRouter = express.Router();
 var userController = require('../controllers/userController')(User);
 var authController = require('../controllers/authController')(User);
 var expressJWT = require('express-jwt');
 var util = require('util');

 userRouter.route('/')
 //.post(userController.registerUser)
 //.get(authController.isAuthenticated, userController.getUsers);
 .get(expressJWT({secret: app.get('secret')}), userController.getUsers);

 userRouter.route('/:user_id')
 .get(userController.getUser);
 //.put(userController.putUser);
 //.delete(userController.);


 });


 return userRouter;
 };
 */

module.exports = router;