/*controller that controls the different endpoints for the User model*/

//load required packages
//var User = require('../models/user').userModel;
/*
//region GET Users =============================================================
//create endpoint /api/users for GET
exports.getUsers = function(req, res){
    User.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
};
//endregion

//region POST Users ===============================================================
//create endpoint /api/users for POST
exports.postUser = function(req, res){
    if(!req.body.name || !req.body.password || !req.body.email){
        res.json({message: 'Error processing the request'});
        return;
    }

    //korter
    //var user = new User(req.body);

    //langer
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save(function(err){
        if(err){
            res.status(500).json({message: 'User might already exist'});
            return;
        }
        res.status(201).json({succes: 'New user added'});
    });
};

//endregion

//region GET a single user
exports.getUser = function(req, res){
    var user_id = req.params.user_id;

    User.findById(user_id, function(err,user){
        if(err){
            res.status(500).json({message: 'Could not find user'});
            return;
        }
        res.json(user);
    });
};

exports.updateUser = function(req,res){}
//endregion

//region AUTHENTICATE User
exports.authenticateUser = function(req, res){
    if(!req.body.name || !req.body.password || !req.body.email){
        res.json({ message: 'Error processing the request' });
        return;
    }
    User.findOne({name: req.body.name}, function(err, user){
        if(!user){
            res.json({message: 'User doesn\'t exists'});
            return;
        }
        user.verifyPassword(req.body.password, function(err, isMatch){
            if(err){
                res.json({message: err});
                return;
            } else if(!isMatch){
                res.json({message: "Wrong password."});
            } else {
                res.json({success: "authenticated!"});
            }
        });
    });
};

//endregion
*/
//test
var userController = function(User){
    var postUser = function(req, res){

        if(!req.body.name){
            res.status(400);
            res.send('Name is required');
            return;
        }
        if(!req.body.password){
            res.status(400);
            res.send('Password is required');
            return;
        }
        if(!req.body.email){
            res.status(400);
            res.send('Email is required');
            return;
        }
        //korter
        //var user = new User(req.body);

        //langer: nieuwe User maken met variabelen uit body
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });


        user.save(function(err){
            if(err){
                res.status(500).json({message: 'User might already exist'});
                return;
            }
            res.status(201);
            res.send(user);
            //res.send.json({succes: 'New user added'});
        });
    }

    var getUsers = function(req,res){
        User.find(function(err, users){
            if(err){
                res.send(err);
            }
            res.json(users);
        });
    }

    var getUser = function(req,res){
        var user_id = req.params.user_id;

        User.findById(user_id, function(err,user){
            if(err){
                res.status(500).json({message: 'Could not find user'});
                return;
            }
            res.json(user);
        });
    }

    var updateUser = function(req,res){

    }

    var authenticateUser = function(req,res){
        if(!req.body.name || !req.body.password || !req.body.email){
            res.json({ message: 'Error processing the request' });
            return;
        }
        User.findOne({name: req.body.name}, function(err, user){
            if(!user){
                res.json({message: 'User doesn\'t exists'});
                return;
            }
            user.verifyPassword(req.body.password, function(err, isMatch){
                if(err){
                    res.json({message: err});
                    return;
                } else if(!isMatch){
                    res.json({message: "Wrong password."});
                } else {
                    res.json({success: "authenticated!"});
                }
            });
        });
    }

    return {
        postUser: postUser,
        getUsers: getUsers,
        getUser: getUser,
        authenticateUser: authenticateUser
    }
}

module.exports = userController;

