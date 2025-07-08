const Sequence = require('../models/sequence');


class SequenceGenerator {
  constructor() {
    this.initializeSequence();
  }

  async initializeSequence() {
    try {
      const sequence = await Sequence.findOne().exec();
      if (!sequence) {
        const newSequence = new Sequence({
          _id: 'sequence',
          maxDocumentId: 100,
          maxMessageId: 100,
          maxContactId: 100
        });
        await newSequence.save();
        console.log('Sequence initialized');
      }
    } catch (error) {
      console.error('Error initializing sequence:', error);
      throw error;
    }
  }

  async nextId(collectionType) {
    try {
      const sequence = await Sequence.findOneAndUpdate(
        { _id: 'sequence' },
        { $inc: this.getIncrementObject(collectionType) },
        { new: true, upsert: true }
      ).exec();

      if (!sequence) {
        throw new Error('Sequence not found');
      }

      return sequence[this.getFieldName(collectionType)];
    } catch (error) {
      console.error('Error generating next ID:', error);
      throw error;
    }
  }

  getIncrementObject(collectionType) {
    const field = this.getFieldName(collectionType);
    return { [field]: 1 };
  }

  getFieldName(collectionType) {
    switch (collectionType) {
      case 'documents': return 'maxDocumentId';
      case 'messages': return 'maxMessageId';
      case 'contacts': return 'maxContactId';
      default: throw new Error('Invalid collection type');
    }
  }
}

module.exports = SequenceGenerator;