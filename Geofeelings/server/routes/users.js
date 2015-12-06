var express = require('express');
var router = express.Router();

/* GET users listing. */
// a middleware sub-stack which handles GET requests to /user/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/userlist', function(req, res, next) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{}, function(e, docs){
        res.render('userlist',{
            "userlist" : docs
        });
    });

    //res.render('helloworld', {title: 'Hello, World'});
});

/* GET new user. */
router.get('/newuser', function(req, res, next) {
  res.render('newuser',{title: "Add New User"});
});

/* POST to Add User Service */
router.post('/adduser', function(req, res){
   //interne db variabele instellen
    var db = req.db;

    //de form waarden ophalen (afhankelijk van 'name' attributes)
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    //de collectie instellen
    var collection = db.get('usercollection');

    //in de DB submitten
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function(err, doc) {
        if (err) {
            //als er fout is opgetreden, geef een error terug
            res.send('Er is iets fout gelopen bij het toevoegen van de info aan de DB');
        }
        else {
            //doorsturen naar success page
            res.redirect("userlist");
        }
    });
});


module.exports = router;
