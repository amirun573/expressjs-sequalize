const express = require ('express');
const app = express ();
const port = 3000;
const bodyParser = require ('body-parser');
const AuthMiddleWare = require ('./src/middleware/auth.middleware');
const UserController = require ('./src/controllers/user');
require ('dotenv').config ();

const userController = new UserController ();
const authMiddleWare = new AuthMiddleWare ();
app.use (bodyParser.json ());

app.get ('/', (req, res) => {
  res.send ('Hello World!');
});

app.post ('/v1/user/create', async (req, res) => {
  const respond = await userController.createUser (req, res);

  return res.status (respond.statusCode).json (respond).send ();
});

app.post ('/v1/user/login', async (req, res) => {
  const respond = await userController.loginUser (req, res);

  return res.status (respond.statusCode).json (respond).send ();
});

app.use ('/v1/', (req, res, next) => {
  return authMiddleWare.middleware (req, res, next);
});

app.post ('/v1/note/create', async (req, res) => {
  //const respond = await userController.loginUser (req, res);
  return res.send("ok");
  //return res.status (respond.statusCode).json (respond).send ();
});

app.listen (port, () => {
  console.log (`Example app listening on port ${port}`);
});
