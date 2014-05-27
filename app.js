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
      /*
      登入之後會還傳值，前端應該用cookie之類的東西記錄，才能在新增內容的時候填入使用者的objectID
      */
      var a = JSON.parse(body);
      //console.log(body);
      console.log("b: " + a.FBID);
      done(null, body);
    });
  }
));

//驗證登入的function
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

//首頁
app.get('/', function(req, res){
  res.sendfile('index.html');
});

//登入頁面
app.get('/login', function(req, res){
  res.sendfile('login.html');
});

//FB登入連結，如果不需要做登入頁面的話直接call這個連結就好
app.get('/auth/facebook', passport.authenticate('facebook'));

//FB登入call back
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
//登出
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
//傳回是否是登入狀態
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
//列出所有topic
app.get('/topic/list', topic.list);
//新增一個topic
app.post('/topic/create', topic.create);
//根據objectID顯示單一topic
app.get('/topic/show/:id?', topic.show);
//根據objectID修改單一topic
app.post('/topic/update', topic.update);
//根據objectID刪除單一topic
app.post('/topic/destroy', topic.destroy);
//根據傳入的keyword傳回標題有符合的topic陣列
app.get('/topic/search/:keyword?', topic.search);

//下面以此類推
app.get('/dimension/list', dimension.list);
app.post('/dimension/create', dimension.create);
app.get('/dimension/show/:id?', dimension.show);
app.post('/dimension/update', dimension.update);
app.post('/dimension/destroy', dimension.destroy);
//字面上的意思...傳入一個topic的objectID，列出所有的dimension
app.get('/dimension/getDimensionByTopicId/:id?', dimension.getDimensionByTopicId);

app.get('/opinion/list', opinion.list);
app.post('/opinion/create', opinion.create);
app.get('/opinion/show/:id?', opinion.show);
app.post('/opinion/update', opinion.update);
app.post('/opinion/destroy', opinion.destroy);
//一樣是字面上的意思，傳入一個dimension的objectID，列出所有opinion
app.get('/opinion/getOpinionByDimensionId/:id?', opinion.getOpinionByDimensionId);

app.listen(5000);
