const mongoose = require('mongoose') 
const { Schema } = mongoose;

// Mongoose-schema defines structure and validation
const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The title is required'],
      trim: true,
      maxlength: [200, 'The title may not be longer than 200 characters'],
    },
    author: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Who wrote this book?'],
      ref: 'Author'
    },
    genre: {
      type: String,
      required: [true, 'What genre is this book?'],
      // ref: 'Genre'
    },
    publishYear: {
      type: Number,
      required: [true, 'When was the book published?'],
      min: [1000, 'No books from befre the printing press invention'],
      max: [new Date().getFullYear(), 'No releases from this year or later'],
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

BookSchema.index({ author: 1, publishYear: -1})

module.exports = mongoose.model('Book', BookSchema);
