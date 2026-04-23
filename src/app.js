const express = require('express')
const cors = require('cors')
const productsRouter = require('./routes/products')
const moviesRouter = require('./routes/movies')
const bookRouter = require('./routes/books')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/products', productsRouter)
app.use('/movies', moviesRouter)

app.use('/api/v1/books', bookRouter)

app.get('/health', (req, res) => {
    res.json({ status: 'ok'})
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Unkown Server Error' });
});


module.exports = app