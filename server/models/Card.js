import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// var mongoose= require('mongoose');
// var Schema = mongoose.Schema;

let CardSchema = new Schema({
	cardData: {type: String},
	listId: {type: String},
	cardId: {type: String},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Card',CardSchema);