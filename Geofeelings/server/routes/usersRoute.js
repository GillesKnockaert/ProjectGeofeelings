var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var authController = require('../controllers/auth');


router.route('/')
    .post(userController.postUser)
    .get(authController.isAuthenticated, userController.getUsers);

router.route('/:user_id')
    .get(userController.getUser);

module.exports = router;