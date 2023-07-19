const Joi = require ('joi');

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

      if (!saveUser) {
        response.message = 'Cannot create User';
        response.statusCode = 400;

        throw response;
      }
      return response;
    } catch (error) {
      response.message = JSON.stringify (error);
    }
    return response;
  }
}

module.exports = UserController;
