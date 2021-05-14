import { Document, Model, model, Schema } from 'mongoose';

export interface IBookRelation extends Document {
  name: string;
  condition: any;
  description: string;
}

const bookRelationSchema: Schema<IBookRelation> = new Schema<IBookRelation>({
  book: {
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
  }
});

const BookRelationModel: Model<IBookRelation> = model<IBookRelation>('bookRelation', bookRelationSchema);

export default BookRelationModel;