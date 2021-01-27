import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const InitiateMongoServer = require("../config/db");

InitiateMongoServer();

const signUp = require("./routes/signup");

const app = express();
const PORT = process.env.PORT || 4000;

const corsSettings = cors({ origin: 'http://localhost:3800' });

app.use(bodyParser.json());
app.use(corsSettings);

app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});