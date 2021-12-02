var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var UserSchema = new Schema({
	'name' : {
		required: true,
		type: String
	},
	'email' : String,
	'gender' : String,
	'age' : Number,
	'image' : {
		type: String,
		default: 'placeholder.jpg'
	},
	'wallet_balance' : {
		type: Number,
		default: 0
	},
	'status' : {
		type: Boolean,
		default: 1
	}
},{
	timestamps: true
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
