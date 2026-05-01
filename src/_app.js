const express = require('express');
const cors = require('cors');
const bookRouter = require('./routes/books');

const app = express();

app.use(cors());

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/v1/books', bookRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error Handler always LAST
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Unkown Server Error' });
});

module.exports = app;
