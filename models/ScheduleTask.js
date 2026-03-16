const mongoose = require('mongoose');

const ScheduleTaskSchema = new mongoose.Schema({
  date: { type: Date, required: false },
  task: { type: String, required: true },
  start_time: { type: Number, required: false},
  end_time: { type: Number, required: false}
});

module.exports = ScheduleTask = mongoose.model('scheduletask', ScheduleTaskSchema);
