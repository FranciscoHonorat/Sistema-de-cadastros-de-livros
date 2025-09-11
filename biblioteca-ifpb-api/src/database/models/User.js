'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Loan, {
        foreignKey: 'userId',
      });
      User.hasMany(models.Fine, {
        foreignKey: 'userId'
      });
    }

    // Método de instância para verificar senha
    async checkPassword(password) {
      return await bcrypt.compare(password, this.password);
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
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Nome é obrigatório'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email já cadastrado'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email inválido'
        },
        notEmpty: {
          msg: 'Email é obrigatório'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Senha é obrigatória'
        },
        len: {
          args: [6, 100],
          msg: 'Senha deve ter pelo menos 6 caracteres'
        }
      }
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
      allowNull: false,
      validate: {
        isIn: {
          args: [['user', 'admin']],
          msg: 'Função deve ser user ou admin'
        }
      }
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Matrícula já cadastrada'
      },
      validate: {
        notEmpty: {
          msg: 'Matrícula é obrigatória'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] }
      }
    },
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  return User;
};