var express = require('express');
//var router = express.Router();
//var userController = require('../controllers/userController');
/*
router.route('/')
    .post(userController.authenticateUser);

module.exports = router;
*/
//test
var routes = function(User,jwt){
    var authRouter = express.Router();
    var userController = require('../controllers/userController')(User, jwt);

    authRouter.route('/')
        .post(userController.authenticateUser);

    return authRouter;  //--> niet vergeten!
}

module.exports = routes;