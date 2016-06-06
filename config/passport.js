/**
 * Created by kevinhuron on 04/06/2016.
 */
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../app/models/User');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        console.log('user in passport.js = ' + user);
        done(null, user);

    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    /** LOCAL SIGNUP **/
    passport.use('local-signup', new LocalStrategy({
            usernameField : 'mail',
            passwordField : 'passwd',
            passReqToCallback : true
        },
        function(req, mail, passwd, done) {
            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({'mail':mail},function(err, user) {
                    // In case of any error return
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    /** already exists **/
                    if (user) {
                        console.log('User already exists');
                        return done(null, false, req.flash('message','User Already Exists'));
                        //res.json("NOK");
                    } else {
                        /** if there is no user with that email --> create the user **/
                        var newUser = new User();
                        newUser.firstname = req.body.firstname;
                        newUser.lastname = req.body.lastname;
                        newUser.mail = mail;//req.param('email');
                        newUser.passwd = newUser.createHash(req.body.passwd);
                        newUser.accessLvl = 'abonne';
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);
                                throw err;
                            }
                            console.log('User Registration succesful');
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );
    /** END LOCAL SIGNUP **/

    /** LOCAL LOGIN **/
    passport.use('local-login', new LocalStrategy({
            usernameField : 'mail',
            passwordField : 'passwd',
            passReqToCallback : true
        },
        function(req, mail, passwd, done) {
            User.findOne({ 'mail' :  mail },
                function(err, user) {
                    if (err)
                        return done(err);
                    /** Username does not exist **/
                    if (!user){
                        console.log('User Not Found with mail ' + mail);
                        return done(null, false, req.flash('message', 'User Not found.'));
                    }
                    /** User exists but wrong password **/
                    if (!user.validPassword(passwd)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password'));
                    }
                    return done(null, user);
                });
    }));
    /** END LOCAL LOGIN **/
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    /*passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'mail',
            passwordField : 'passwd',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, mail, passwd, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'mail' :  mail }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Utitlisateur non trouvé ! vérifiez vos informations')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(passwd,function(valid){
                        if(!valid){
                            return done(null, false, req.flash('loginMessage', 'Mot de passe incorrect !'));
                        }
                    }));
                // all is well, return successful user
                return done(null, user);
            });

        }));*/
};