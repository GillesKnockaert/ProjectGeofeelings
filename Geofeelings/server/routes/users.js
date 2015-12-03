var express = require('express');
var router = express.Router();

/* GET users listing. */
// a middleware sub-stack which handles GET requests to /
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
