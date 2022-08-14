const mongoose = require('mongoose');

const ListItemSchema = new mongoose.Schema({
  listId: { type: String, required: true },
  parentId: { type: String, required: true },
  title: { type: String, required: true },
  checked: { type: Boolean, default: false },
});

module.exports = ListItem = mongoose.model('listItem', ListItemSchema);
