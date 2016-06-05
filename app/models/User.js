/**
 * Created by kevinhuron on 01/06/2016.
 */
// app/models/articles.js
// grab the mongoose module
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
// define our nerd model
// module.exports allows us to pass this to other files when it is called
/*module.exports = mongoose.model('Articles', {
 ida             : Number,
 titleA          : String,
 shortDescA      : String,
 longDescA       : String,
 contentA        : String,
 idU             : Number
 });*/

//var db = require('../../config/db');
// define our nerd model
// module.exports allows us to pass this to other files when it is called
var User = mongoose.Schema;
var usersShcema = new User({
    idU         : Number,
    lastname    : String,
    firstname   : String,
    mail        : String,
    passwd      : String,
    accessLvl   : String
});

// methods ======================
// generating a hash
usersShcema.methods.createHash = function(passwd) {
    return bcrypt.hashSync(passwd, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
usersShcema.methods.validPassword = function(passwd) {
    return bcrypt.compareSync(passwd, this.passwd);
};

/*usersShcema.methods.validPassword = function (password, cb) {
    return this.model('User').findOne(
        {
            mail: this.mail,
            passwd: password
        },
        function (err, row) {
            if (row) {
                cb(true);
            } else {
                cb(false);
            }
        });
};*/

module.exports = mongoose.model('User', usersShcema );