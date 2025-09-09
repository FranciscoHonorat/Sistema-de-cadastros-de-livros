'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Buscar todos os usuários
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users;',  // Mudei para 'users'
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Buscar livros disponíveis
    const books = await queryInterface.sequelize.query(
      'SELECT id FROM books WHERE available = true;',  // Mudei para 'books'
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (users.length === 0 || books.length === 0) {
      console.log('⚠️ Não há usuários ou livros disponíveis para criar empréstimos');
      return;
    }

    const loans = [];
    const bookUpdates = [];

    // Criar empréstimos
    for (let i = 0; i < Math.min(5, users.length, books.length); i++) {
      const userId = users[i].id;
      const bookId = books[i].id;
      
      loans.push({
        userId: userId,
        bookId: bookId,
        loanDate: new Date(),
        returnDate: i % 2 === 0 ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Marcar livro como indisponível
      bookUpdates.push(
        queryInterface.sequelize.query(
          `UPDATE books SET available = false WHERE id = ${bookId}`  // Mudei para 'books'
        )
      );
    }

    // Executar todas as operações
    await queryInterface.bulkInsert('loans', loans, {});  // Mudei para 'loans'
    await Promise.all(bookUpdates);
    
    console.log(`✅ ${loans.length} empréstimos criados e livros atualizados`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('loans', null, {});  // Mudei para 'loans'
  }
};