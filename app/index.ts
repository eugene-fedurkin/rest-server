import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import InitiateMongoServer from '../config/db';
import me from './routes/me';
import signIn from './routes/sign-in';
import signUp from './routes/sign-up';
import avatar from './routes/avatar';
import avatarGuard from './guard/avatar.guard';

// InitiateMongoServer();

const app = express();
const PORT = process.env.PORT || 4000;

const corsSettings = cors({ origin: 'http://localhost:4200' });

app.use(bodyParser.json());
app.use(avatarGuard);
app.use(express.static('uploads'));
app.use(corsSettings);
app.use('/auth', signUp);
app.use('/auth', signIn);
app.use('/auth', me);
app.use('', avatar);


app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});