const mongoose = require('mongoose');

const JournalPostSchema = new mongoose.Schema({
  date: { type: Date },
  title: { type: String, default: '' },
  text: { type: String, default: '' },
  image_filename: { type: String },
});

module.exports = JournalPost = mongoose.model('journalPost', JournalPostSchema);
