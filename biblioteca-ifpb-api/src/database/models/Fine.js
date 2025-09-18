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
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: 'A multa precisa ter um valor'},
        isFloat: { msg: 'O valor da multa deve ser um número válido'},
        min: {
          args: [0],
          msg: 'O valor da multa não pode ser negativo'
        },
        max: {
          args: [1000],
          msg: 'O valor da multa não pode ser maior que 1000'
        }
      }
    },
    status: {
      type: DataTypes.ENUM('unpaid', 'paid'),
      allowNull: false,
      defaultValue: 'unpaid',
      validate: {
        isIn: {
          args: [['unpaid', 'paid']],
          msg: 'Status inválido. Deve ser "unpaid" ou "paid"'
        }
      },
      notNull: { msg: 'A multa precisa ter um status'
    }
  }
}, {
    sequelize,
    modelName: 'Fine',
    tableName: 'fines',
    paranoid: false
  });
  return Fine;
};