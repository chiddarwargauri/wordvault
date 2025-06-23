const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

// POST route to add a word
router.post('/add', async (req, res) => {
  try {
    const { word, meaning } = req.body;

    // Validate input
    if (!word || !meaning) {
      return res.status(400).json({ message: 'Word and meaning are required.' });
    }

    const newWord = new Word({ word, meaning });
    await newWord.save();
    res.status(201).json({ message: 'Word saved successfully!' });
  } catch (error) {
    console.error('Error saving word:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to fetch all words
router.get('/', async (req, res) => {
    try {
      const words = await Word.find(); // Fetch all words from MongoDB
      res.json(words); // Send as JSON
    } catch (error) {
      console.error('Error fetching words:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
