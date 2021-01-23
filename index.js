const express = require("express");
const bodyParser = require("body-parser");
const corsLib = require('cors');

const InitiateMongoServer = require("./config/db");

InitiateMongoServer();

const signUp = require("./routes/signup");

const app = express();
const PORT = process.env.PORT || 4000;

const cors = corsLib({ origin: 'http://localhost:3800' });

app.use(bodyParser.json());
app.use(cors);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});