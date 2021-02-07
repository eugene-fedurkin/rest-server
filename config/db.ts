import mongoose from 'mongoose';

const url = "mongodb+srv://eug:123321@cluster0.ka0ie.mongodb.net/eug?retryWrites=true&w=majority"; // TODO: add url

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
