/**
 * Created by Frederic on 26/12/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [Number]
    },
    name: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

LocationSchema.index({location: '2dsphere'});

module.exports = LocationSchema;