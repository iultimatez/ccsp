var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	FBID: { type: String, required: true },
	displayName: { type: String, required: true },
	gender: String,
	created: { type: Date, default: Date.now }
});

var User = mongoose.model('User', UserSchema);