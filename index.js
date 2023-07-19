const express = require ('express');
const app = express ();
const port = 3000;
const bodyParser = require ('body-parser');
const UserController = require ('./src/controllers/user');
require ('dotenv').config ();

const userController = new UserController ();
app.use (bodyParser.json ());

app.get ('/', (req, res) => {
  res.send ('Hello World!');
});

app.post ('/create/user', async (req, res) => {
  const respond = await userController.createUser (req, res);

  return res.status (respond.statusCode).json (respond).send ();
});

app.listen (port, () => {
  console.log (`Example app listening on port ${port}`);
});
