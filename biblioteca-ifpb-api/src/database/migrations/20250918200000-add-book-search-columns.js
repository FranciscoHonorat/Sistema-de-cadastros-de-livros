'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Books', 'titleSearch', { type: Sequelize.STRING });
    await queryInterface.addColumn('Books', 'authorSearch', { type: Sequelize.STRING });
    await queryInterface.addColumn('Books', 'categorySearch', { type: Sequelize.STRING });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('Books', 'titleSearch');
    await queryInterface.removeColumn('Books', 'authorSearch');
    await queryInterface.removeColumn('Books', 'categorySearch');
  }
};