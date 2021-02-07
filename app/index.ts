import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import InitiateMongoServer from '../config/db';
import { signUp } from './routes/sign-up';
import { signIn } from './routes/sign-in';

InitiateMongoServer();

const app = express();
const PORT = process.env.PORT || 4000;

const corsSettings = cors({ origin: 'http://localhost:3800' });

app.use(bodyParser.json());
app.use(corsSettings);
app.use(signUp);
app.use(signIn);

app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});