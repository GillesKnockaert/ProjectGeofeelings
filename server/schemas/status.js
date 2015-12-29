/**
 * Created by Frederic on 26/12/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statusSchema = mongoose.Schema({
    _creator: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    mood: String,
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

module.exports = statusSchema;