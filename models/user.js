const {Sequelize, Model, DataTypes} = require ('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require (__dirname + '/../config/config.json')[env];
const UserProfile = require ('./userprofile');
const Note = require ('./note');
const sequelize = new Sequelize (
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
  }
);

class User extends Model {}
User.init (
  {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {sequelize, modelName: 'user', tableName: 'users'}
);

User.hasOne (UserProfile, {
  foreignKey: 'userId',
  as: 'userProfile',
});

User.hasOne (Note, {
  foreignKey: 'userId',
  as: 'notes',
});

UserProfile.belongsTo (User, {
  foreignKey: 'userId',
  as: 'user',
});

// Perform the database connection
// sequelize
//   .authenticate ()
//   .then (() => {
//     console.log ('Connected to the database.');
//   })
//   .catch (error => {
//     console.error ('Unable to connect to the database:', error);
//   });

module.exports = User;
