const Joi = require ('joi');
const redis = require ('../services/redis');
const UserService = require ('../services/user');

const userService = new UserService ();

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
        throw error;
      }

      const saveUser = await userService.createUser (value);

      if (!saveUser.status) {
        throw new Error ('Cannot Create User');
      }
      return res.status (200).send ({message: 'User Successfully Created.'});
    } catch (error) {
      return (
        res
          .status (error.statusCode ? error.statusCode : 400)
          //.json (error ? error : 'Having Problem')
          .send ({message: error.message})
      );
    }
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
        throw error;
      }

      const {userName, password} = value;

      const user = await userService.getUserByUserName (userName);

      if (!user) {
        throw new Error ('No User Found.');
      }

      const encryptedPassword = await userService.comparePassword (
        password,
        user.password
      );

      if (!encryptedPassword) {
        throw new Error ('Invalid Username/Password.');
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

      return res.status (200).send ({accessToken, refreshToken});
    } catch (error) {
      return (
        res
          .status (error.statusCode ? error.statusCode : 400)
          //.json (error ? error : 'Having Problem')
          .send ({message: error.message})
      );
    }
  }
}

module.exports = UserController;
