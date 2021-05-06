import express from 'express';
import multer from 'multer';
import path from 'path';

import imageFilter from '../helpers/image-filter';
import auth from '../middleware/auth';
import User from './../models/user';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/avatars');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({ storage: storage, fileFilter: imageFilter }).single('upload');

export default router.post('/upload', auth, async(req, res) => {
    upload(req, res, async function(err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

      const error = (req as any).fileValidationError;
      if (error) {
        return res.send(error);
      }
      else if (!req.file) {
        return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
        return res.send(err);
      }
      else if (err) {
        return res.send(err);
      }

      if (!req.user?.id) {
        return res.send('User not found');
      }
      if (req.user?.id) {
        const staticFolderName = 'uploads/'; // TODO: move it to const
        console.log(req.file.path.slice(staticFolderName.length))
        await User.updateOne(
          { _id: req.user.id },
          { $set: { avatar: req.file.path.slice(staticFolderName.length) } }
        );
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
      }
  });
});