var express = require('express');
var router = express.Router();

/* GET home page. */
// a middleware sub-stack which handles GET requests to /
router.get('/home', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.sendFile('views/index.html');
  res.render('home');

});

module.exports = router;
