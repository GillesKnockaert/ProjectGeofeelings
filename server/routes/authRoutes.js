

var routes = function(User,jwt){
    var express = require('express');
    var authRouter = express.Router();
    var userController = require('../controllers/userController')(User, jwt);

    authRouter.route('/')
        .post(userController.authenticateUser);

    return authRouter;  //--> niet vergeten!
}

module.exports = routes;