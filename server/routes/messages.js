const express = require('express');
const router = express.Router();
const SequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

const sequenceGenerator = new SequenceGenerator();

router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.find().populate('sender');
    res.status(200).json({
      message: 'Messages fetched successfully!',
      messages: messages
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const maxMessageId = await sequenceGenerator.nextId('messages');
    
    const message = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: req.body.sender
    });

    const createdMessage = await message.save();
    
    res.status(201).json({
      message: 'Message added successfully',
      createdMessage: createdMessage
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const message = await Message.findOne({ id: req.params.id });
    
    if (!message) {
      return res.status(404).json({
        message: 'Message not found.'
      });
    }

    message.subject = req.body.subject;
    message.msgText = req.body.msgText;
    message.sender = req.body.sender;

    const result = await Message.updateOne({ id: req.params.id }, message);
    
    res.status(204).json({
      message: 'Message updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const message = await Message.findOne({ id: req.params.id });
    
    if (!message) {
      return res.status(404).json({
        message: 'Message not found.'
      });
    }

    await Message.deleteOne({ id: req.params.id });
    
    res.status(204).json({
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

module.exports = router;