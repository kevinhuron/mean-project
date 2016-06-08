/**
 * Created by kevinhuron on 25/05/2016.
 */
// app/routes.js

var Articles = require('./models/articles');
var User = require('./models/User');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(app, passport) {
    /** All article in blog page **/
    app.get('/api/blog', function(req, res) {
        Articles.find(function(err, articles) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({ articles: articles, user: req.user});
        });
    }); /** get on /api/blog **/

    /** 4 last articles in home page **/
    app.get('/api/home/article', function(req, res) {
        Articles.find().sort([['idA', -1]]).limit(4).exec(function(err, articles) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({ articles: articles, user: req.user});
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
            res.json({ article: article, user: req.user});
        });
    }); /** get on /api/blog/article/:id **/

    /****************** Sign UP ******************/
    app.post('/api/inscription', passport.authenticate('local-signup', {
        successRedirect : '/successSignUp',
        failureRedirect : '/failureSignUp',
        failureFlash : true
    }));
    app.get('/successSignUp', function(req, res) {
        res.json({ message: 'OK' });
    });

    app.get('/failureSignUp', function(req, res) {
        res.json({ message: 'NOK' });
    });
    /****************** End Sign UP **************/

    /****************** Login ********************/
    app.post('/api/login', passport.authenticate('local-login', {
        successRedirect : '/successLogJson',
        failureRedirect : '/failureLogJson',
        failureFlash : true
    }));

    app.get('/successLogJson', function(req, res) {
        res.json({ message: 'OK' });
    });

    app.get('/failureLogJson', function(req, res) {
        res.json({ message: 'NOK' });
    });
    /**************** End Login ****************/

    /**************** Logout ******************/
    app.get('/api/logout', function(req, res) {
        req.logOut();
        res.redirect('/');
    });
    /**************** End Logout **************/

    /**************** Profile ****************/
    app.get('/api/profile', isLoggedIn, function(req, res) {
        Articles.find({'author.mail': req.user.local.mail},function(err, article) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({ article: article, user: req.user});
        });
    });
    /************** End Profile **************/

    app.put('/api/updateUser', isLoggedIn, function(req, res) {
        var updateData;
        console.log(req.body.password);
        if (typeof req.body.password !== 'undefined' && req.body.password)
            updateData = {"local.firstname":(req.body.lastname).toString(), "local.lastname":(req.body.firstname).toString(), "local.mail":req.body.mail, "local.accessLvl":"abonne", "local.passwd":generateHash((req.body.password).toString())};
        else
            updateData = {"local.firstname":(req.body.lastname).toString(), "local.lastname":(req.body.firstname).toString(), "local.mail":req.body.mail, "local.accessLvl":"abonne"};
        console.log(updateData);
        console.log(updateData);
        User.findOneAndUpdate({'local.mail': req.user.local.mail}, updateData, function(err, user) {
            if (err) throw err;
            console.log(user);
            res.json("OK");
        });
    });






    app.get('*', function(req, res) {
        res.render('index.html', { users : req.user });
        //res.sendfile('./public/index.html');
    });
};

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
/** route middleware to make sure a user is logged in **/
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}