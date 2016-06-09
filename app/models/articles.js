/**
 * Created by kevinhuron on 25/05/2016.
 */
var mongoose = require('mongoose');

/*var Comentaires = mongoose.Schema;
var comSchema = new Comentaires({
    authorFirstname : String,
    authorLastname  : String,
    dateCom         : String,
    contentCom      : String
});*/

var Articles = mongoose.Schema;
var articlesShcema = new Articles({
    idA             : Number,
    titleA          : String,
    shortDescA      : String,
    longDescA       : String,
    contentA        : String,
    date            : String,
    img             : String,
    author          : {
        lastname    : String,
        firstname   : String,
        mail        : String
    },
    commentaires    : [{
        authorFirstname : String,
        authorLastname  : String,
        dateCom         : String,
        contentCom      : String}]
});



module.exports = mongoose.model('mean', articlesShcema, 'Articles');