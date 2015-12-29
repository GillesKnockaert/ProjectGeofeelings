var express = require('express');

var routes = function(User, jwt, app){
    var userRouter = express.Router();
    var userController = require('../controllers/userController')(User);
    var authController = require('../controllers/authController')(User);
    var expressJWT = require('express-jwt');
    /*
    userRouter.use(function(req,res,next){
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('secret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
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
    });
    */

    userRouter.route('/')
        .post(userController.postUser)
        //.get(authController.isAuthenticated, userController.getUsers);
        .get(expressJWT({secret: app.get('secret')}), userController.getUsers);

    userRouter.route('/:user_id')
        .get(userController.getUser)
        //.put(userController.putUser);
        //.delete(userController.);


    return userRouter;
}

module.exports = routes;