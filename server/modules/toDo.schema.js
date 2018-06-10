const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
    title: { type: String, required: true },
    priority: { type: String, required: true },
    taskInfo: { type: String, required: true },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, required: true, default: false }
}); // end taskSchema

module.exports = mongoose.model( 'ToDo', ToDoSchema );