// Ajuste de import dos models
const { Loan, Book, User, Fine, sequelize } = require('../database/models');
const LoanServices = require('../services/LoanServices');
const loanServices = new LoanServices();

class LoanController {
  async createLoan(req, res) {
    try {
      const { bookId, loanPeriodDays } = req.body;
      const userId = req.user && req.user.id;
      if (!userId) return res.status(401).json({ success: false, message: 'Não autenticado' });
      if (!bookId) return res.status(400).json({ success: false, message: 'bookId obrigatório' });
      const loan = await loanServices.createLoan(userId, bookId, loanPeriodDays);
      return res.status(201).json({ success: true, data: loan });
    } catch (e) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }

  async getUserLoans(req, res) {
    try {
      const userId = req.user && req.user.id;
      if (!userId) return res.status(401).json({ success: false, message: 'Não autenticado' });
      const { status } = req.query;
      const loans = await loanServices.getUserLoans(userId, status);
      return res.status(200).json({ success: true, data: loans });
    } catch (e) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }

  async returnLoan(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ success: false, message: 'ID inválido' });
      const result = await loanServices.returnLoan(id);
      return res.status(200).json({ success: true, data: result });
    } catch (e) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }

  async getAllLoans(req, res) {
    try {
      // pode adicionar paginação depois
      const loans = await loanServices.getUserLoans(req.query.userId || 0, req.query.status); // placeholder simples
      return res.status(200).json({ success: true, data: loans });
    } catch (e) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }

  async getOverdueLoans(req, res) {
    try {
      const loans = await loanServices.getOverdueLoans();
      return res.status(200).json({ success: true, data: loans });
    } catch (e) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }
}

module.exports = new LoanController();
