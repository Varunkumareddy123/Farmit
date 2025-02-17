import Issue from '../models/issue.js';

class IssueController {
  async reportIssue(req, res) {
    const {user, issueTitle, issueDiscription } = req.body;
    try {
      const newIssue = new Issue(req.body);
      await newIssue.save();
      res.status(201).json(newIssue);
    } catch (err) {
      res.status(500).json({ message: 'Error reporting issue', error: err });
    }
  }

  async getAllIssues(req, res) {
    try {
      const issues = await Issue.find();
      res.status(200).json(issues);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving issues', error: err });
    }
  }
}

export default new IssueController();