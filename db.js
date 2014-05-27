var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/polygon');

mongoose.connection.on('error', function (err) {
	console.log(err);
});

mongoose.connection.once('open', function (){
	console.log('Database connection established.');
});

require('./model/user');
require('./model/topic');
require('./model/dimension');
require('./model/opinion');