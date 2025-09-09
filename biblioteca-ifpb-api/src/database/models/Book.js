'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Loan, {
        foreignKey: 'bookId'
      });
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    category: DataTypes.STRING,
    status: DataTypes.STRING,
    version: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    paranoid: true,
  });
  return Book;
};