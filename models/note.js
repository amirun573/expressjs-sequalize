'use strict';
// const {Model} = require ('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Note extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate (models) {
//       // define association here
//     }
//   }
//   Note.init (
//     {
//       userId: DataTypes.INTEGER,
//       notes: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: 'Note',
//     }
//   );
//   return Note;
// };

const {Sequelize, Model, DataTypes} = require ('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require (__dirname + '/../config/config.json')[env];
const User = require ('./user');
const sequelize = new Sequelize (
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
  }
);

class Note extends Model {}
Note.init (
  {
    userId: DataTypes.INTEGER,
    notes: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Note',
  }
);

// User.hasOne (UserProfile, {
//   foreignKey: 'userId',
//   as: 'userProfile',
// });

// Note.belongsTo (User, {
//   foreignKey: 'userId',
//   as: 'user',
// });

// Perform the database connection
// sequelize
//   .authenticate ()
//   .then (() => {
//     console.log ('Connected to the database.');
//   })
//   .catch (error => {
//     console.error ('Unable to connect to the database:', error);
//   });

module.exports = Note;
