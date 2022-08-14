const mongoose = require('mongoose');

const HistoricalSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  dt: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    requried: true,
  },
});

module.exports = Historical = mongoose.model('historical', HistoricalSchema);
