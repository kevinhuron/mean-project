/**
 * Created by kevinhuron on 01/06/2016.
 */
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var User = mongoose.Schema;
var usersShcema = new User({
    //idU         : Number,
    /*lastname    : String,
    firstname   : String,
    mail        : String,
    passwd      : String,
    accessLvl   : String*/
    local            : {
        lastname    : String,
        firstname   : String,
        mail        : String,
        passwd      : String,
        accessLvl   : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    }
});

usersShcema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
usersShcema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.passwd);
};

module.exports = mongoose.model('User', usersShcema );