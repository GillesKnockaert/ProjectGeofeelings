/**
 * Created by Frederic on 29/11/2015.
 */
var express = require('express');
var router = express.Router();

/* GET helloworld page. */
// a middleware sub-stack which handles GET requests to /helloworld
router.get('/', function(req, res, next) {
    res.render('helloworld', {title: 'Hello, World'});
});

module.exports = router;