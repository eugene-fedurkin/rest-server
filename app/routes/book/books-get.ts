import { pageLimit } from './../../constants/common';
import { IUser } from './../../models/user';
import { IBookRelation } from './../../models/book-relation';
import express from 'express';
import User from '../../models/user';
import BookRelation from '../../models/book-relation';
import Book, { IBook } from '../../models/book';

const router = express.Router();

interface BookRelationResponse {
  bookId: string;
  condition: string;
  book: IBook;
}

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

    const limit = req.query.limit || pageLimit;
    const offset = req.query.offset || 0;
    const sort = req.query.sort
      ? (() => {
          const sortPart = (req.query.sort as string).split(',');

          return { [sortPart[0]]: (sortPart[1] || '').toLocaleLowerCase() === 'desc' ? -1 : 1 };
        })()
      : {};

    const books: IBook[] = await Book.find({
      _id: { $in: bookRelations.map(bookRelation => bookRelation.bookId) }
    }).limit(+limit).skip(+offset).sort(sort);

    const result = books.reduce<BookRelationResponse[]>((result, book) => {
      const bookRelation = bookRelations.find(relation => String(relation.bookId) === String(book._id)) as IBookRelation;

      return result.concat({
        bookId: bookRelation?.bookId,
        condition: bookRelation?.condition,
        book: book
      });
    }, []);

    res.json({
      data: result,
      total: bookRelations.length
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});
