var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	userId: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User',UserSchema);