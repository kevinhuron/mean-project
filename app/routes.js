/**
 * Created by kevinhuron on 25/05/2016.
 */
// app/routes.js

// grab the nerd model we just created
var Articles = require('./models/articles');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.get('/api/blog', function(req, res) {
        Articles.find(function(err, articles) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json(articles); // return all nerds in JSON format
        });
    });

    app.get('/api/blog/article/', function(req, res) {
        console.log('shfghjebvfiu');
        Articles.findOne({idA: res},function(err, article) {
            if (err) {
                res.send(err);
                console.log(err);
            }

            console.log('id : ' + res.idA);
            //res.json(article); // return all nerds in JSON format
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });
};