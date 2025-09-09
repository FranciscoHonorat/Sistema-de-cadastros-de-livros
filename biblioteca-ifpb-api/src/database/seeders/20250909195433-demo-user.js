'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        name: 'Admin',
        email: 'admin@ifpb.edu.br',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'João Silva',
        email: 'joao.silva@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maria Oliveira',
        email: 'maria.oliveira@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pedro Santos',
        email: 'pedro.santos@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ana Souza',
        email: 'ana.souza@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lucas Lima',
        email: 'lucas.lima@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Carla Mendes',
        email: 'carla.mendes@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rafael Costa',
        email: 'rafael.costa@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Juliana Rocha',
        email: 'juliana.rocha@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bruno Martins',
        email: 'bruno.martins@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fernanda Alves',
        email: 'fernanda.alves@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gabriel Ferreira',
        email: 'gabriel.ferreira@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Patrícia Dias',
        email: 'patricia.dias@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rodrigo Nunes',
        email: 'rodrigo.nunes@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Camila Teixeira',
        email: 'camila.teixeira@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vinícius Barros',
        email: 'vinicius.barros@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Larissa Gomes',
        email: 'larissa.gomes@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Thiago Pinto',
        email: 'thiago.pinto@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aline Ribeiro',
        email: 'aline.ribeiro@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eduardo Cardoso',
        email: 'eduardo.cardoso@ifpb.edu.br',
        password: 'senha123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
