var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var SubCategorySchema = new Schema({
	'name' : {
		required: true,
		type: String
	},
    'category' : {
		type: ObjectId,
        ref: 'Category'
	},
	'image' : {
		type: String,
		default: 'user.png'
	},
	'status' : {
		type: Boolean,
		default: 1
	}
},{
	timestamps: true
});

SubCategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('SubCategory', SubCategorySchema);
