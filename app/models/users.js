/**
 * Created by kevinhuron on 01/06/2016.
 */
// app/models/articles.js
// grab the mongoose module
var mongoose = require('mongoose');

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
var users = mongoose.Schema;
var usersShcema = new users({
    idU         : Number,
    lastname    : String,
    firstname   : String,
    mail        : String,
    passwd      : String,
    accessLvl   : Number
});

module.exports = mongoose.model('User', usersShcema );