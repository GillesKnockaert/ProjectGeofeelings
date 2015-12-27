/**
 * Created by Frederic on 10/12/2015.
 */

var express = require('express');
var router = express.Router();
var path = require('path');



//region FRONTEND ROUTES ==================================================


//voor alle niet API routes sturen we de gebruiker naar de frontend applicatie
//waar angular de requests kan afhandelen


/* GET home page. */

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../../public/views/index.html'));
});

router.get('/instructions', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../../public/views/instructions.html'));
});

//endregion

module.exports = router;