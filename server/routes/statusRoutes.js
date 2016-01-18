var express = require('express');
var router = express.Router();
var statusController = require('../controllers/statusController');
var authController = require('../controllers/authController');


router.route('/')
    .post(function (req, res, next) {
        authController.authenticateReq, statusController.postStatus(req, res, function (error, status) {
            if (error) {
                console.log("Error saving status");
                //res.send('There has been an error logging in: ' + util.inspect(error), 400);
                return next(error);
            }

            console.log("Success saving status");
            //res.send('Success logging in user: ' + util.inspect(user), 201);
            res.status(201).json({
                status: 201,
                data: status
            });
        });
    })
    //.get(statusController.getStatuses);

//router.route('/:status_id')
    //.get(authController.authenticateReq, statusController.getStatus)
    //.put(authController.authenticateReq, statusController.putStatus)
    //.delete(authController.authenticateReq, statusController.deleteStatus);

module.exports = router;


//test
/*
 var routes = function(User, Status){
 var statusRouter = express.Router();
 var authController = require('../controllers/authController')(User);
 var statusController = require('../controllers/statusController')(User, Status);

 statusRouter.route('/')
 .post(authController.isAuthenticated, statusController.postStatus)
 .get(statusController.getStatuses);

 statusRouter.route('/:status_id')
 .get(authController.isAuthenticated, statusController.getStatus)
 .put(authController.isAuthenticated, statusController.putStatus)
 .delete(authController.isAuthenticated, statusController.deleteStatus);

 return statusRouter;
 }

 module.exports = routes;
 */
