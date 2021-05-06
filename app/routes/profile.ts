import User from './../models/user';
import express from 'express';

const router = express.Router();

export default router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});
