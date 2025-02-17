import Loan from '../models/loan.js';

class investmentController {
  async getInvestments(req, res) {
    try {
      const investments = await Loan.aggregate([
        { $match: { 'investors.investor': req.user._id } },
        { $unwind: '$investors' },
        { $match: { 'investors.investor': req.user._id } }
      ]);
      res.status(200).json(investments);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving investments', error: err });
    }
  }

  async getInvestmentById(req, res) {
    try {
      const investment = await Loan.findById(req.params.id).populate('farm');
      if (!investment) return res.status(404).json({ message: 'Investment not found' });
      res.status(200).json(investment);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving investment', error: err });
    }
  }
}

export default new investmentController();