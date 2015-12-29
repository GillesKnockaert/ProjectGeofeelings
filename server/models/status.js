//Load mongoDB driver
var mongoose = require('mongoose');
var StatusSchema = require('../schemas/status');

var Status = mongoose.model('Status', StatusSchema, 'status');


//bind the Status model to the statusSchema
module.exports = Status;