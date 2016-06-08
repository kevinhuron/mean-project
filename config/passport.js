/**
 * Created by kevinhuron on 04/06/2016.
 */
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/User');

module.exports = function (passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    /** LOCAL SIGNUP **/
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'mail',
            passwordField: 'passwd',
            passReqToCallback: true
        },
        function (req, mail, passwd, done) {
            process.nextTick(function () {
                User.findOne({'local.mail': mail}, function (err, user) {
                    /** if errors, return the error **/
                    if (err)
                        return done(err);
                    /** check to see if theres already a user with that email **/
                    if (user) {
                        return done(null, false, {message:'L\'email ' + mail + ' est déjà utilisé. Veuillez en saisir un autre.', type:'mailUse'});
                    } else {
                        /** create the user **/
                        var newUser = new User();

                        /** set the user's local info **/
                        newUser.local.firstname = req.body.firstname;
                        newUser.local.lastname = req.body.lastname;
                        newUser.local.mail = mail;
                        newUser.local.passwd = newUser.generateHash(passwd);
                        newUser.local.accessLvl = 'abonne';

                        /** save the user **/
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

    }));
    /** END LOCAL SIGNUP **/

    /** LOCAL LOGIN **/
    passport.use('local-login', new LocalStrategy({
            usernameField: 'mail',
            passwordField: 'passwd',
            passReqToCallback: true
        },
        function (req, mail, passwd, done) {
            User.findOne({'local.mail': mail}, function (err, user) {
                /** if  errors, return error **/
                if (err)
                    return done(err);
                /** if no user is found **/
                if (!user) {
                    console.log('User Not Found with mail ' + mail);
                    return done(null, false);
                }

                /** if user found but wrong passwd **/
                if (!user.validPassword(passwd)) {
                    console.log('Invalid Password');
                    return done(null, false);
                }
                console.log('User login succesful');
                /** return successful user **/
                return done(null, user);
            });

    }));
    /** END LOCAL LOGIN **/
};