import mongoose from 'mongoose';

const url = "mongodb+srv://Eugene:135135@cluster0.cc72z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; // TODO: add url

export default async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
