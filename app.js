var http = require('http');
var express = require('express');
var app = express();


app.configure(function() {
  app.use(express.static(__dirname));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'thisisdiscussionpolygon' }));
});

var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
require('./db');

var user = require('./routes/user');
var topic = require('./routes/topic');
var dimension = require('./routes/dimension');
var opinion = require('./routes/opinion');

var FacebookStrategy = require('passport-facebook').Strategy;
var request = require("request");
passport.use(new FacebookStrategy({
    clientID: '240935556101090',
    clientSecret: 'd935b26669cb812d1d149e9d5b7a6b75',
    callbackURL: "/fbcb"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("Login success: " + profile.id);
    var postData = {'FBID': profile.id, 'displayName': profile.displayName, 'gender': profile.gender};
    request.post({uri:"http://localhost:5000/find", form: postData}, function(error, response, body){
      if (error) {
        console.log(error);
      }
      var a = JSON.parse(body);
      //console.log(body);
      console.log("b: " + a.FBID);
      done(null, body);
    });
  }
));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(null); }
  res.redirect('/login')
}


passport.serializeUser(function(user, done) {
  console.log("login");
  console.log(user);
  done(null, user);//user
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);//obj
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});


app.get('/login', function(req, res){
  res.sendfile('login.html');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/fbcb', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));


app.post('/find', user.findOne);

app.get('/secret',
  	function(req, res){
  		if (req.isAuthenticated()) {
  			console.log('authorized: ' + req.user);
  			res.sendfile('secret.html');
  		}else{
  			res.redirect('/login')
  		}
  	});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/isAuthenticated', function(req, res){
  if (req.isAuthenticated()) {
    res.end("Logged in");
  }else{
    res.end("Not login yet");
  }
});
/*
需要驗證使用者的話，就把下面改成
app.get('/topic/list', ensureAuthenticated, topic.list);
*/
app.get('/topic/list', topic.list);
app.post('/topic/create', topic.create);
app.get('/topic/show/:id?', topic.show);
app.post('/topic/update', topic.update);
app.post('/topic/destroy', topic.destroy);
app.get('/topic/search/:keyword?', topic.search);

app.get('/dimension/list', dimension.list);
app.post('/dimension/create', dimension.create);
app.get('/dimension/show/:id?', dimension.show);
app.post('/dimension/update', dimension.update);
app.post('/dimension/destroy', dimension.destroy);
app.get('/dimension/getDimensionByTopicId/:id?', dimension.getDimensionByTopicId);

app.get('/opinion/list', opinion.list);
app.post('/opinion/create', opinion.create);
app.get('/opinion/show/:id?', opinion.show);
app.post('/opinion/update', opinion.update);
app.post('/opinion/destroy', opinion.destroy);
app.get('/opinion/getOpinionByDimensionId/:id?', opinion.getOpinionByDimensionId);

app.listen(5000);
