import { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
  username?: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: string;
  books: string[];
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  username: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  avatar: {
    type: String
  },
  books: {
    type: Array,
    default: []
  }
});

const UserModel: Model<IUser> = model<IUser>('users', userSchema);

export default UserModel;