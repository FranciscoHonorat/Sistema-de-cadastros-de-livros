'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Loan', [
      {
        userId: 2,
        bookId: 1,
        loanDate: new Date('2025-09-01'),
        returnDate: new Date('2025-09-10'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        bookId: 2,
        loanDate: new Date('2025-09-02'),
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        bookId: 3,
        loanDate: new Date('2025-09-03'),
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        bookId: 4,
        loanDate: new Date('2025-09-04'),
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 6,
        bookId: 5,
        loanDate: new Date('2025-09-05'),
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Loan', null, {});
  }
};
