import User from './../models/user';
import express from 'express';
import auth from '../middleware/auth';

const router = express.Router();

export const me = router.get("/me", auth, async (req, res) => {
  try {
    console.log(req.user);
    // const user = await User.findById(req.user.id);
    // res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});