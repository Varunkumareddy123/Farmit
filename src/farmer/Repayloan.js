import React, { useState } from "react";
import API from "../api.js";
import { toast } from "react-toastify";
// import './Repay.css';

const RepayLoan = () => {
  const [repayment, setRepayment] = useState({ loanId: "", amount: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRepayment({ ...repayment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first.");
      return;
    }

    if (!repayment.loanId || !repayment.amount) {
      toast.error("Loan ID and Amount are required.");
      return;
    }

    try {
      setLoading(true);
      await API.post(`/repay`, { amount: repayment.amount }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Loan repayment successful!");
      setRepayment({ loanId: "", amount: "" }); // Reset form
    } catch (error) {
      console.error("Repayment error:", error);
      toast.error(error.response?.data?.message || "Repayment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body.repay"> 
    <div className="form-container">
      <div style={{border:"0.5px solid black",display:"inline-block",position:'relative',top :'10px',left:"50px",padding:"40px",backgroundColor:"whitesmoke"}}>
      <h3 className="text-xl font-bold text-center mb-4">💰 Repay Loan</h3>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="loanId"
          placeholder="Enter Loan ID"
          value={repayment.loanId}
          onChange={handleChange}
          required
          className="input-field"
        /><br></br>
        <input
          type="number"
          name="amount"
          placeholder="Enter Amount to Repay"
          value={repayment.amount}
          onChange={handleChange}
          required
          className="input-field"
        /><br></br>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Processing..." : "Repay Loan"}
        </button>
      </form>

      </div>
      
    </div>
    </div>
  );
};

export default RepayLoan;