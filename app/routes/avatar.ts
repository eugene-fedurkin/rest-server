import express from 'express';
import multer from 'multer';
import imageFilter from '../helpers/image-filter';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'app/uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({ storage: storage, fileFilter: imageFilter }).single('upload');

export default router.post('/upload', async(req, res) => {
    upload(req, res, function(err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any
    console.log(req.file)

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

      // Display uploaded image for user validation
      res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
  });
});