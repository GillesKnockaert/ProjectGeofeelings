/**
 * Created by Frederic on 3/12/2015.
 */

var express = require('express');
var router = express.Router();

/* GET instructions page. */
// a middleware sub-stack which handles GET requests to /instructions
router.get('/', function(req, res, next) {
    res.sendfile('views/instructions.html');
});

module.exports = router;