const { Book } = require('../database/models');
const { Op } = require('sequelize');

class BookServices {
  
  // Listar todos os livros com filtros opcionais
  async getAllBooks(filters = {}) {
    try {
      const where = {};
      
      // Filtro por categoria
      if (filters.category) {
        where.category = {
          [Op.iLike]: `%${filters.category}%`
        };
      }
      
      // Filtro por autor
      if (filters.author) {
        where.author = {
          [Op.iLike]: `%${filters.author}%`
        };
      }
      
      // Filtro por título
      if (filters.title) {
        where.title = {
          [Op.iLike]: `%${filters.title}%`
        };
      }
      
      // Filtro por status
      if (filters.status) {
        where.status = filters.status;
      }
      
      const books = await Book.findAll({
        where,
        order: [['title', 'ASC']],
        include: [{
          association: 'loans',
          attributes: ['id', 'loanDate', 'returnDate', 'status']
        }]
      });
      
      return books;
    } catch (error) {
      throw new Error(`Erro ao buscar livros: ${error.message}`);
    }
  }
  
  // Buscar livro por ID
  async getBookById(id) {
    try {
      const book = await Book.findByPk(id, {
        include: [{
          association: 'loans',
          attributes: ['id', 'loanDate', 'returnDate', 'status']
        }]
      });
      
      if (!book) {
        throw new Error('Livro não encontrado');
      }
      
      return book;
    } catch (error) {
      throw new Error(`Erro ao buscar livro: ${error.message}`);
    }
  }
  
  // Criar novo livro
  async createBook(bookData) {
    try {
      const newBook = await Book.create({
        title: bookData.title,
        author: bookData.author,
        publisher: bookData.publisher,
        category: bookData.category,
        status: bookData.status || 'Disponível',
        version: bookData.version || 1.0
      });
      
      return newBook;
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(err => err.message);
        throw new Error(`Dados inválidos: ${messages.join(', ')}`);
      }
      throw new Error(`Erro ao criar livro: ${error.message}`);
    }
  }
  
  // Atualizar livro
  async updateBook(id, updateData) {
    try {
      const book = await Book.findByPk(id);
      
      if (!book) {
        throw new Error('Livro não encontrado');
      }
      
      const updatedBook = await book.update(updateData);
      return updatedBook;
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(err => err.message);
        throw new Error(`Dados inválidos: ${messages.join(', ')}`);
      }
      throw new Error(`Erro ao atualizar livro: ${error.message}`);
    }
  }
  
  // Atualizar status do livro
  async updateBookStatus(id, status) {
    try {
      const book = await Book.findByPk(id);
      
      if (!book) {
        throw new Error('Livro não encontrado');
      }
      
      const validStatuses = ['Disponível', 'Emprestado', 'Reservado', 'Indisponível'];
      if (!validStatuses.includes(status)) {
        throw new Error('Status inválido');
      }
      
      const updatedBook = await book.update({ status });
      return updatedBook;
    } catch (error) {
      throw new Error(`Erro ao atualizar status do livro: ${error.message}`);
    }
  }
  
  // Deletar livro (soft delete)
  async deleteBook(id) {
    try {
      const book = await Book.findByPk(id);
      
      if (!book) {
        throw new Error('Livro não encontrado');
      }
      
      // Verificar se o livro está emprestado
      if (book.status === 'Emprestado') {
        throw new Error('Não é possível deletar um livro que está emprestado');
      }
      
      await book.destroy();
      return { message: 'Livro deletado com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao deletar livro: ${error.message}`);
    }
  }
  
  // Buscar livros disponíveis
  async getAvailableBooks() {
    try {
      const books = await Book.findAll({
        where: {
          status: 'Disponível'
        },
        order: [['title', 'ASC']]
      });
      
      return books;
    } catch (error) {
      throw new Error(`Erro ao buscar livros disponíveis: ${error.message}`);
    }
  }
  
  // Buscar livros por categoria
  async getBooksByCategory(category) {
    try {
      const books = await Book.findAll({
        where: {
          category: {
            [Op.iLike]: `%${category}%`
          }
        },
        order: [['title', 'ASC']]
      });
      
      return books;
    } catch (error) {
      throw new Error(`Erro ao buscar livros por categoria: ${error.message}`);
    }
  }
  
  // Contar livros por status
  async getBookStats() {
    try {
      const stats = await Book.findAll({
        attributes: [
          'status',
          [Book.sequelize.fn('COUNT', Book.sequelize.col('id')), 'count']
        ],
        group: ['status']
      });
      
      return stats;
    } catch (error) {
      throw new Error(`Erro ao obter estatísticas dos livros: ${error.message}`);
    }
  }
}

module.exports = new BookServices();