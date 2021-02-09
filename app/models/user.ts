import { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
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

const UserModel: Model<IUser> = model<IUser>('users', userSchema);

export default UserModel;
// const { Schema, model } = require("mongoose");

// const userSchema = Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now()
//   }
// });

// module.exports = model("User", userSchema);