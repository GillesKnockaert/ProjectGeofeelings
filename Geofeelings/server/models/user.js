/**
 * Created by Frederic on 26/12/2015.
 */

var mongoose = require("mongoose");
var UserSchema = require("../schemas/user");

var User = mongoose.model('User', UserSchema,'users');  //model-schema-collection
//default collection = model + "s"

//Dataaccessors met callbacks => in repository

module.exports = User; //niet vergeten!!!