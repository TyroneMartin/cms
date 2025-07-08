const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  _id: { type: String, required: true },
  maxDocumentId: { type: Number },
  maxMessageId: { type: Number },
  maxContactId: { type: Number }
});

module.exports = mongoose.model('Sequence', sequenceSchema);
