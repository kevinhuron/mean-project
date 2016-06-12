/**
 * Created by kevinhuron on 25/05/2016.
 */
// app/routes.js

var Articles = require('./models/articles');
var User = require('./models/User');
var bcrypt   = require('bcrypt-nodejs');
var multer  = require('multer');
var moment  = require('moment');
moment.locale('fr');
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
        //var offset = 0;
        //.skip(parseInt(offset)).limit(9).exec(
        Articles.find().sort([['idA', -1]]).exec(function(err, articles) {
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
            res.json({ article: article, user: req.user });
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
        if (req.user.local.mail) {
            Articles.find({'author.mail': req.user.local.mail},function(err, article) {
                if (err) {
                    res.send(err);
                    console.log(err);
                }
                res.json({ article: article, user: req.user});
            });
        } else {
            Articles.find({'author.fbId': req.user.facebook.id},function(err, article) {
                if (err) {
                    res.send(err);
                    console.log(err);
                }
                res.json({ article: article, user: req.user});
            });
        }
    });
    /************** End Profile **************/

    /**************** Update Profile ****************/
    app.put('/api/updateUser', isLoggedIn, function(req, res) {
        var updateData;
        if (req.body.accessLvl == "admin") {
            if (typeof req.body.password !== 'undefined' && req.body.password)
                updateData = {"local.firstname":(req.body.lastname).toString(), "local.lastname":(req.body.firstname).toString(), "local.mail":req.body.mail, "local.accessLvl":"admin", "local.passwd":generateHash((req.body.password).toString())};
            else
                updateData = {"local.firstname":(req.body.lastname).toString(), "local.lastname":(req.body.firstname).toString(), "local.mail":req.body.mail, "local.accessLvl":"admin"};
        } else {
            if (typeof req.body.password !== 'undefined' && req.body.password)
                updateData = {"local.firstname":(req.body.lastname).toString(), "local.lastname":(req.body.firstname).toString(), "local.mail":req.body.mail, "local.accessLvl":"abonne", "local.passwd":generateHash((req.body.password).toString())};
            else
                updateData = {"local.firstname":(req.body.lastname).toString(), "local.lastname":(req.body.firstname).toString(), "local.mail":req.body.mail, "local.accessLvl":"abonne"};
        }
        User.findOneAndUpdate({'local.mail': req.body.mail}, updateData, function(err, user) {
            if (err) throw err;
            console.log(user);
            res.json("OK");
        });
    });
    /**************** End Update Profile ****************/

    /********** newArticle page for last id **********/
    app.get('/api/newArticle', function(req, res) {
        Articles.find().sort([['idA', -1]]).limit(1).exec(function(err, articles) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({ articles: articles, user: req.user });
        });
    });
    /******** End newArticle page for last id **********/

    /**************** newArticle ****************/
    app.post('/api/newArticle', function(req, res) {
        uploadFile(req, res, function (err) {
            console.log(req.user);
            console.log('req.user.local ' + req.user.local);
            console.log(req.file);
            //req.user.local == "" || req.user.local === "" ||
            if (req.user.local.mail) {
                console.log("local");
            } else {
                console.log("facebook");
            }
            if (err)
                console.log(err);
            var articleData;
            var lastId = (parseInt(req.body.lastId) + 1);
            if (typeof req.file !== 'undefined' && req.file) {
                if (req.user.local.mail) {
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
                        "img":(req.file.filename).toString(),
                        "author":{"fbId" : (req.user.facebook.id).toString(),
                            "fbName" : (req.user.facebook.name).toString()}};
                }
            } else {
                if (req.user.local.mail) {
                    articleData = {"idA":parseInt(lastId),"titleA":(req.body.titleA).toString(),
                        "longDescA":(req.body.longDescA).toString(),
                        "contentA":(req.body.contentA).toString(),
                        "date":(moment().format('L')).toString(),
                        "img":"",
                        "author":{"firstname" : (req.user.local.firstname).toString(),
                            "lastname" : (req.user.local.lastname).toString(),
                            "mail" : (req.user.local.mail).toString()}};
                } else {
                    articleData = {"idA":parseInt(lastId),"titleA":(req.body.titleA).toString(),
                        "longDescA":(req.body.longDescA).toString(),
                        "contentA":(req.body.contentA).toString(),
                        "date":(moment().format('L')).toString(),
                        "img":"",
                        "author":{"fbId" : (req.user.facebook.id).toString(),
                            "fbName" : (req.user.facebook.name).toString()}};
                }
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

    /**************** editArticle ****************/
    app.post('/api/editArticle', function(req, res) {
        uploadFile(req, res, function (err) {
            var updateDataArticle;
            if (typeof req.file !== 'undefined' && req.file)
                updateDataArticle = {"titleA":(req.body.titleA).toString(), "longDescA":(req.body.longDescA).toString(), "contentA":(req.body.contentA).toString(), "img":(req.file.filename).toString()};
            else
                updateDataArticle = {"titleA":(req.body.titleA).toString(), "longDescA":(req.body.longDescA).toString(), "contentA":(req.body.contentA).toString()};

            Articles.findOneAndUpdate({'idA': parseInt(req.body.idA)}, updateDataArticle, function(err, com) {
                if (err) throw err;
                console.log(com);
                res.json("OK").redirect('/blog/article/'+req.body.idA);
            });
        });
    });
    /**************** End editArticle ****************/

    /**************** newCommentaire ****************/
    app.put('/api/newCom', function(req, res) {
        console.log(req.body);
        if (req.user.local.mail) {
            var updateData = {"commentaires":{"authorFirstname" : (req.user.local.firstname).toString(),
                "authorLastname" : (req.user.local.lastname).toString(),
                "dateCom" : (moment().format('L')).toString(),
                "contentCom" : (req.body.content).toString()}};
        } else {
            var updateData = {"commentaires":{"fbName" : (req.user.facebook.name).toString(),
                "dateCom" : (moment().format('L')).toString(),
                "contentCom" : (req.body.content).toString()}};
        }
        Articles.findOneAndUpdate({'idA': parseInt(req.body.idA)}, {$push:updateData}, function(err, com) {
            if (err) throw err;
            console.log(com);
            res.json("OK");
        });
    });
    /**************** End newCommentaire ****************/

    /**************** Facebook Login ****************/
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
    /**************** End Facebook Login ****************/

    /**************** users ****************/
    app.get('/api/admin/users/', function(req, res) {
        User.find(function(err, users) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({ users: users, user: req.user});
        });
    });
    /************** End users *************/

    /**************** UserInfo ****************/
    app.get('/api/admin/users/:userMail', function(req, res) {
        User.findOne({'local.mail': (req.params.userMail).toString()},function(err, theuser) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({ theuser: theuser, user: req.user });
        });
    });
    /************** End UserInfo *************/

    /**************** Delete Article ****************/
    app.delete('/api/article/delete/', function(req, res) {
        console.log(req);
        console.log('params ' + req.params);
        console.log('body ' + req.body);
        /*Articles.findOneAndRemove({'idA': parseInt(req.params)}, function(err, com) {
            if (err) throw err;
            console.log(com);
            res.json("OK");
        });*/
    });
    /************** End Delete Article *************/


    app.get('*', function(req, res) {
        res.render('index.html', { users : req.user });
        //res.sendfile('./public/index.html');
    });
};

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
/** check if user is logged in **/
function isLoggedIn(req, res, next) {
    if (typeof req.user !== 'undefined' && req.user)
        return next();

    console.log('redirect');
    res.status(204).redirect('/login');
}