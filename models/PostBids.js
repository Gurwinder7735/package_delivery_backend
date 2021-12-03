var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');



var ImageSchema = new Schema({
	'name': String
}, {
	timestamps: true
});

var PostBids = new Schema({
	'user': {
		type: ObjectId,
		ref: 'User'
	},
	'post': {
		type: ObjectId,
		ref: 'Post'
	},
	'offerPrice': Number,
	'status': {
		type: String,
		enum: ['PENDING','ACCEPTED','REJECTED'],
	    default: 'PENDING'
	}
}, {
	timestamps: true
});

PostBids.plugin(mongoosePaginate);

module.exports = mongoose.model('PostBids', PostBids);
