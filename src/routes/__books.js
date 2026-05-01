const express = require('express');
const { Book } = require('../models/Book');

const router = express.Router();

// Routes
router.post('/', async (req, res, next) => {
  try {
    let book 
    
    if(Array.isArray(req.body)){
      book = await Book.insertMany(req.body, {ordered: false});
    } else {
      book = await Book.create(req.body)
    }

    res.status(201).json(book);
  } catch (error) {
    if(error.name === 'ValidationError') { // error.name kommer från schema-valideringen i mongoose
      return res.status(400).json({ error: error.message });
    }
    if(error.code === 11000){ // error.code kommer från MongoDB
      return res.status(400).json({error: 'Duplicated ISBN detected'})
    }
    res.status(500).json({error: 'Server error, could not create book.'})
  }
});

router.get('/', async (req, res, next) => {
  try {

    const {author, minYear, sort, page = 1, limit = 10} = req.query

    const filter = {}

    if(author) filter.author = author
    const year = Number(minYear)
    if(!isNaN(year)){
      filter.publishYear = { $gte: year }
    }

    // Sort
    const sortOption = sort ? sort : '-createdAt'

    // Pagination
    const pageNum = Math.max(Number(page), 1)
    const limitNum = Math.min(Number(limit), 100)
    const skip = (pageNum -1) * limitNum

    const books = await Book.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)

    const total = await Book.countDocuments(filter)

    res.json({
      data: books,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({error: `Could not fetch books`});
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
    if(error.name === 'CastError'){
      return res.status(404).json({error: 'Invalid id-format'})
    }
    res.status(500).json({error: 'Server error'})
  }
});

router.patch('/:id', async (req, res) => {
  try {
    // const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}) // new: true talar om att vi vill visa den nya datan i svaret, new: false talar om att vi ska visa datan som den var innan den uppdaterades
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after', runValidators: true}) // returnDocument: 'after' talar om att vi vill visa den nya datan i svaret, annars anger man "before"
    if(!book) {
      return res.status(404).json({error: 'Book could not be located'})
    }
    
    res.json(book)
  } catch(error) {
    if(error.name === 'ValidationError'){
      return res.status(400).json({error: error.message})
    }
    if(error.name === 'CastError'){
      if(error.path === '_id'){
        return res.status(404).json({error: 'Invalid id-format'})
      }
      return res.status(400).json({error: `Invalid value for ${error.path}`})
    }
    res.status(500).json({error: `Could not update selected book`})
  }
})

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)

    if(!book) {
      return res.status(404).json({error: `Could not locate requested book`})
    }

    res.status(204).send()
  } catch(error) {
    if(error.name === 'CastError'){
      return res.status(404).json({error: 'Invalid id-format'})
    }
    res.status(500).json({error: 'A server error occured. Deletion operation aborted'})
  }
})

module.exports = router;
