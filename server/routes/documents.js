const express = require('express');
const router = express.Router();
const SequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

const sequenceGenerator = new SequenceGenerator();

router.get('/', async (req, res) => {
  try {
    const documents = await Document.find().populate('children');
    console.log('Documents fetched:', documents.length);
    // Return the documents array directly, not wrapped in an object
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const maxDocumentId = await sequenceGenerator.nextId('documents');

    const document = new Document({
      id: maxDocumentId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
      children: req.body.children
    });

    const createdDocument = await document.save();
    await createdDocument.populate('children');

    res.status(201).json({
      message: 'Document added successfully',
      document: document  
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const document = await Document.findOne({ id: req.params.id });

    if (!document) {
      return res.status(404).json({
        message: 'Document not found.'
      });
    }

    document.name = req.body.name;
    document.description = req.body.description;
    document.url = req.body.url;
    document.children = req.body.children;

    const updatedDocument = await Document.findOneAndUpdate(
      { id: req.params.id }, 
      document, 
      { new: true }
    ).populate('children');

    res.status(200).json({
      message: 'Document updated successfully',
      document: updatedDocument
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const document = await Document.findOne({ id: req.params.id });

    if (!document) {
      return res.status(404).json({
        message: 'Document not found.'
      });
    }

    await Document.deleteOne({ id: req.params.id });

    res.status(200).json({
      message: 'Document deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

module.exports = router;