import signup from '../models/signup.js';
import Loan from '../models/loan.js';
import farmer from '../models/farmer.js';
import Issue from '../models/issue.js';

class AdminController {
async getAllUsers(req, res) {
    try {
      const users = await signup.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving users', error: err });
    }
  }

  async verifyUser(req, res) {
    try {
      const user = await signup.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true });
      if (!user) return res.status(404).json({ message: 'signup not found' });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error verifying user', error: err });
    }
  }

 async getAllLoans(req, res) {
    try {
      const loans = await Loan.find().populate('farm');
      res.status(200).json(loans);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving loans', error: err });
    }
  }

  async getAllFarms(req, res) {
    try {
      const farms = await farmer.find().populate('farmer');
      res.status(200).json(farms);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving farms', error: err });
    }
  }

   async getAllIssues(req, res) {
    try {
      const issues = await Issue.find().populate('user');
      res.status(200).json(issues);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving issues', error: err });
    }
  }
}

export default new AdminController();