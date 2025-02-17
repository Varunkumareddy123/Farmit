import express from 'express';
import {AuthMiddleware,  checkRole } from '../middleware/auth.js';
import AdminController from '../controllers/adminController.js';
import AuthController from '../controllers/authController.js';
import DocumentController from '../controllers/documentController.js';
import farmerController from '../controllers/farmerController.js';
import InvestmentController from '../controllers/investmentController.js';
import IssueController from '../controllers/issueController.js';
import LoanController from '../controllers/LoanController.js';
import TransactionController from '../controllers/TranscationController.js';
import UserController from '../controllers/UserController.js';


const router = express.Router();

// Admin Routes
router.get('/admin/users', AuthMiddleware, checkRole(['admin']), AdminController.getAllUsers);
router.put('/admin/users/:id',AuthMiddleware, checkRole(['admin']), AdminController.verifyUser);
router.get('/admin/loans', AuthMiddleware, checkRole(['admin']), AdminController.getAllLoans);
router.get('/admin/farms', AuthMiddleware, checkRole(['admin']), AdminController.getAllFarms);
router.get('/admin/issues', AuthMiddleware, checkRole(['admin']), AdminController.getAllIssues);

// Auth Routes
router.post('/auth/signup', AuthController.createUser);
router.post('/auth/login', AuthController.loginUser);

// Document Routes
router.post('/documents/upload', AuthMiddleware,checkRole(['farmer','investor']), DocumentController.uploadDocument);
router.get('/documents', AuthMiddleware, DocumentController.getMyDocuments);
router.delete('/documents/:id', AuthMiddleware, DocumentController.deleteDocument);

// Farm Routes
router.get('/farms/my', AuthMiddleware, checkRole(['farmer']), farmerController.getMyFarms);
router.post('/farms', AuthMiddleware,checkRole(['farmer']), farmerController.createFarm);
router.put('/farms/:id', AuthMiddleware, checkRole(['farmer']), farmerController.updateFarm);

// Investment Routes
router.get('/investments/tracking', AuthMiddleware, checkRole(['investor']), InvestmentController.getInvestments);
router.get('/investments/:id', AuthMiddleware, checkRole(['investor']), InvestmentController.getInvestmentById);

// Issue Routes
router.post('/issues', AuthMiddleware, IssueController.reportIssue);
router.get('/issues', AuthMiddleware, IssueController.getAllIssues);

// Loan Routes
router.get('/loans/my', AuthMiddleware, checkRole(['farmer']), LoanController.getMyLoans);
router.post('/loans', AuthMiddleware, checkRole(['farmer']), LoanController.createLoan);
router.post('/loans/:id/invest', AuthMiddleware, checkRole(['investor']), LoanController.investInLoan);
router.post('/loans/:id/repay', AuthMiddleware, checkRole(['farmer']), LoanController.repayLoan);

// Transaction Routes
router.get('/transactions/my', AuthMiddleware, TransactionController.getTransactions);
router.get('/transactions/analytics', AuthMiddleware, TransactionController.getAnalytics);
router.get('/transactions/:id/details', AuthMiddleware, TransactionController.getTransactionDetails);


// User Routes
router.get('/users/profile', AuthMiddleware, UserController.getUserProfile);
router.put('/users/profile', AuthMiddleware, UserController.updateUserProfile);
router.put('/users/change-password', AuthMiddleware, UserController.changeUserPassword);

export default router;