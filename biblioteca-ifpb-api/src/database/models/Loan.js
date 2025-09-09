'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    static associate(models) {
      Loan.belongsTo(models.User, { foreignKey: 'userId' });
      Loan.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }
  
  Loan.init({
    loanDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Loan',
    tableName: 'loans',
    paranoid: true
  });
  return Loan;
};