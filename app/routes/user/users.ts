import { pageLimit } from './../../constants/common';
import User from '../../models/user';
import express from 'express';

const router = express.Router();

export default router.get("/users", async (req, res) => {
  try {
    const limit = req.query.limit || pageLimit;
    const offset = req.query.offset || 0;
    const sort = req.query.sort
      ? (() => {
          const sortPart = (req.query.sort as string).split(' ');
          
          return { [sortPart[0]]: (sortPart[1] || '').toLocaleLowerCase() === 'desc' ? -1 : 1 };
        })()
      : {};

    const users = await User.find()
      .select('-password')
      .limit(+limit)
      .skip(+offset)
      .sort(sort);
    res.json({
      data: users,
      total: users.length
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});