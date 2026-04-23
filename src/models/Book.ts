import mongoose, { Schema, Document, Model } from "mongoose";

// Typescript interface for books database structure
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

// Mongoose-schema, defines structure and validation for book documents
const BookSchema = new Schema<IBook>(
    {
        title: { 
            type: String, 
            required: [true, 'Title is required'],
            trim: true, 
            maxlength: [200, 'Title cannot exceed 200 characters']
        },
        author: { 
            type: String, 
            required: [true, 'Author is required'],
            trim: true, 
        },
        genre: { 
            type: String, 
            enum: {
                values: ['fiction', 'non-fiction', 'science', 'history', 'biography'],
                message: '{VALUE} is not a valid genre',
            },
            required: [true, 'Genre is required']
        },
        publishYear: { 
            type: Number, 
            required: [ true, 'When was the book published?'],
            min: [1000, 'No books from before the invention of the printing press'],
            max: [new Date().getFullYear(), 'Publish year cannot be in the future']
        },
        isbn: { type: String, unique: true, sparse: true },
        inStock: { type: Boolean, default: true },
    }, { timestamps: true }
)

export const Book: Model<IBook> = mongoose.model<IBook>('Book', BookSchema)