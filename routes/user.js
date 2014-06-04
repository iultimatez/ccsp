var mongoose = require('mongoose');
var User = mongoose.model('User');
/*
exports.findOne = function(req, res){
	//console.log(req.query.FBID + req.query.displayName + req.query.gender);
	User.findOne({'FBID': req.body.FBID}, function(err, user){
		if (err) {
			console.log("err");
			res.json({error: err.name}, 500);
		}
		console.log(user);
		if (user) {
			console.log("found!");
			res.json(user);
		}else{
			console.log("cannot find");
			var newuser = new User();
			newuser.FBID = req.body.FBID;
			newuser.displayName = req.body.displayName;
			newuser.gender = req.body.gender;
			newuser.save(function (err, newUser){
				if (err) {
					console.error(err);
					res.json({error: err.name}, 500);
				}
				console.log(newUser);
				res.json(newUser);
			})
		}
		
	});
};
*/

exports.findOne = function(req, detail, cb){
	console.log(req.FBID);
	User.findOne({'FBID': req.FBID}, function(err, user){
		if (err) {
			console.log("err");
			cb({error: err.name}, 500);
		}
		console.log(user);
		if (user) {
			console.log("found!");
			cb(err, JSON.stringify(user));
		}else{
			console.log("cannot find");
			var newuser = new User();
			newuser.FBID = detail.FBID;
			newuser.displayName = detail.displayName;
			newuser.gender = detail.gender;
			newuser.save(function (err, newUser){
				if (err) {
					console.error(err);
					cb({error: err.name}, 500);
				}
				console.log(newUser);
				cb(err, JSON.stringify(newUser));
			})
		}
	});
}

exports.show = function(req, res){
	User.findById(req.query.id).exec(function (err, user){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		res.json(user);
	})
};