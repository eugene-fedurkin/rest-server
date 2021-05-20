import express from 'express';
import User from '../../models/user';
import Book from '../../models/book';
import BookRelation from '../../models/book-relation';

const router = express.Router();

export default router.post("/users/:userId/books", async (req, res) => {
  const { name, author, description, condition } = req.body;
  const { userId } = req.params;
  try {
    const savedBook = await Book.findOne({ name, author });
    if (savedBook) {
      return res.status(400).json({
        msg: 'Book Already Exists'
      });
    }

    const book = new Book({
      name, author, description
    });

    const bookRelation = new BookRelation({
      bookId: book._id,
      condition
    });

    console.log(bookRelation, book)
    
    await User.findByIdAndUpdate(userId, {
      $push: { books: bookRelation._id }
    });
  
    await bookRelation.save();

    await book.save();
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});
