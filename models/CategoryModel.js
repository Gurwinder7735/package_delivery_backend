var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var CategorySchema = new Schema({
	'name' : {
		required: true,
		type: String
	},
	'image' : {
		type: String,
		default: 'placeholder.jpg'
	},
	'status' : {
		type: Boolean,
		default: 1
	}
},{
	timestamps: true
});

CategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Category', CategorySchema);
