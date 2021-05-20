import { IUser } from './../../models/user';
import { IBookRelation } from './../../models/book-relation';
import express from 'express';
import User from '../../models/user';
import BookRelation from '../../models/book-relation';
import Book, { IBook } from '../../models/book';

const router = express.Router();

export default router.get("/users/:userId/books", async (req, res) => {
  try {
    const user: IUser = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(400).json({
        message: "User Not Exist"
      });
    }

    if (!user.books.length) {
      return res.json([]);
    }

    const bookRelations: IBookRelation[] = await BookRelation.find({ _id: { $in: user.books } });

    if (!(bookRelations || []).length) {
      return res.json([]);
    }

    const books: IBook[] = await Book.find({ _id: { $in: bookRelations.map(bookRelation => bookRelation.bookId) } });
    
    const result = bookRelations.map(bookRelation => {
      return {
        bookId: bookRelation.bookId,
        condition: bookRelation.condition,
        book: books.find(book => {
          return String(bookRelation.bookId) === String(book._id);
        })
      }
    });
    console.log(result);

    res.json(result);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});
