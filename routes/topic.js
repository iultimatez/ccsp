var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');

exports.list = function(req, res){
	Topic.find().populate('CreatedBy').exec(function (err, topics, count){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		res.json({topics: topics});
	})
};

exports.create = function(req, res){
	var topic = new Topic();

	topic.Title = req.body.Title;
	topic.Content = req.body.Content;
	topic.CreatedBy = req.body.CreatedBy;
	if (req.body.Links != "") {
		topic.Links = req.body.Links;
	}

	topic.save(function (err, newTopic){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		//res.json(newTopic);
		res.redirect('/');
	})
};


exports.show = function(req, res){
	Topic.findById(req.query.id).populate('CreatedBy').exec(function (err, topic){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		res.json(topic);
	})
};

exports.update = function(req, res){
	Topic.findById(req.body.id,function (err, topic){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		
		topic.Title = req.body.Title;
		topic.Content = req.body.Content;
		topic.Link = req.body.Link;
		topic.UpdatedAt = Date.now();
		topic.save(function (err, newTopic){
			if (err) {
				console.log(err);
				res.json({error: err.name}, 500);
			}
			res.json(newTopic);
		})
	})
};

exports.destroy = function(req, res){
	Topic.findById(req.body.id,function (err, topic){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}

		topic.remove(function (err, removeTopic){
			if (err) {
				console.log(err);
				res.json({error: err.name}, 500);
			}
			res.json(removeTopic);
		})
	})
};

exports.search = function(req, res){
	Topic.find({"Title": new RegExp(req.query.keyword)}).populate('CreatedBy').exec( function (err, topics, count){
		if (err) {
			console.log(err);
			res.json({error: err.name}, 500);
		}
		res.json({topics: topics});
	})
};
