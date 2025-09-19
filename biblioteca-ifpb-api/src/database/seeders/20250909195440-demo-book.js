'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('books', [
      {
        title: 'O Pequeno Príncipe',
        author: 'Antoine de Saint-Exupéry',
        publisher: 'Gallimard',
        category: 'Fábula',
        version: 1.0,
        status: 'Disponível',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Dom Casmurro',
        author: 'Machado de Assis',
        publisher: 'Garnier',
        category: 'Romance',
        version: 1.0,
        status: 'Disponível',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Capitães da Areia',
        author: 'Jorge Amado',
        publisher: 'Companhia das Letras',
        category: 'Romance',
        version: 1.0,
        status: 'Disponível',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'A Moreninha',
        author: 'Joaquim Manuel de Macedo',
        publisher: 'Editora Martin Claret',
        category: 'Romance',
        version: 1.0,
        status: 'Disponível',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Memórias Póstumas de Brás Cubas',
        author: 'Machado de Assis',
        publisher: 'Garnier',
        category: 'Romance',
        version: 1.0,
        status: 'Disponível',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'O Cortiço',
        author: 'Aluísio Azevedo',
        publisher: 'Editora Martin Claret',
        category: 'Naturalismo',
        version: 1.0,
        status: 'Disponível',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Senhora',
        author: 'José de Alencar',
        publisher: 'Editora Martin Claret',
        category: 'Romance',
        version: 1.0,
        status: 'Disponível',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Iracema',
        author: 'José de Alencar',
        publisher: 'Editora Martin Claret',
        category: 'Romance',
        version: 1.0,
        status: 'Disponível',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'O Guarani',
        author: 'José de Alencar',
        publisher: 'Editora Martin Claret',
        category: 'Romance',
        version: 1.0,
        status: 'Disponível',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Vidas Secas',
        author: 'Graciliano Ramos',
        publisher: 'Record',
        category: 'Romance',
        version: 1.0,
        status: 'Disponível',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('books', null, {});
  }
};
