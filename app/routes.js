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

    /** Sign UP **/
    app.post('/api/inscription', passport.authenticate('local-signup', {
        successRedirect : '/signupSuccess',
        failureRedirect : '/signupFailure',
        failureFlash : true
    })); /** POST on /api/inscription **/

    /** IF failed send non ok to show error msg in client **/
    app.get('/signupFailure', function(req, res) {
        res.send('NONOK');
    });

    /** IF not failed send ok to show confirm msg in client **/
    app.get('/signupSuccess', function(req, res) {
        res.send('OK');
    });

    /** Login **/
    app.post('/api/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/',
        failureFlash : true
    })); /** POST on /api/login **/

    /** IF failed send non ok to show error msg in client **/
    /*app.get('/loginFailure', function(req, res) {
        res.send('NONOK');
    });*/

    /** IF not failed send ok to show confirm msg in client **/
    /*app.get('/loginSuccess', function(req, res) {
        res.send('OK');
    });*/


    /** Logout **/
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



    app.get('/api/profile', function(req, res) {
        console.log(req);
        console.log('user = ' + req.user);
        console.log('users = ' + req.users);
        console.log('session = ' + req.session);
        console.log('session.user = ' + req.session.user);
        console.log('sessions = ' + req.sessions);
        console.log('req.sercret = ' + req.secret);
        console.log('passport = ' + passport);
        console.log('passport.user = ' + passport.user);
        console.log('passport.users = ' + passport.users);
        console.log('req._passport.session = ' + req._passport.session);

        res.json({ users : req._passport.session });
    });






    app.get('*', function(req, res) {
        //console.log(req);
        res.render('index.html', { users : 'test' });
        //res.sendfile('./public/index.html');
    });
};

/** route middleware to make sure a user is logged in **/
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/login');
}