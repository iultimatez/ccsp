var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DimensionSchema = new Schema({
	Di: { type: String, required: true },
	CreatedAt: { type: Date, default: Date.now },
	CreatedBy: { type: Schema.Types.ObjectId , ref: 'User' },
	TopicID: { type: Schema.Types.ObjectId , required: true, ref: 'Topic' },
	Opinions: [{ type: Schema.Types.ObjectId, ref: 'Opinion' }],
	UpdatedAt: { type: Date, default: Date.now }
});

var Dimension = mongoose.model('Dimension', DimensionSchema);