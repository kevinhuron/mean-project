/**
 * Created by kevinhuron on 25/05/2016.
 */
// app/routes.js

var Articles = require('./models/articles');
var User = require('./models/User');

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

    app.post('/api/inscription/', function(req, res) {
        var user = {
            'lastname':     req.body.lastname,
            'firstname':    req.body.firstname,
            'mail':         req.body.mail,
            'passwd':       req.body.passwd,
            'accessLvl':    "abonne"
        };
        // validation
        User.findOne({ mail: req.body.mail }, function (err, userfind) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            if (userfind) { // mail already exists
                res.json("NOK");
            } else {
                User.create(user,function(err, user) {
                    if (err) {
                        res.send(err);
                        console.log(err);
                    }
                    res.json(user);
                });
            }
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};