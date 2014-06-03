var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
	Title: { type: String, required: true },
	Content: { type: String, required: true },
	Links: { type: String, default: "assets/img/logo.png" },
	CreatedAt: { type: Date, default: Date.now },
	CreatedBy: { type: Schema.Types.ObjectId , ref: 'User' },
	Dimensions: [{ type: Schema.Types.ObjectId, ref: 'Dimension' }],
	UpdatedAt: { type: Date, default: Date.now }
});

var Topic = mongoose.model('Topic', TopicSchema);