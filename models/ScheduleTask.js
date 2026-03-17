const mongoose = require('mongoose');

const ScheduleTaskSchema = new mongoose.Schema({
  date: { type: Date, required: false },
  task: { type: String, required: true },
  start_time: { type: Date, required: false},
  end_time: { type: Date, required: false}
});

module.exports = ScheduleTask = mongoose.model('scheduletask', ScheduleTaskSchema);
