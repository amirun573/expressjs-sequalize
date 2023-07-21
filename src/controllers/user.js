const Joi = require ('joi');
const redis = require ('../services/redis');
const UserService = require ('../services/user');

const userService = new UserService ();
let response = {
  statusCode: 200,
  message: 'Success',
};

class UserController {
  constructor () {}

  async createUser (req, res) {
    try {
      const bodySchema = Joi.object ({
        firstName: Joi.string ().required (),
        lastName: Joi.string ().required (),
        email: Joi.string ().required (),
        userName: Joi.string ().required (),
        password: Joi.string ().required (),
      });

      // Validate the request body
      const {value, error} = bodySchema.validate (req.body);

      if (error) {
        // Validation failed, send an error response
        response.statusCode = 400;
        response.message = error.message;
        throw response;
      }

      const saveUser = await userService.createUser (value);

      if (!saveUser.status) {
        response.message = 'Cannot create User';

        throw response;
      }
      return response;
    } catch (error) {
      response.statusCode = 400;
      response.message = JSON.stringify (error);
    }
    return response;
  }

  async loginUser (req, res) {
    try {
      const bodySchema = Joi.object ({
        userName: Joi.string ().required (),
        password: Joi.string ().required (),
      });

      // Validate the request body
      const {value, error} = bodySchema.validate (req.body);

      if (error) {
        // Validation failed, send an error response
        response.statusCode = 400;
        response.message = error.message;
        throw response;
      }

      const {userName, password} = value;

      const user = await userService.getUserByUserName (userName);

      if (!user) {
        response.statusCode = 400;
        response.message = 'User Not Found';
        throw response;
      }

      const encryptedPassword = await userService.comparePassword (
        password,
        user.password
      );

      if (!encryptedPassword) {
        response.statusCode = 400;
        response.message = 'Invalid Username/ Password';
        throw response;
      }

      const accessToken = await userService.generateJWTToken ({
        userName,
      });

      const refreshToken = await userService.generateJWTToken (
        {
          userName,
        },
        false
      );

      response.message = {
        accessToken,
        refreshToken,
      };

      return response;
    } catch (error) {
      return response;
    }
  }

  
}

module.exports = UserController;
