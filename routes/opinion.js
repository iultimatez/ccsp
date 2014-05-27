var mongoose = require('mongoose');
var Opinion = mongoose.model('Opinion');

exports.list = function(req, res){
	Opinion.find(function (err, opinions, count){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		res.json({opinions: opinions});
	})
};

exports.create = function(req, res){

	var opinion = new Opinion(req.body);

	opinion.save(function (err, newopinion){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		res.json(newopinion);
	})
};


exports.show = function(req, res){
	Opinion.findById(req.query.id,function (err, opinion){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		res.json(opinion);
	})
};

exports.update = function(req, res){
	Opinion.findById(req.body.id,function (err, opinion){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		
		opinion.Op = req.body.Op;
		opinion.UpdatedAt = Date.now();
		opinion.save(function (err, newopinion){
			if (err) {
				console.log(err);
				res.json({error: err.name}, 500);
			}
			res.json(newopinion);
		})
	})
};

exports.destroy = function(req, res){
	Opinion.findById(req.body.id,function (err, opinion){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}

		opinion.remove(function (err, removeopinion){
			if (err) {
				console.log(err);
				res.json({error: err.name}, 500);
			}
			res.json(removeopinion);
		})
	})
};

exports.getOpinionByDimensionId = function(req, res){
	Opinion.find({"DimensionID": req.query.id}, function (err, opinions, count){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		res.json({opinions: opinions});
	})
};
