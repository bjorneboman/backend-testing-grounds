import mongoose, { Schema, Document, Model } from 'mongoose';

// Typescript interface for books database sturcture
export interface IBook extends Document {
  title: string;
  author: string;
  genre: 'fiction' | 'non-fiction' | 'science' | 'history' | 'biography';
  publishYear: number;
  isbn?: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose-schema defines structure and validation
const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, 'The title is required'],
      trim: true,
      maxlength: [200, 'The title may not be longer than 200 characters'],
    },
    author: {
      type: String,
      required: [true, 'Who wrote this book?'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'What genre is this book?'],
      enum: {
        values: ['fiction', 'non-fiction', 'science', 'history', 'biography'],
        message: '{VALUE} is not a vlid genre',
      },
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

export const Book: Model<IBook> = mongoose.model<IBook>('Book', BookSchema);
