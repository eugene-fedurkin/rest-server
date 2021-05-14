import express from 'express';
import User from '../../models/user';
import Book from '../../models/book';


const router = express.Router();

export default router.post("/users/:userId/books", async (req, res) => {
  // try {
  //   const user = await User.findById(req.params.id).select('-password');
  //   res.json(user);
  // } catch (e) {
  //   res.send({ message: "Error in Fetching user" });
  // }
  const { name, author, description, condition } = req.body;
  const { userId } = req.params;
  let user = await User.findOne({
    _id: userId
  });
  const book = new Book({
    name, author, description
  });
  User.ad
  user.book.push(book._id);
  const savedBook = await book.save();
  console.log(req.params, req.body, savedBook);
});
