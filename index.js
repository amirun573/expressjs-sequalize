const express = require ('express');
const app = express ();
const port = 3000;
const bodyParser = require ('body-parser');
const AuthMiddleWare = require ('./src/middleware/auth.middleware');
const UserController = require ('./src/controllers/user');
const NoteController = require ('./src/controllers/note');
const redis = require ('./src/services/redis');

require ('dotenv').config ();

const userController = new UserController ();
const authMiddleWare = new AuthMiddleWare ();
const noteController = new NoteController ();

app.use (bodyParser.json ());

app.get ('/', (req, res) => {
  res.send ('Hello World!');
});

app.post ('/v1/user/create', async (req, res) => {
  return await userController.createUser (req, res);

  //return res.status (respond.statusCode).json (respond).send ();
});

app.post ('/v1/user/login', async (req, res) => {
  return await userController.loginUser (req, res);

  //return res.status (respond.statusCode).json (respond).send ();
});

app.use ('/v1/', (req, res, next) => {
  return authMiddleWare.middleware (req, res, next);
});

app.post ('/v1/note/create', async (req, res) => {
  return await noteController.createNote (req, res);
});

app.get ('/v1/note/list', async (req, res) => {
  return await noteController.listNote (req, res);
});

app.get ('/v1/note/:id', async (req, res) => {
  return await noteController.getNoteByNoteId (req, res);
});

app.patch ('/v1/note/update', async (req, res) => {
  return await noteController.updateNote (req, res);
});

app.delete ('/v1/note/:id', async (req, res) => {
  return await noteController.deleteNoteByNoteId (req, res);
});

app.listen (port, () => {
  console.log (`Example app listening on port ${port}`);
});
