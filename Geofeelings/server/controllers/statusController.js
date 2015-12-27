/*statuscontroller.js
* --> controller that controls the different endpoints for the Status model*/
/*
//Load Status model
var Status = require('../models/status');
var User = require('../models/user').userModel;
var mongoose = require('../../node_modules/mongoose');


//region POST status
//create endpoint /api/status for POSTS
exports.postStatus = function(req, res){
    //create a new instance of the status model
    var status = new Status();

    //Set the Status properties that came from the POST data
    console.log(req.body.message);
    console.log(req.body.latitude);
    console.log(req.body.longitude);

    status.longitude = req.body.longitude;
    status.latitude = req.body.latitude;
    status.message = req.body.message;

    //passport will automatically set the user in req.user
    status.userId = req.user._id;

    //save the status and check for errors
    status.save(function(err){
        if(err){
            res.send(err);
            return;
        }

        res.json({
            success: 'Status added succesfully',
            data: status
        });
    });
};
//endregion

//region GET status
//create endpoint /api/status for GET
exports.getStatuses = function(req, res){
    //use the Status model to find all statuses
    //from a particular user with their username
    Status.find({}).lean().exec(function(err, statuses){
        if(err){
            res.send(err);
            return;
        }

        //We want to set the username on each status by looking
        //up the userId in the User documents.
        //
        //Because of mongoose asynchronism, we will have to wait
        //to get all the results from the queries on the User model
        //We can send them when we have iterated
        //through every status (counter === l)

        var counter = 0;
        var l = statuses.length;

        //create a closure to have access to the status
        var closure = function(status){
            return function(err, user){
                counter++;

                if(err){
                    res.send(err);
                }

                status.username = user.name;

                //when all the users have been set
                if(counter === l){
                    //respond
                    res.json(statuses);
                    return;
                }
            };
        };
        //We iterate through all statuses to find their associated
        //username.
        for (var i = 0; i < l; i++) {
            User.findById(statuses[i].userId, closure(statuses[i]));
        }
    });
};
//endregion

//region GET a single status
//create endpoint /api/statuses/:status_id for GET
exports.getStatus = function(req, res){
    //use the status model to find a specific status
    console.log(req.user._id);
    Status.find({
        userId: req.user._id,
        _id: req.params.status_id
    }, function(err, status){
        if(err){
            res.send(err);
        }
        res.json(status);
    });
};
//endregion

//region UPDATE a single status
//create endpoint /api/statuses/:status_id for PUT
exports.putStatus = function(req,res){
    //use the Status model to find a specific status
    Status.update({
        userId: req.user._id,
        _id: req.params.status_id
    },{
        message: req.body.message
    }, function(err, num, raw){
        if(err){
            res.send(err);
        }
        res.json({
            message: 'message updated'
        });
    });
};
//endregion

//region DELETE a single status
// Create endpoint /api/statuses/:status_id for DELETE
exports.deleteStatus = function(req, res) {
    // Use the Status model to find a specific status and remove it
    Status.remove({
        userId: req.user._id,
        _id: req.params.status_id
    }, function(err) {
        if (err)
            res.status(500).send(err);

        res.status(204).json({
            message: 'Status deleted'
        });
    });
};
*/
//test
var statusController = function(User, Status){
    //var ObjectId = require('mongoose').Types.ObjectId;

    var postStatus = function(req, res){
        //create a new instance of the status model
        var status = new Status();

        //Set the Status properties that came from the POST data

        status.mood = req.body.mood;
        status.message = req.body.message;

        //passport will automatically set the user in req.user
        status._creator = req.user._id;

        //save the status and check for errors
        status.save(function(err){
            if(err){
                res.send(err);
                return;
            }

            res.json({
                success: 'Status added succesfully',
                data: status
            });
        });
    }

    var getStatuses = function(req, res){
        //use the Status model to find all statuses
        //from a particular user with their username
        Status.find({}).lean().exec(function(err, statuses){
            if(err){
                res.send(err);
                return;
            }

            //We want to set the username on each status by looking
            //up the userId in the User documents.
            //
            //Because of mongoose asynchronism, we will have to wait
            //to get all the results from the queries on the User model
            //We can send them when we have iterated
            //through every status (counter === l)

            var counter = 0;
            var l = statuses.length;

            //create a closure to have access to the status
            var closure = function(status){
                return function(err, user){
                    counter++;

                    if(err){
                        res.send(err);
                    }

                    status.username = user.name;

                    //when all the users have been set
                    if(counter === l){
                        //respond
                        res.json(statuses);
                        return;
                    }
                };
            };
            //We iterate through all statuses to find their associated
            //username.
            for (var i = 0; i < l; i++) {
                User.findById(statuses[i].userId, closure(statuses[i]));
            }
        });
    }

    var getStatus = function(req, res){
        //use the status model to find a specific status

        var status_id = req.params.status_id;
        //console.log(status_id);
        //console.log(req.user._id); ---> je kan enkel statussen opvragen als jij (user) ze gepost hebt

        Status.find({
            userId: req.user._id,
            _id: status_id
        }, function(err, status){
            if(err){
                res.send(err);
            }
            res.json(status);
        });
    }

    var putStatus = function(req, res){
        //use the Status model to find a specific status
        Status.update({
            userId: req.user._id,
            _id: req.params.status_id
        },{
            message: req.body.message
        }, function(err, num, raw){
            if(err){
                res.send(err);
            }
            res.json({
                message: 'message updated'
            });
        });
    }

    var deleteStatus = function(req, res){
        // Use the Status model to find a specific status and remove it
        Status.remove({
            userId: req.user._id,
            _id: req.params.status_id
        }, function(err) {
            if (err)
                res.status(500).send(err);

            res.status(204).json({
                message: 'Status deleted'
            });
        });
    }

    return {
        postStatus: postStatus,
        getStatuses: getStatuses,
        getStatus: getStatus,
        putStatus: putStatus,
        deleteStatus: deleteStatus
    }
}

module.exports = statusController;