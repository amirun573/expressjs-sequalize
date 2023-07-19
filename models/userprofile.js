'use strict';
const {Model} = require ('sequelize');
const {User} = require ('./user');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      UserProfile.belongsTo (models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  UserProfile.init (
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserProfile',
    }
  );

  UserProfile.belongsTo (User, {
    foreignKey: 'user_id',
    as: 'user',
  });

  UserProfile.sync ({alter: true, force: true});
  return UserProfile;
};
