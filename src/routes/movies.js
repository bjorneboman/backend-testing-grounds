const express = require('express')
const mongoose = require('mongoose')
const Movie =require('../models/movie')

const router = express.Router()

// Create
router.post('/', async (req, res, next) => {
    const movie = await Movie.create(req.body)
    res.status(201).json(movie)
})

// Read
router.get('/', async (req, res, next) => {
    const movies = await Movie.find()
    res.json(movies)
})

router.get('/:id', async (req, res, next) => {
    const movie = await Movie.findById(req.params.id)
    if(!movie)
        return res.status(404).json({error: 'Movie not found'})

    res.json(movie)
})

// Update
router.patch('/:id', async (req, res, next) => {
    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        {returnDocument: 'after'}
    )
    if(!movie)
        return res.status(404).json({error: "No such movie"})
    
    res.json(movie)
})

// Delete
router.delete('/:id', async (req, res, next) => {
    const movie = await Movie.findByIdAndDelete(
        req.params.id,
    )
    if(!movie)
        return res.status(404).json({error: "No such movie"})
    
    res.status(204).end()
})


module.exports = router