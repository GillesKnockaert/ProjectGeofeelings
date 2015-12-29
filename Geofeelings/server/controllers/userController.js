/*controller that controls the different endpoints for the User model*/

var userController = function(User, jwt){

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

        //korter
        //var user = new User(req.body);

        //langer: nieuwe User maken met variabelen uit body
        var user = new User({
            name: req.body.name,
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
        /*
        User.findById(user_id, function(err,user){
            if(err){
                res.status(500).json({message: 'Could not find user'});
                return;
            }
            res.json(user);
        });
        */

        User.findById(user_id)
            .populate('connections status')
            .exec(function(err,user){
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
        var app = require('../../server');
        //kijken of er een user name en password is doorgestuurd
        if(!req.body.name || !req.body.password){
            res.json({ success: false, message: 'Error processing the request' });
            return;
        }

        //user opzoeken in de DB obv doorgestuurde user name
        User.findOne({name: req.body.name}, function(err, user){
            if(!user){
                res.json({success: false, message: 'Authentication failed. User doesn\'t exists'});
                return;
            }

            //user gevonden
            //checken of het password van de user overeen komt met het doorgestuurde password
            user.verifyPassword(req.body.password, function(err, isMatch){
                if(err){
                    res.json({message: err});
                    return;
                } else if(!isMatch){
                    res.json({success: false, message: "Authentication failed. Wrong password."});
                } else {
                    //de gebruiker is gevonden en het paswoord is juist
                    //token aanmaken
                    var token = jwt.sign(user, app.get('secret'), {
                        expiresIn: 86400 //expires in 24h
                    });

                    //return the information including token as JSON
                    res.json({
                        success: true,
                        message: "User authenticated. Enjoy your token!",
                        token : token
                    });
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

