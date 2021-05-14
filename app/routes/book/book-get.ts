import express from 'express';

const router = express.Router();

export default router.get("/users/:userId/books/:bookId", async (req, res) => {
  // try {
  //   const user = await User.findById(req.params.id).select('-password');
  //   res.json(user);
  // } catch (e) {
  //   res.send({ message: "Error in Fetching user" });
  // }
  console.log(req.params);
});
