import { IUser } from './../models/user';
import jwt from 'jsonwebtoken';

export default function(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  const parsedToken = token.split(' ');
  const t = parsedToken[1];

  try {
    const decoded = jwt.verify(t, "secret"); // TODO: change secret
    req.user = (decoded as any).user as IUser;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};