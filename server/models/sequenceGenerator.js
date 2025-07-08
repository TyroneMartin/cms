const Sequence = require('../models/sequence');

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne()
    .exec((err, sequence) => {
      if (err) {
        console.error('An error occurred:', err);
        return;
      }

      if (sequence) {
        sequenceId = sequence._id;
        maxDocumentId = sequence.maxDocumentId;
        maxMessageId = sequence.maxMessageId;
        maxContactId = sequence.maxContactId;
      } else {
        // Initialize if no sequence exists
        const newSequence = new Sequence({
          maxDocumentId: 100,
          maxMessageId: 100,
          maxContactId: 100
        });
        newSequence.save();
        sequenceId = newSequence._id;
        maxDocumentId = 100;
        maxMessageId = 100;
        maxContactId = 100;
      }
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {
  let updateObject = {};
  let nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = { maxDocumentId: maxDocumentId };
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = { maxMessageId: maxMessageId };
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = { maxContactId: maxContactId };
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
    .catch(err => {
      console.log('nextId error:', err);
      return null;
    });

  return nextId;
};

module.exports = new SequenceGenerator();