/**
 * Created by kevinhuron on 25/05/2016.
 */
// app/routes.js

var Articles = require('./models/articles');
var User = require('./models/User');

module.exports = function(app, passport) {
    /** All article in blog page **/
    app.get('/api/blog', function(req, res) {
        Articles.find(function(err, articles) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json(articles);
        });
    }); /** get on /api/blog **/

    /** 4 last articles in home page **/
    app.get('/api/home/article', function(req, res) {
        Articles.find().sort([['idA', -1]]).limit(4).exec(function(err, articles) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json(articles);
        });
    }); /** get on /api/home/article **/

    /** one article in article page **/
    app.get('/api/blog/article/:idA', function(req, res) {
        Articles.findOne({'idA': parseInt(req.params.idA)},function(err, article) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            //console.log('id : ' + req.params.idA);
            res.json(article);
        });
    }); /** get on /api/blog/article/:id **/

    /** inscription user **/
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
    }); /** post on /api/inscription/ **/






    /** Login **/
    app.get('/api/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    /** get on /api/login **/

    /** Logout **/
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /** route middleware to make sure a user is logged in **/
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();
        // if they aren't redirect them to the home page
        res.redirect('/login');
    }






    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};