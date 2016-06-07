/**
 * Created by kevinhuron on 25/05/2016.
 */
// app/routes.js

var Articles = require('./models/articles');
var User = require('./models/User');

module.exports = function(app, passport) {
    /** All article in blog page **/
    app.get('/api/blog', function(req, res) {
        console.log(req);
        console.log('user = ' + req.user);
        console.log('users = ' + req.users);
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
        console.log(req);
        console.log('user = ' + req.user);
        console.log('users = ' + req.users);
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
    app.post('/api/inscription', function(req, res, next ) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) { return next(err) }
            if (!user) { return res.json({ message: info.message, type: info.type }) }
            res.json(user);
        })(req, res, next);
    }); /** post on /api/inscription **/

    /** Login **/
    app.post('/api/login', function(req, res, next ) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return next(err) }
            if (!user) { return res.json( { message: info.message, type: info.type }) }
            res.json(user);
        })(req, res, next);
    }); /** post on /api/login **/

    /** Logout **/
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });/** get on Logout **/



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