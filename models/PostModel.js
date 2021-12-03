var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');


var ImageSchema = new Schema({
	'name': String
}, {
	timestamps: true
});

var PostSchema = new Schema({
	'title': String,
	'description': String,
	'pickupDate': String,
	'pickupTime': String,
	'user': {
		type: ObjectId,
		ref: 'User'
	},
	'pickupLocation': {
		location: String,
		latitude: String,
		longitude: String
	},
	'deliveryLocation': {
		location: String,
		latitude: String,
		longitude: String
	},
	'images': [ImageSchema],
	'status': {
		type: String,
		enum: ['PENDING','ONGOING','DELIVERED','CANCELLED'],
		default: 'PENDING'
	}

}, {
	timestamps: true
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);
