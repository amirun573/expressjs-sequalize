const jwt = require ('jsonwebtoken');

const UserService = require ('../services/user');
const userService = new UserService ();
class AuthMiddleWare {
  async middleware (req, res, next) {
    try {
      const {authorization} = req.headers;

      if (!authorization) {
        throw {
          statusCode: 400,
          message: 'Not Authenticated with Access Token.',
        };
      }

      const auth = await userService.validateToken (authorization);

      if (!auth) {
        throw {
          statusCode: 400,
          message: 'JWT Not Authenticate.',
        };
      }

      if (!auth || !auth.userName) {
        throw {
          statusCode: 400,
          status: false,
          message: 'User Not Found',
        };
      }

      const user = await userService.getUserByUserName (auth.userName);

      if (!user) {
        throw {
          statusCode: 400,
          status: false,
          message: 'User Not Found',
        };
      }

      req.user = user;

      next ();
    } catch (error) {
      console.log ('Error==>', error);
      return res.status (error.statusCode).json ({message: error.message});
    }
  }
}

module.exports = AuthMiddleWare;
