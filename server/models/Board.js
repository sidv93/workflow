import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// var mongoose= require('mongoose');
// var Schema = mongoose.Schema;

let BoardSchema = new Schema({
	boardName: {type: String, required: true},
	boardId: {type: String, required: true},
	user: {type: String, required: true},
	date: {type: Date, required: true},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Board', BoardSchema);