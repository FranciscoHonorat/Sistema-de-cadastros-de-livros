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
        foreignKey: 'bookId',
        as: 'loans'
      });
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'O livro precisa ter um título'},
        notEmpty: { msg: 'O título não pode ser vazio'},
        len: {
          args: [1, 255],
          msg: 'O título deve ter pelo menos 1 caractere!'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'O livro precisa ter um autor'}
      }

    },
    publisher: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'O livro precisa ter uma data de publicação'},
        isDate: { msg: 'Data de publicação inválida'},
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'O livro precisa ter uma categoria'},
        notEmpty: { msg: 'A categoria não pode ser vazia'},
        len: {
          args: [3, 100],
          msg: 'A categoria deve ter entre 3 e 100 caracteres!'
        }
      }
    },
    status: {
      type: DataTypes.ENUM('Disponível', 'Emprestado', 'Reservado', 'Indisponível'),
      allowNull: false,
      defaultValue: 'Disponível',
      validate: {
        isIn: {
          args: [['Disponível', 'Emprestado', 'Reservado', 'Indisponível']],
          msg: 'Status deve ser Disponível, Emprestado, Reservado ou Indisponível'
        }
      }
    },
    version: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1.0,
      validate: {
        isFloat: { msg: 'A versão deve ser um número decimal'},
        min: {
          args: [1.0],
          msg: 'A versão deve ser no mínimo 1.0'
        },
        max: {
          args: [10.0],
          msg: 'A versão deve ser no máximo 10.0'
        }
      }
    },

  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    paranoid: true,
  });
  return Book;
};