'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    static associate(models) {
      Loan.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Loan.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
      Loan.hasOne(models.Fine, { foreignKey: 'loanId', as: 'fine' });
    }

    // Método para verificar se o livro está atrasado:
    isOverdue() {
      if (this.status === 'Returned') return false;
      return new Date() > new Date(this.dueDate);
    }

    // Método para calcular os dias atrasados:
    daysOverdue() {
      if (!this.isOverdue()) return 0;
      const today = new Date();
      const dueDate = new Date(this.dueDate);
      const diffTime = Math.abs(today - dueDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }

  /*
  Loan.js - Conflito entre hooks e validações
Problema: O hook beforeCreate define dueDate se não for fornecido, mas a validação isAfterLoanDate exige que dueDate seja posterior a loanDate.
 Como o hook roda após as validações, a validação pode falhar se dueDate não for passado.

Efeito: Ao criar um empréstimo sem dueDate, a validação será executada antes do hook, resultando em erro.

Sugestão: Pense em como garantir que dueDate seja definido antes das validações. Pesquise sobre hooks beforeValidate no Sequelize.
  */
  
  Loan.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    loanDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: { 
        isDate: {
          msg: 'Data de empréstimo inválida'
        }
      }
    },
    dueDate: { 
      type: DataTypes.DATE,
      allowNull: false,
      validate: { 
        isDate: {
          msg: 'Data de devolução inválida'
        },
        isAfterLoanDate(value) {
          if (new Date(value) <= new Date(this.loanDate)) {
            throw new Error('Data de vencimento deve ser após a data de empréstimo');
          }
        }
      }
    },
    returnDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Data de devolução deve ser uma data válida'
        },
        isAfterLoanDate(value) {
          if (value === null) return; 
          if (value && new Date(value) <= new Date(this.loanDate)) {
            throw new Error('Data de devolução deve ser após a data de empréstimo');
          }
        }
      }
    },
    status: {
      type: DataTypes.ENUM('Active', 'Returned', 'Overdue'),
      defaultValue: 'Active',
      allowNull: false,
      validate: {
        isIn: {
          args: [['Active', 'Returned', 'Overdue']],
          msg: 'Status deve ser Active, Returned ou Overdue'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: 'users',
        key: 'id'
      }
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Loan',
    tableName: 'loans',
    paranoid: true,
    hooks: {
      beforeCreate: (loan) => {
        // Se a data de devolução não for fornecida, define como 30 dias após loanDate
        if (!loan.dueDate) {
          const dueDate = new Date(loan.loanDate || new Date());
          dueDate.setDate(dueDate.getDate() + 30);
          loan.dueDate = dueDate;
        }
      },
      beforeUpdate: (loan) => {
        // Atualiza o status para 'Overdue' se a data de vencimento passou
        if (loan.status === 'Active' && new Date() > new Date(loan.dueDate)) {
          loan.status = 'Overdue';
        }

        // Atualiza o status para 'Returned' se a returnDate for definida
        if (loan.returnDate && loan.status !== 'Returned') {
          loan.status = 'Returned';
        }
      }
    },
    indexes: [
      {
        fields: ['userId']
      },
      { 
        fields: ['bookId']
      },
      {
        fields: ['status']
      }
    ]
  });
  
  return Loan;
};