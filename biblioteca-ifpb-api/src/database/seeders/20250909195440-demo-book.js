'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Book', [
      {
        title: 'O Pequeno Príncipe',
        author: 'Antoine de Saint-Exupéry',
        isbn: '978-3-16-148410-0',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Dom Casmurro',
        author: 'Machado de Assis',
        isbn: '978-85-359-0277-7',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Capitães da Areia',
        author: 'Jorge Amado',
        isbn: '978-85-01-02250-1',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'A Moreninha',
        author: 'Joaquim Manuel de Macedo',
        isbn: '978-85-16-00001-1',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Memórias Póstumas de Brás Cubas',
        author: 'Machado de Assis',
        isbn: '978-85-359-0278-4',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'O Cortiço',
        author: 'Aluísio Azevedo',
        isbn: '978-85-16-00002-8',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Senhora',
        author: 'José de Alencar',
        isbn: '978-85-16-00003-5',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Iracema',
        author: 'José de Alencar',
        isbn: '978-85-16-00004-2',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'O Guarani',
        author: 'José de Alencar',
        isbn: '978-85-16-00005-9',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Vidas Secas',
        author: 'Graciliano Ramos',
        isbn: '978-85-16-00006-6',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Book', null, {});
  }
};
