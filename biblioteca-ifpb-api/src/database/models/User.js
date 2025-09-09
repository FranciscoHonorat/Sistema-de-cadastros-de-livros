'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Loan, {
        foreignKey: 'userId',
      });
      User.hasMany(models.Fine, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email inválido'
        }
      }
    },
    
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    paranoid: true
  });
  return User;
};