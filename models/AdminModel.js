var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const bcrypt = require('bcrypt');

var AdminSchema = new Schema({
	'email' : String,
	'password' : String
},{
	timestamps: true,
});

AdminSchema.pre('save', function() {
	console.log('admin',this)

    this.password = bcrypt.hashSync(this.password, 10);

})

module.exports = mongoose.model('Admin', AdminSchema);
