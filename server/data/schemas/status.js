/**
 * Created by Frederic on 26/12/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatusSchema = new mongoose.Schema({
    _creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isHappy: Boolean,
    message: String,
    createdOn:{
        type: Date,
        default: Date.now()
    },
    _location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    }
});

module.exports = StatusSchema;