const express = require('express')
import { Author } from '../models/Author'

const router = express.Router()

// POST
router.post('/', async (req, res, next) => {
    try {
        const author = await Author.create(req.body)

        res.status(201).json({author})
    } catch(error) {
        if(error.name === 'ValidationError') {
            return res.status(400).json({error: error.message})
        }
    }
})

// GET 
router.get('/', async (req, res, next) => {
    try {
        const authors = await Author.find()

        res.status(200).json(authors)
        
    } catch(error) {
        res.status(500).json({error: 'Could not fetch authors'})
    }
})

// GET /:id
router.get('/:id', async (req, res, next) => {
    try {
        const author = await Author.find(req.params.id)
        if(!author) {
            return res.status(404).json({error: 'Could not locate author'})
        }
        res.status(200).json(author)

    } catch(error) {
        if(error.name === 'CastError'){
            return res.status(404).json({error: 'Invalid id format'})
        }
    }
})

// PATCH /:id
router.patch('/:id', async (req, res, next) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after', runValidators: true})
        if(!author) {
            return res.status(404).json({error: 'Could not locate author'})
        }
        
        res.status(200).json(author)
        
    } catch(error) {
        if(error.name === 'CastError'){
            if(error.path === '_id'){
                return res.status(404).json({error: 'Invalid id format'})
            }
            return res.status(400).json({error: `Invalid path for ${error.path}`})
        }
        res.status(500).json({error: 'Could not update selected author'})

    }
})

// DELETE /:id
router.delete('/:id', async (req, res, next) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id)  
    } 
})