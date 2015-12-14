//Load mongoDB driver
var mongoose = require('mongoose');

//define our status schema
var StatusSchema = new mongoose.Schema({
    longitude: Number,
    latitude: Number,
    message: String,
    userId: String
});

//bind the Status model to the LocationSchema
module.exports = mongoose.model('Status', StatusSchema);