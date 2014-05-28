var mongoose = require('mongoose');
var Dimension = mongoose.model('Dimension');

exports.list = function(req, res){
	Dimension.find().populate('CreatedBy').exec(function (err, dimensions, count){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		res.json({dimensions: dimensions});
	})
};

exports.create = function(req, res){
	var dimension = new Dimension(req.body);

	dimension.save(function (err, newDimension){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		res.json(newDimension);
	})
};


exports.show = function(req, res){
	Dimension.findById(req.query.id).populate('CreatedBy').exec(function (err, dimension){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		res.json(dimension);
	})
};

exports.update = function(req, res){
	Dimension.findById(req.body.id,function (err, dimension){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		console.log(dimension);
		dimension.Di = req.body.Di;
		dimension.UpdatedAt = Date.now();
		dimension.save(function (err, newDimension){
			if (err) {
				console.log(err);
				res.json({error: err.name}, 500);
			}
			res.json(newDimension);
		})
	})
};

exports.destroy = function(req, res){
	Dimension.findById(req.body.id,function (err, dimension){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}

		dimension.remove(function (err, removeDimension){
			if (err) {
				console.log(err);
				res.json({error: err.name}, 500);
			}
			res.json(removeDimension);
		})
	})
};


exports.getDimensionByTopicId = function(req, res){
	Dimension.find({"TopicID": req.query.id}).populate('CreatedBy').exec( function (err, dimensions, count){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		res.json({dimensions: dimensions});
	})
};
