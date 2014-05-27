var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	FBID: { type: String, required: true },
	displayName: { type: String, required: true },
	gender: String,
	created: { type: Date, default: Date.now },
	Topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
	Dimensions: [{ type: Schema.Types.ObjectId, ref: 'Dimension' }],
	Opinions: [{ type: Schema.Types.ObjectId, ref: 'Opinion' }]
});

var User = mongoose.model('User', UserSchema);