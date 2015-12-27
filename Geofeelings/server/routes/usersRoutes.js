var express = require('express');

//var router = express.Router();
//var userController = require('../controllers/userController');
//var authController = require('../controllers/auth');

/*
router.route('/')
    .post(userController.postUser)
    .get(authController.isAuthenticated, userController.getUsers);

router.route('/:user_id')
    .get(userController.getUser);

module.exports = router;
*/

var routes = function(User){
    var userRouter = express.Router();
    var userController = require('../controllers/userController')(User);
    var authController = require('../controllers/auth')(User);

    userRouter.route('/')
        .post(userController.postUser)
        //.get(authController.isAuthenticated, userController.getUsers);
        .get(userController.getUsers);

    userRouter.route('/:user_id')
        .get(userController.getUser)
        //.put(userController.putUser);
        //.delete(userController.);


    return userRouter;
}

module.exports = routes;