import mongoose, {Schema, Document, Model} from "mongoose";

export interface IAuthor extends Document {
    name: string,
    nationality: string,
    birthYear: number,
    isActive: boolean,
}

const AuthorSchema = new Schema<IAuthor>(
    {
        name: {
            type: String,
            required: true,
        },
        nationality: {
            type: String,
            required: false,
        },
        birthYear: {
            type: Number,
            required: false
        },
        isActive: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    {
        timestamps: true
    }
)

export const Author: Model<IAuthor> = mongoose.model<IAuthor>('Author', AuthorSchema)