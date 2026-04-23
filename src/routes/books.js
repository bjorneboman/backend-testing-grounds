const express = require('express')
const { Book } = require('../models/Book')

const router = express.Router()

// Routes
router.post('/', async (req, res, next) => {
    console.log("Request body:", req.body)
    try {
        const book = await Book.create(req.body)
        res.status(201).json(book)
    } catch (error) {
        next(error)
    }
})

module.exports = router