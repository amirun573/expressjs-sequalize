const {Sequelize, Model, DataTypes} = require ('sequelize');
const User = require ('./user'); // Import User model
const env = process.env.NODE_ENV || 'development';
const config = require (__dirname + '/../config/config.json')[env];
const sequelize = new Sequelize (
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
  }
);

class UserProfile extends Model {}
UserProfile.init (
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {sequelize, modelName: 'UserProfile', tableName: 'userprofiles'}
);

// UserProfile.belongsTo (User, {
//   foreignKey: 'userId',
//   as: 'user',
// });

UserProfile.sync ({alter: false, force: false});


module.exports = UserProfile;
