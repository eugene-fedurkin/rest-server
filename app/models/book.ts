import { Document, Model, model, Schema } from 'mongoose';

export interface IBook extends Document {
  name: string;
  condition: any;
  description: string;
}

const bookSchema: Schema<IBook> = new Schema<IBook>({
  name: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    enum: ['new', 'excellent', 'good', 'acceptable', 'bad', 'digital book'],
    required: true
  },
  description: {
    type: String
  },
  uploadDate: {
    type: Date,
    default: Date.now()
  }
});

const BookModel: Model<IBook> = model<IBook>('book', bookSchema);

export default BookModel;