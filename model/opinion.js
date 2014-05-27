var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OpinionSchema = new Schema({
	Op: { type: String, required: true },
	CreatedAt: { type: Date, default: Date.now },
	CreatedBy: { type: Schema.Types.ObjectId , required: true, ref: 'User' },
	TopicID: { type: Schema.Types.ObjectId , required: true, ref: 'Topic' },
	DimensionID: { type: Schema.Types.ObjectId , required: true, ref: 'Dimension' },
	UpdatedAt: { type: Date, default: Date.now }
});

var Opinion = mongoose.model('Opinion', OpinionSchema);