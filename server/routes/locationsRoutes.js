/**
 * Created by Frederic on 26/12/2015.
 */

var express = require('express');

var routes = function(Location){
    var locationRouter = express.Router();
    var locationController = require('../controllers/locationController')(Location);

    locationRouter.route('/')
        .post(locationController.postLocation);

    return locationRouter;
}

module.exports = routes;

