/**
 * Created by kevinhuron on 25/05/2016.
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
var articles = mongoose.Schema;
var articlesShcema = new articles({
    ida             : Number,
    titleA          : String,
    shortDescA      : String,
    longDescA       : String,
    contentA        : String,
    idU             : Number,
    author          : [{
        lastname    : String,
        firstname   : String,
        mail        : String
    }]
});

module.exports = mongoose.model('mean', articlesShcema, 'Articles');