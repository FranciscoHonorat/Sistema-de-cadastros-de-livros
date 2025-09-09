'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fine.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Fine.belongsTo(models.Loan, {
        foreignKey: 'loanId'
      });
    }
  }
  Fine.init({
    amount: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fine',
    tableName: 'fines',
    paranoid: true
  });
  return Fine;
};