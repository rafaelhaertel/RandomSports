
/**
 * Module dependencies.
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var localStrategy = require('passport-local' ).Strategy;
var methodOverride = require('method-override'); 
var multipart = require('connect-multiparty');
var logger = require('morgan');
var http = require('http');
var path = require('path');
var shuffler = require('./routes/shuffler.js');

var app = express();

module.exports = app;

mongoose.connect('mongodb://localhost/random');

// all environments
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(multipart());
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    rolling: true,
    resave: false,
    saveUninitialized: true,
    cookie: { expires: new Date(Date.now()+ 7200000) }
}));
// app.use(app.router);
app.use(express.static(path.join("./../", 'public')));



app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});
app.post('/shuffle/', shuffler.randomTeams);
app.get('/shuffle/:id', shuffler.getTeams);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});