/**
 * Created by Frederic on 29/11/2015.
 */
var express = require('express');
var router = express.Router();

/* GET test page. */
// a middleware sub-stack which handles GET requests to /test
router.get('/', function(req, res, next) {
    res.render('test');
});

module.exports = router;