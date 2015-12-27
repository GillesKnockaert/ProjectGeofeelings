var express = require('express');
//var router = express.Router();
//var statusController = require('../controllers/statusController');
//var authController = require('../controllers/auth');

/*
router.route('/')
    .post(authController.isAuthenticated, statusController.postStatus)
    .get(statusController.getStatuses);

router.route('/:status_id')
    .get(authController.isAuthenticated, statusController.getStatus)
    .put(authController.isAuthenticated, statusController.putStatus)
    .delete(authController.isAuthenticated, statusController.deleteStatus);

module.exports = router;
*/

//test
var routes = function(User, Status){
    var statusRouter = express.Router();
    var authController = require('../controllers/auth')(User);
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