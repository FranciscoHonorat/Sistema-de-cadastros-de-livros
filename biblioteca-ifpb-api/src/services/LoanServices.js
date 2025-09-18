const { Loan, Book, Fine, sequelize } = require('../database/models');
const { Op } = require('sequelize');

class LoanServices {

  async createLoan(userId, bookId, loanPeriodDays = 30) {
    const book = await Book.findByPk(bookId);
    if (!book) throw new Error('Livro não encontrado');
    if (book.status && book.status !== 'Disponível') {
      throw new Error('Livro não está disponível');
    }

    const activeCount = await Loan.count({
      where: { userId, status: { [Op.in]: ['Active', 'Overdue'] } }
    });
    if (activeCount >= 3) throw new Error('Limite de empréstimos atingido (3)');

    const loanDate = new Date();
    const dueDate = new Date(loanDate);
    dueDate.setDate(dueDate.getDate() + loanPeriodDays);

    const t = await sequelize.transaction();
    try {
      const loan = await Loan.create({
        userId,
        bookId,
        loanDate,
        dueDate,
        status: 'Active'
      }, { transaction: t });

      await book.update({ status: 'Emprestado' }, { transaction: t });

      await t.commit();
      return loan;
    } catch (err) {
      await t.rollback();
      throw new Error('Erro ao criar empréstimo: ' + err.message);
    }
  }

  async updateLoanStatus(loanId, status) {
    const loan = await Loan.findByPk(loanId);
    if (!loan || !['Active','Overdue'].includes(loan.status)) {
      throw new Error('Emprestimo não encontrado ou já foi devolvido');
    }
    await loan.update({ status });
    return loan;
  }

  async getOverdueLoans() {
    const now = new Date();
    return Loan.findAll({
      where: {
        dueDate: { [Op.lt]: now },
        status: { [Op.in]: ['Active','Overdue'] }
      },
      include: [{ model: Book, attributes: ['id','title','author'] }]
    });
  }

  async returnLoan(loanId) {
    const loan = await Loan.findOne({
      where: { id: loanId, status: { [Op.in]: ['Active','Overdue'] } },
      include: [{ model: Book }]
    });
    if (!loan) throw new Error('Empréstimo não encontrado');

    const returnDate = new Date();
    let fineAmount = 0;
    if (returnDate > loan.dueDate) {
      const daysLate = Math.ceil((returnDate - loan.dueDate) / 86400000);
      fineAmount = daysLate * 0.5;
    }

    const t = await sequelize.transaction();
    try {
      await loan.update({ returnDate, status: 'Returned' }, { transaction: t });
      if (loan.Book) {
        await loan.Book.update({ status: 'Disponível' }, { transaction: t });
      }
      let fine = null;
      if (fineAmount > 0) {
        fine = await Fine.create({
          userId: loan.userId,
            loanId: loan.id,
            amount: fineAmount,
            status: 'Pending'
        }, { transaction: t });
      }
      await t.commit();
      return { loan, fine };
    } catch (err) {
      await t.rollback();
      throw new Error('Erro ao devolver: ' + err.message);
    }
  }

  async getUserLoans(userId, status) {
    const where = { userId };
    if (status) where.status = status;
    return Loan.findAll({
      where,
      include: [
        { model: Book, attributes: ['id','title','author'] },
        { model: Fine, required: false }
      ],
      order: [['loanDate','DESC']]
    });
  }
}

module.exports = LoanServices;
