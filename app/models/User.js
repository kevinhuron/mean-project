/**
 * Created by kevinhuron on 01/06/2016.
 */
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var User = mongoose.Schema;
var usersShcema = new User({
    idU         : Number,
    lastname    : String,
    firstname   : String,
    mail        : String,
    passwd      : String,
    accessLvl   : String
});

/** hash password **/
usersShcema.methods.createHash = function(passwd) {
    return bcrypt.hashSync(passwd, bcrypt.genSaltSync(8), null);
};

/** checking if password is valid **/
usersShcema.methods.validPassword = function(passwd) {
    return bcrypt.compareSync(passwd, this.passwd);
};

module.exports = mongoose.model('User', usersShcema );