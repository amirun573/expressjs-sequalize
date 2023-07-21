const jwt = require ('jsonwebtoken');
const {split} = require ('lodash');
const bcrypt = require ('bcryptjs');

const User = require ('../../models/user');
const UserProfile = require ('../../models/userprofile');

class UserService {
  constructor () {}

  async createUser({firstName, lastName, email, userName, password}) {
    const response = {
      status: true,
      message: null,
    };

    const checkUserName = await this.getUserByUserName (userName);

    if (checkUserName) {
      throw new Error ('User Name already Exist.');
    }
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

    return response;
  }

  async getUserByUserName (userName) {
    try {
      const user = await User.findOne ({
        where: {
          userName,
        },
        include: {
          model: UserProfile,
          as: 'userProfile',
        },
      });

      if (!user) {
        throw new Error ('User Not Found');
      }

      return user;
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

  async comparePassword (plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare (plainPassword, hashedPassword);
    } catch (error) {
      throw new Error ('Error comparing passwords');
    }
  }

  async generateJWTToken (payload, expired = true) {
    let token = null;
    try {
      if (expired) {
        token = jwt.sign (payload, process.env.secret_key_auth, {
          expiresIn: '1h',
          algorithm: 'HS256',
        });
      } else {
        token = jwt.sign (payload, process.env.secret_key_auth, {
          algorithm: 'HS256',
        });
      }
    } catch (error) {
      console.log ('error==>', error);
    }

    return token;
  }

  async validateToken (authorization) {
    try {
      const bearerToken = split (authorization, ' ');

      if (bearerToken.length != 2) {
        throw {
          message: 'Not Bearer Token Format.',
        };
      }

      const secretKey = process.env.secret_key_auth;
      const token = bearerToken[1];

      const verify = jwt.verify (token, secretKey, (err, decoded) => {
        if (err) {
          // Token verification failed
          return false;
        } else {
          // Token is valid
          return decoded;
        }
      });

      return verify;
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserService;
