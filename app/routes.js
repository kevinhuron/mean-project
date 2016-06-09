/**
 * Created by kevinhuron on 25/05/2016.
 */
// app/routes.js

var Articles = require('./models/articles');
var User = require('./models/User');
var bcrypt   = require('bcrypt-nodejs');
var multer  = require('multer');
var moment  = require('moment');
var path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/article/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage });
var uploadFile = upload.single('img');

module.exports = function(app, passport, multer) {
    /**************** article blog ****************/
    app.get('/api/blog', function(req, res) {
        Articles.find(function(err, articles) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({ articles: articles, user: req.user});
        });
    });
    /************** End article blog *************/

    /**************** article home ****************/
    app.get('/api/home/article', function(req, res) {
        Articles.find().sort([['idA', -1]]).limit(4).exec(function(err, articles) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({ articles: articles, user: req.user});
        });
    });
    /************** End article home **************/

    /****************** article page ******************/
    app.get('/api/blog/article/:idA', function(req, res) {
        Articles.findOne({'idA': parseInt(req.params.idA)},function(err, article) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({ article: article, user: req.user});
        });
    });
    /****************** End article page ******************/

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

    /**************** Update Profile ****************/
    app.put('/api/updateUser', isLoggedIn, function(req, res) {
        var updateData;
        if (typeof req.body.password !== 'undefined' && req.body.password)
            updateData = {"local.firstname":(req.body.lastname).toString(), "local.lastname":(req.body.firstname).toString(), "local.mail":req.body.mail, "local.accessLvl":"abonne", "local.passwd":generateHash((req.body.password).toString())};
        else
            updateData = {"local.firstname":(req.body.lastname).toString(), "local.lastname":(req.body.firstname).toString(), "local.mail":req.body.mail, "local.accessLvl":"abonne"};
        User.findOneAndUpdate({'local.mail': req.user.local.mail}, updateData, function(err, user) {
            if (err) throw err;
            console.log(user);
            res.json("OK");
        });
    });
    /**************** End Update Profile ****************/

    /********** newArticle page for last id **********/
    app.get('/api/newArticle', function(req, res){
        Articles.find().sort([['idA', -1]]).limit(1).exec(function(err, articles) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({ articles: articles });
        });
    });
    /******** End newArticle page for last id **********/

    /**************** newArticle ****************/
    app.post('/api/newArticle', function(req, res) {
        uploadFile(req, res, function (err) {
            console.log(req.file);
            if (err)
                console.log(err);
            var articleData;
            var lastId = (parseInt(req.body.lastId) + 1);
            if (typeof req.file !== 'undefined' && req.file) {
                articleData = {"idA":parseInt(lastId),"titleA":(req.body.titleA).toString(),
                    "longDescA":(req.body.longDescA).toString(),
                    "contentA":(req.body.contentA).toString(),
                    "date":(moment().format('L')).toString(),
                    "img":(req.file.filename).toString(),
                    "author":{"firstname" : (req.user.local.firstname).toString(),
                        "lastname" : (req.user.local.lastname).toString(),
                        "mail" : (req.user.local.mail).toString()}};
            } else {
                articleData = {"idA":parseInt(lastId),"titleA":(req.body.titleA).toString(),
                    "longDescA":(req.body.longDescA).toString(),
                    "contentA":(req.body.contentA).toString(),
                    "date":(moment().format('L')).toString(),
                    "img":"",
                    "author":{"firstname" : (req.user.local.firstname).toString(),
                        "lastname" : (req.user.local.lastname).toString(),
                        "mail" : (req.user.local.mail).toString()}};
            }
            console.log(articleData);
            /** create the article **/
            var newArticle = new Articles(articleData);

            /** save the user **/
            newArticle.save(function (err) {
                if (err)
                    throw err;
                res.status(204).redirect('/profile');
            });
        });
    });
    /**************** End newArticle ****************/



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