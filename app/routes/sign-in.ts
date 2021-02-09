import bcrypt from 'bcryptjs';
import express from 'express';
import * as expressValidator from 'express-validator';
import jwt from 'jsonwebtoken';

import User from './../models/user';

const { check, validationResult } = expressValidator;
const router = express.Router();

export default router.post(
  "/sign-in",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password should be at least 8 characters long").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist",
          relatedField: 'email'
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password!",
          relatedField: 'password'
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);