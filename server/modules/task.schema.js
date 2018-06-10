const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, required: true },
    priority: { type: String, required: true },
    taskInfo: { type: String, required: true },
    dueDate: { type: Date, required: false },
    completed: { type: Boolean, required: true, default: false }
}); // end taskSchema

module.exports = mongoose.model( 'Task', taskSchema );