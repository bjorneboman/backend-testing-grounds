const express = require('express');
const { Book } = require('../models/Book');

const router = express.Router();

// /api/v1/books + endpoint

// Routes
// http://localhost:3000/api/v1/books/
router.post('/', async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    if (error.code === 11000) {
      return res.status(400).json({ error: `Duplicate ISBN detected` });
    }
    res.status(500).json({ error: `Server error, couln't create book.` });
  }
});

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'The Book could not be located' });
    }
    res.json(book);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ error: `Invalid id-format` });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

//PATCH - Updating our data in the Databse

router.patch('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (!book) {
      return res.status(404).json({ error: `Book couldn't be located` });
    }

    res.json(book);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    if (error.name === 'CastError') {
      if (error.path === '_id') {
        return res.status(404).json({ error: `Invalid id-format` });
      }
      return res.status(400).json({ error: `Invalid value for ${error.path}` });
    }
    res.status(500).json({ error: `Couldnt update selected book` });
  }
});

module.exports = router;
