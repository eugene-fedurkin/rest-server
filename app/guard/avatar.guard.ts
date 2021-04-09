import express from 'express';

const router = express.Router();

export default router.all('/avatars/*', function(req, res, next) {
  // TODO: add logic for authenticate user
  next()
});
