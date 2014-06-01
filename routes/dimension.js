var mongoose = require('mongoose');
var Dimension = mongoose.model('Dimension');
var Topic = mongoose.model('Topic');

exports.list = function(req, res){
	Dimension.find().populate('CreatedBy').populate('Opinions').exec(function (err, dimensions, count){
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

		Topic.findById(req.body.TopicID).exec(function (err, topic){
			if (err) {
				console.log(err);
				res.json({error: err.name}, 500);
			}

			topic.Dimensions.push(newDimension._id);

			topic.save(function (err, updatedTopic){
				if (err) {
					console.log(err);
					res.json({error: err.name}, 500);
				}
				res.json(newDimension);

			});
		})

		
	})

	
};


exports.show = function(req, res){
	Dimension.findById(req.query.id).populate('CreatedBy').populate('Opinions').exec(function (err, dimension){
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
		Topic.findById(dimension.TopicID).exec(function (err, topic){
			if (err) {
				console.log(err);
				res.json({error: err.name}, 500);
			}
			var i = 0;
			for (i = 0; i < topic.Dimensions.length; i++) {
				if (topic.Dimensions[i].toString() === dimension._id.toString()) {
					console.log("found");
					break;
				}
			};
			topic.Dimensions.splice(i, 1);

			topic.save(function (err, updatedTopic){
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

			});
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
