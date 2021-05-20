import { Document, Model, model, Schema } from 'mongoose';

export interface IBookRelation extends Document {
  bookId: string;
  condition: any;
}

const bookRelationSchema: Schema<IBookRelation> = new Schema<IBookRelation>({
  bookId: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    enum: ['new', 'excellent', 'good', 'acceptable', 'bad', 'digital book'],
    required: true
  }
});

const BookRelationModel: Model<IBookRelation> = model<IBookRelation>('bookRelation', bookRelationSchema);

export default BookRelationModel;