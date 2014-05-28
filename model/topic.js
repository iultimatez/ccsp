var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
	Title: { type: String, required: true },
	Content: { type: String, required: true },
	Links: [String],
	CreatedAt: { type: Date, default: Date.now },
	CreatedBy: { type: Schema.Types.ObjectId , ref: 'User' },
	Dimensions: [{ type: Schema.Types.ObjectId, ref: 'Dimension' }],
	Opinions: [{ type: Schema.Types.ObjectId, ref: 'opinion' }],
	UpdatedAt: { type: Date, default: Date.now }
});

var Topic = mongoose.model('Topic', TopicSchema);