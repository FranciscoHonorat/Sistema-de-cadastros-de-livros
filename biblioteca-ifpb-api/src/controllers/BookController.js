const BookServices = require('../services/BookServices');

class BookController {
  
  // Listar todos os livros
  async getAllBooks(req, res) {
    try {
      const filters = {
        category: req.query.category,
        author: req.query.author,
        title: req.query.title,
        status: req.query.status
      };
      
      // Remove filtros vazios
      Object.keys(filters).forEach(key => {
        if (!filters[key]) delete filters[key];
      });
      
      const books = await BookServices.getAllBooks(filters);
      
      return res.status(200).json({
        success: true,
        message: 'Livros listados com sucesso',
        data: books,
        total: books.length
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
  
  // Buscar livro por ID
  async getBookById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID do livro inválido'
        });
      }
      
      const book = await BookServices.getBookById(id);
      
      return res.status(200).json({
        success: true,
        message: 'Livro encontrado',
        data: book
      });
    } catch (error) {
      if (error.message === 'Livro não encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
  
  // Criar novo livro (apenas admin)
  async createBook(req, res) {
    try {
      const { title, author, publisher, category, version } = req.body;
      
      // Validações básicas
      if (!title || !author || !publisher || !category) {
        return res.status(400).json({
          success: false,
          message: 'Título, autor, editora e categoria são obrigatórios'
        });
      }
      
      const bookData = {
        title: title.trim(),
        author: author.trim(),
        publisher: publisher.trim(),
        category: category.trim(),
        version: version || 1.0
      };
      
      const newBook = await BookServices.createBook(bookData);
      
      return res.status(201).json({
        success: true,
        message: 'Livro criado com sucesso',
        data: newBook
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
  
  // Atualizar livro (apenas admin)
  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID do livro inválido'
        });
      }
      
      // Remove campos vazios do updateData
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === '' || updateData[key] === null || updateData[key] === undefined) {
          delete updateData[key];
        }
      });
      
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Nenhum dado válido fornecido para atualização'
        });
      }
      
      const updatedBook = await BookServices.updateBook(id, updateData);
      
      return res.status(200).json({
        success: true,
        message: 'Livro atualizado com sucesso',
        data: updatedBook
      });
    } catch (error) {
      if (error.message === 'Livro não encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
  
  // Atualizar status do livro (admin e sistema)
  async updateBookStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID do livro inválido'
        });
      }
      
      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status é obrigatório'
        });
      }
      
      const updatedBook = await BookServices.updateBookStatus(id, status);
      
      return res.status(200).json({
        success: true,
        message: 'Status do livro atualizado com sucesso',
        data: updatedBook
      });
    } catch (error) {
      if (error.message === 'Livro não encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
  
  // Deletar livro (apenas admin)
  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID do livro inválido'
        });
      }
      
      const result = await BookServices.deleteBook(id);
      
      return res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      if (error.message === 'Livro não encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
  
  // Listar livros disponíveis
  async getAvailableBooks(req, res) {
    try {
      const books = await BookServices.getAvailableBooks();
      
      return res.status(200).json({
        success: true,
        message: 'Livros disponíveis listados com sucesso',
        data: books,
        total: books.length
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
  
  // Listar livros por categoria
  async getBooksByCategory(req, res) {
    try {
      const { category } = req.params;
      
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Categoria é obrigatória'
        });
      }
      
      const books = await BookServices.getBooksByCategory(category);
      
      return res.status(200).json({
        success: true,
        message: `Livros da categoria "${category}" listados com sucesso`,
        data: books,
        total: books.length
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
  
  // Obter estatísticas dos livros
  async getBookStats(req, res) {
    try {
      const stats = await BookServices.getBookStats();
      
      return res.status(200).json({
        success: true,
        message: 'Estatísticas dos livros obtidas com sucesso',
        data: stats
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new BookController();