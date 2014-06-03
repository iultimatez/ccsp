var mongoose = require('mongoose');
var Opinion = mongoose.model('Opinion');
var Dimension = mongoose.model('Dimension');

exports.list = function(req, res){
	Opinion.find().populate('CreatedBy').exec(function (err, opinions, count){
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

		Dimension.findById(req.body.DimensionID).exec(function (err, dimension){
			if (err) {
				console.log(err);
				res.json({error: err.name}, 500);
			}

			dimension.Opinions.push(newopinion._id);

			dimension.save(function (err, updatedDimension){
				if (err) {
					console.log(err);
					res.json({error: err.name}, 500);
				}
				res.json(newopinion);

			});
		})
	})
};


exports.show = function(req, res){
	Opinion.findById(req.query.id).populate('CreatedBy').exec(function (err, opinion){
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

		Dimension.findById(opinion.DimensionID).exec(function (err, dimension){
			if (err) {
				console.log(err);
				res.json({error: err.name}, 500);
			}
			var i = 0;
			for (i = 0; i < dimension.Opinions.length; i++) {
				//console.log(dimension.Opinions[i] + " " + opinion._id);
				if (dimension.Opinions[i].toString() === opinion._id.toString()) {
					console.log("found");
					break;
				}
			};
			dimension.Opinions.splice(i, 1);

			dimension.save(function (err, updatedDimension){
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

			});
		})

		
	})
};

exports.getOpinionByDimensionId = function(req, res){
	Opinion.find({"DimensionID": req.query.id}).populate('CreatedBy').exec( function (err, opinions, count){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		res.json({opinions: opinions});
	})
};
