import React, { useState } from "react";
import API from "../api.js";
import { toast } from "react-toastify";
// import './Loans.css';

const LoanRequestForm = () => {
  const [loanData, setLoanData] = useState({
    amount: "",
    duration: "",
    interestRate: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setLoanData({ ...loanData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/CreateLoaRequest", loanData);
      toast.success("Loan request submitted successfully!");
      setLoanData({ amount: "", duration: "", interestRate: "", purpose: "" });
    } catch (error) {
          toast.error(
            error.response?.data?.message || "Error during adding submit loan"
          );
        }
  };

  return (
    <div className="body">
    <div className="loan-form-container">
      <div style={{border:"0.5px solid black",display:"inline-block",position:'relative',top :'10px',left:"50px",padding:"40px",backgroundColor:"whitesmoke"}}>
      <h3>Request a Loan</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Loan Amount"
          value={loanData.amount}
          onChange={handleChange}
          required
        /><br></br>
        <input
          type="number"
          name="duration"
          placeholder="Duration (months)"
          value={loanData.duration}
          onChange={handleChange}
          required
        /><br></br>
        <input
          type="number"
          step="0.1"
          name="interestRate"
          placeholder="Interest Rate (%)"
          value={loanData.interestRate}
          onChange={handleChange}
          required
        /><br></br>
        <textarea
          name="purpose"
          placeholder="Purpose of Loan"
          value={loanData.purpose}
          onChange={handleChange}
          required
        ></textarea><br></br>
        <button type="submit">Submit Request</button>
      </form>

      </div>
      
    </div>
    </div>
  );
}

export default LoanRequestForm;