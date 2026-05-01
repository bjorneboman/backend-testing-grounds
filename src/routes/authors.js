const express = require('express');
const Author = require('../models/Author');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    if (err.code === 11000) {
      return res.status(409).json({
        error: 'An author already exists with given email.',
      });
    }
    res.status(500).json({ error: 'Kunde inte skapa författare' });
  }
});

router.get('/', async (req, res) => {
  try {
    const filter = {};
    let sortOption = '-createdAt';
    if (req.query.activeOnly === 'true') {
      filter.isActive = true;
      sortOption = 'name';
    }
    const authors = await Author.find(filter).sort(sortOption);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta författare' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Författare hittades inte' });
    }
    res.json(author);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Ogiltigt id-format' });
    }
    res.status(500).json({ error: 'Något gick fel' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!author) {
      return res.status(404).json({ error: 'Författare hittades inte' });
    }
    res.json(author);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Ogiltigt id-format' });
    }
    res.status(500).json({ error: 'Kunde inte uppdatera författare' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Författare hittades inte' });
    }
    res.status(204).send();
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Ogiltigt id-format' });
    }
    res.status(500).json({ error: 'Kunde inte radera författare' });
  }
});

module.exports = router;
