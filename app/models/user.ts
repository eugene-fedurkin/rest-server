import { Document, Model, model, Schema } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

const userSchema: Schema<User> = new Schema<User>({
  username: {
    type: String,
    required: true
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
  }
});

const UserModel: Model<User> = model<User>('users', userSchema);

export default UserModel;