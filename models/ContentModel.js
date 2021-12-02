var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ContentSchema = new Schema({
	'accessor' : {
		type: String
	},
	'value' : String,
	
},{
	timestamps: true
});

module.exports = mongoose.model('Content', ContentSchema);
