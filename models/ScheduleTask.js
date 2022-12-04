const mongoose = require('mongoose');

const ScheduleTaskSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  task: { type: String, required: true },
});

module.exports = ScheduleTask = mongoose.model('scheduletask', ScheduleTaskSchema);
