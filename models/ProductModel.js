var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var ProductSchema = new Schema({
	'name' : {
		required: true,
		type: String
	},
    'description' : {
		required: true,
		type: String
	},
	'price' : {
		required: true,
		type: Number
	},
    'category' : {
		type: ObjectId,
        ref: 'Category'
	},
    'subCategories' : [{
		type: ObjectId,
        ref: 'Category'
	}],
	'images' : [{
		type: String,
	}],
	'status' : {
		type: Boolean,
		default: 1
	},
	'stock' : {
		type: Number,
		default: 1
	}
},{
	timestamps: true
});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ProductSchema);
