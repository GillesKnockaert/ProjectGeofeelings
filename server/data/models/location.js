/**
 * Created by Frederic on 26/12/2015.
 */

var mongoose = require('mongoose');
var LocationSchema = require('../schemas/location');

var Location = mongoose.model('Location', LocationSchema,'locations');

module.exports = Location;