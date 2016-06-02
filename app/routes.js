/**
 * Created by kevinhuron on 25/05/2016.
 */
// app/routes.js

// grab the nerd model we just created
var Articles = require('./models/articles');
var Users = require('./models/users');

module.exports = function(app) {

    app.get('/api/blog', function(req, res) {
        Articles.find(function(err, articles) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json(articles); // return all nerds in JSON format
        });
    });

    app.get('/api/blog/article/:idA', function(req, res) {
        Articles.findOne({'idA': parseInt(req.params.idA)},function(err, article) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            //console.log('id : ' + req.params.idA);
            res.json(article);
        });
    });

    app.get('/api/inscription/', function(req, res) {
        console.log(req);
        Users.save(req,function(err, user) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            //res.json(user);
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};