import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// var mongoose= require('mongoose');
// var Schema = mongoose.Schema;

let CookieSchema = new Schema({
    token: {type: String},
    expires: {type: Date},
    userId: {type: String},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Cookie',CookieSchema);