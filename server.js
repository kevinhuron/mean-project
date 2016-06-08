/** modules **/
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var mongoose        = require('mongoose');
var passport        = require('passport');
var flash           = require('connect-flash');
var session         = require('express-session');
var cookieParser    = require('cookie-parser');
var morgan          = require('morgan');
var multer  = require('multer');

/** Config DB file **/
var db = require('./config/db') ;

var port = process.env.PORT || 8080;

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/public');
app.set('view engine', 'html');

mongoose.connect(db.url, function(err, db) {
    if(!err) {
        console.log("CONNECTED TO DATABASE !");
    }
});
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'appsecret'}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(multer({ dest: __dirname + '/public/img/article/' }));

/** Router **/
require('./app/routes')(app, passport);

/** Start APP at http://localhost:8080 **/
app.listen(port);
console.log('CONNECTED sur le port ' + port);
exports = module.exports = app;