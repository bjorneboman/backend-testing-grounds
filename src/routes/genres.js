const express = require('express');
const { Genre } = require('../models/Genre');

const router = express.Router();

// /api/v1/books + endpoint

// Routes
// http://localhost:3000/api/v1/genres/
router.post('/', async (req, res, next) => {
  try {
    let genre;

    if (Array.isArray(req.body)) {
      genre = await Genre.insertMany(req.body, { ordered: false });
    } else {
      genre = await Genre.create(req.body);
    }
    res.status(201).json(genre);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    if (error.code === 11000) {
      return res.status(400).json({ error: `Duplicate detected` });
    }
    res.status(500).json({ error: `Server error, couln't create genre.` });
  }
});

// router.get('/', async (req, res, next) => {
//   try {
//     const { author, minYear, sort, page = 1, limit = 10 } = req.query;

//     //filter
//     const filter = {};

//     if (author) {
//       const matchingAuthors = await Author.find({
//         name: new RegExp(author, 'i'),
//       }).select('_id')

//       filter.author = { $in: matchingAuthors.map(a => a._id) };
//     }
//     const year = Number(minYear);
//     if (!isNaN(year)) {
//       filter.publishYear = { $gte: year };
//     }

//     //sort
//     const sortOption = sort ? sort : '-createdAt';

//     //pagination
//     const pageNum = Math.max(Number(page), 1);
//     const limitNum = Math.min(Number(limit), 100);
//     const skip = (pageNum - 1) * limitNum;

//     const books = await Book.find(filter).populate('author').sort(sortOption).skip(skip).limit(limitNum);

//     const total = await Book.countDocuments(filter);

//     res.json({
//       data: books,
//       pagination: {
//         page: pageNum,
//         limit: limitNum,
//         total,
//         totalPages: Math.ceil(total / limitNum),
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ error: `Couldn't fetch books` });
//   }
// });

// router.get('/:id', async (req, res, next) => {
//   try {
//     const book = await Book.findById(req.params.id).populate('author', 'name nationality');

//     if (!book) {
//       return res.status(404).json({ message: 'The Book could not be located' });
//     }
//     res.json(book);
//   } catch (error) {
//     if (error.name === 'CastError') {
//       return res.status(404).json({ error: `Invalid id-format` });
//     }
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// //PATCH - Updating our data in the Databse PATCH vs PUT
// router.patch('/:id', async (req, res) => {
//   try {
//     const book = await Book.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
//     if (!book) {
//       return res.status(404).json({ error: `Book couldn't be located` });
//     }

//     res.json(book);
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ error: error.message });
//     }

//     if (error.name === 'CastError') {
//       if (error.path === '_id') {
//         return res.status(404).json({ error: `Invalid id-format` });
//       }
//       return res.status(400).json({ error: `Invalid value for ${error.path}` });
//     }
//     res.status(500).json({ error: `Couldnt update selected book` });
//   }
// });

// //DELETE - remove data from databse
// router.delete('/:id', async (req, res) => {
//   try {
//     const book = await Book.findByIdAndDelete(req.params.id);

//     if (!book) {
//       return res.status(404).json({ error: `Couldn't located requested book` });
//     }

//     res.status(204).send();
//   } catch (error) {
//     if (error.name === 'CastError') {
//       return res.status(404).json({ error: `Invalid id-format` });
//     }
//     res.status(500).json({ error: `A server error occured. Deletation operation aborted.` });
//   }
// });

module.exports = router;
