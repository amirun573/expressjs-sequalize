'use strict';
const {Model} = require ('sequelize');
const {UserProfile} = require ('./userprofile');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasOne (models.UserProfile, {
        foreignKey: 'userId',
        as: 'profile',
      });
    }
  }
  User.init (
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );

  User.hasOne (UserProfile, {
    foreignKey: 'userId',
    as: 'userProfile',
  });

  User.sync ({alter: true, force: true});
  return User;
};
