import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// var Schema = mongoose.Schema;

let ListSchema = new Schema({
	listName: {type: String, required: true},
	listId: {type: String},
	boardId: {type: String},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('List', ListSchema)