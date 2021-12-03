var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const UserCardsSchema = new Schema({
	cardNumber: String,
	exp: String
	// "_id": false
})

var UserSchema = new Schema({
	'firstName' : String,
	'lastName' : String,
	'phone' : String,
	'email' : String,
	'profile_img': {
        type: String,
        default: 'placeholder.jpg'
	},
	'password' : String,
	'otp' : {
		type: Number,
		default: 0
	},
	'status' : {
		type: Boolean,
		default: 1
	},
	'userType': {
       type: String,
	   enum: [1,2]       //1 => User 2=> Delivery
	},
	'wallet': {
		type: Number,
		default: 0
	},
	'cards': [UserCardsSchema]
},{
	timestamps: true
});	

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
