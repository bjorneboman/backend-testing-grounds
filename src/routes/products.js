
const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/product')

const router = express.Router()

// Create
router.post('/', async (req, res, next) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)

    } catch(e) {
        console.error(e)

        next(e)
    }
})

// List
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find()

        res.json(products)

    } catch(e) {
        console.error(e)
        next(e)
    }
})

// Read
router.get('/:id', async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if(!product) 
        return res.status(404).json({ error: 'Product not found'})

    res.json(product)        
})

// Update
router.patch('/:id', async (req,res, next) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true, runValidators: true}
    )

    if (!product)
        return res.status(404).json({ error: 'Product not found'})
    
    res.json(product)
})

// Delete
router.delete('/:id', async (req, res, next) => {
    
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product)
        return res.status(404).json({ error: 'Product not found'})
        
    res.status(204).end()
})

module.exports = router