var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/polygon');
//mongoose.connect('mongodb://ccsp:ccsppolygon@ds037768.mongolab.com:37768/polygon');

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