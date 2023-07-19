const jwt = require ('jsonwebtoken');
const {split} = require ('lodash');
const bcrypt = require ('bcrypt');

const User = require ('../../models/user');
const UserProfile = require ('../../models/userprofile');

class UserService {
  constructor () {}

  async createUser({firstName, lastName, email, userName, password}) {
    try {
      const encryptedPassword = await this.encryptPassword (password);
      const saveUser = await User.create ({
        userName,
        password: encryptedPassword,
      });

      if (!saveUser) {
        throw new Error ('Cannot create User');
      }

      const saveUserProfile = await UserProfile.create ({
        firstName,
        lastName,
        email,
        userId: saveUser.id,
      });

      if (!saveUserProfile) {
        throw new Error ('Cannot Create User Profile');
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async encryptPassword (password) {
    try {
      const saltRounds = 10; // Number of salt rounds, higher is more secure

      const salt = await bcrypt.genSalt (saltRounds);
      const hash = await bcrypt.hash (password, salt);
      return hash;
    } catch (error) {
      throw new Error ('Error encrypting password');
    }
  }
}

module.exports = UserService;
