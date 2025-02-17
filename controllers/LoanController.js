import Loan from '../models/loan.js';
import Transaction from '../models/transcation.js';
import mongoose from 'mongoose';

function generateRepaymentSchedule(amount, interestRate, duration) {
  const monthlyInterest = interestRate / 12 / 100;
  const monthlyPayment =
    (amount * monthlyInterest * Math.pow(1 + monthlyInterest, duration)) /
    (Math.pow(1 + monthlyInterest, duration) - 1);

  const schedule = [];
  let remainingBalance = amount;

  for (let i = 1; i <= duration; i++) {
    const interest = remainingBalance * monthlyInterest;
    const principal = monthlyPayment - interest;
    remainingBalance -= principal;

    schedule.push({
      dueDate: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000),
      amount: monthlyPayment,
      status: "pending",
    });
  }

  return schedule;
}


class LoanController {
  async createLoan(req, res) {
    try {
      const { amount, interestRate, duration } = req.body;

      const loan = await Loan.create({
        ...req.body,
        farmer: req.user.id,
        status: 'pending',
        repaymentSchedule: generateRepaymentSchedule(amount, interestRate, duration),
      });

      res.status(201).json(loan);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

//   async repayLoan(req, res) {
//     try {
//       const { amount } = req.body;
    
//       const loan = await Loan.findById(req.params.id).populate("farmer");

//       if (!loan) {
//           return res.status(404).json({ message: "Loan not found" });
//       }

//       // if (!loan.farm) {
//       //     return res.status(400).json({ message: "Loan farmer is missing in the database" });
//       // }

//       // if (loan.farm._id.toString() !== req.user.id) {
//       //     return res.status(403).json({ message: "Not authorized to repay this loan" });
//       // }

//       if (!loan.amountPaid) {
//           loan.amountPaid = 0;
//       }

//       let newAmountPaid = amount;
//       const totalAmount = loan.amount + (loan.amount * loan.interestRate / 100);

//       loan.amountPaid += newAmountPaid;

//       for (let payment of loan.repaymentSchedule) {
//           if (payment.status === "pending" && newAmountPaid >= payment.amount) {
//               payment.status = "paid";
//               newAmountPaid -= payment.amount;
//           }
//       }

//       if (loan.amountPaid >= totalAmount) {
//           loan.status = 'completed';
//       }

//       await loan.save();

//       const transaction = await Transaction.create({
//           loan: loan._id,
//           from: req.user.id, 
//           to: loan.farmer._id, 
//           // to: loan.farm.owner,
//           amount: req.body.amount,
//           type: "repayment",
//           date: new Date(),
//       });

//       res.status(200).json({ message: "Loan repaid successfully", loan, transaction });
//   } catch (error) {
//       console.error("Repay loan error:", error);
//       res.status(500).json({ message: "Server error", error: error.message });
//   }
// },
// async repayLoan(req, res) {
//   try {
//     const { amount } = req.body;
//     const loan = await Loan.findById(req.params.id);

//     if (!loan) {
//       return res.status(404).json({ message: "Loan not found" });
//     }

//     if (!loan.amountPaid) {
//       loan.amountPaid = 0;
//     }

//     let newAmountPaid = amount;
//     const totalAmount = loan.amount + (loan.amount * loan.interestRate / 100);

//     loan.amountPaid += newAmountPaid;

//     // Loop through repayment schedule to mark payments as 'paid'
//     for (let payment of loan.repaymentSchedule) {
//       if (payment.status === "pending" && newAmountPaid >= payment.amount) {
//         payment.status = "paid";
//         newAmountPaid -= payment.amount;
//       }
//     }

//     // If the loan has been fully paid off, mark it as 'completed'
//     if (loan.amountPaid >= totalAmount) {
//       loan.status = 'completed';
//     }

//     await loan.save();

//     // Fix: Add recipient for 'to' field
//     const recipient = loan.investors.length > 0 ? loan.investors[0].investor : null;
//     //const investor = loan.investors.find(inv => inv.investor && inv.investor._id.toString() === req.body.investor);
    
//     if (!recipient) {
//       return res.status(400).json({ message: "No investor found to repay" });
//     }
//     // const recipient = investor.investor;

//     // Create the repayment transaction for the farmer (the one making the payment)
//     const farmerTransaction = await Transaction.create({
//       loan: loan._id,
//       from: req.user.id,
//       to: recipient._id, 
//       amount: amount,
//       type: "repayment",
//       date: new Date(),
//     });

   

//     res.status(200).json({ message: "Loan repaid successfully", loan, farmerTransaction, investorTransaction });
//   } catch (error) {
//     console.error("Repay loan error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// },
async repayLoan(req, res) {
  try {
    const { amount, investor: investorId } = req.body;
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (!loan.amountPaid) {
      loan.amountPaid = 0;
    }

    let newAmountPaid = amount;
    const totalAmount = loan.amount + (loan.amount * loan.interestRate / 100);
    loan.amountPaid += newAmountPaid;

    // Loop through repayment schedule to mark payments as 'paid'
    for (let payment of loan.repaymentSchedule) {
      if (payment.status === "pending" && newAmountPaid >= payment.amount) {
        payment.status = "paid";
        newAmountPaid -= payment.amount;
      }
    }

    // If the loan has been fully paid off, mark it as 'completed'
    if (loan.amountPaid >= totalAmount) {
      loan.status = 'completed';
    }

    await loan.save();

    // ✅ Fix: Find the correct investor by matching _id
    const investor = loan.investors.find(inv => inv._id.toString() === investorId);

    if (!investor) {
      return res.status(400).json({ message: "No investor found to repay" });
    }

    const recipient = investor; // Investor is already the recipient

    // Create the repayment transaction for the farmer (the one making the payment)
    const farmerTransaction = await Transaction.create({
      loan: loan._id,
      from: req.user.id,
      to: recipient._id, 
      amount: amount,
      type: "repayment",
      date: new Date(),
    });

    res.status(200).json({ message: "Loan repaid successfully", loan, farmerTransaction });
  } catch (error) {
    console.error("Repay loan error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}



  async getRepaymentSchedule(req, res) {
    try {
      const loan = await Loan.findById(req.params.id);

      if (!loan) {
        return res.status(404).json({ message: "Loan not found" });
      }
      res.json(loan.repaymentSchedule);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  async getMyLoans(req, res) {
    try {
      const loans = await Loan.find({ farmer: req.user._id });
      res.json(loans);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  async getMyInvestments(req,res){
          try{
            const user = await Loan.find({investor:req.user._id})
            if(!user)return res.status(400).json({message:"no investment found"})
            res.status(201).json(user)
          
          }catch (error){
            res.status(500).json({ message: "Server error" })
          }
        }

  async getAvailableLoans(req, res) {
    try {
      const loans = await Loan.find({ status: "pending" });
      res.json(loans);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
  async investInLoan(req, res) {
    try {
      const loan = await Loan.findById(req.params.id);

      if (!loan) {
        return res.status(404).json({ message: "Loan not found" });
      }

      loan.investors.push(req.user.id);
      await loan.save();

      res.json({ message: "Investment successful", loan });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

}

export default new LoanController();