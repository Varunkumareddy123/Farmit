import React, { useState, useEffect } from "react";
import API from "../api.js";
// import "./Loans.css";
import { toast } from "react-toastify";

function AllLoans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await API.get("/getAllLoans");
        if (response.status === 200) {
          setLoans(response.data);
        } else {
          toast.error("Failed to fetch loans.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching loans.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="loan-list-container">
      <div >
      <h3 className="loan-list-title">All Loans</h3>
      {loading ? (
        <p className="text-center text-gray-600">Loading loans...</p>
      ) : loans.length === 0 ? (
        <p className="text-center text-gray-600">No loans found.</p>
      ) : (
        <div className="loan-grid">
          {loans.map((loan) => (
            <div key={loan._id} className="loan-card" style={{border:"0.5px solid black",display:"inline-block",position:'relative',top :'10px',left:"50px",padding:"40px",backgroundColor:"whitesmoke",margin:"5px"}}>
              <p className="loan-farmer" >👨‍🌾 Farmer: {loan.farm?.farmer?.firstName} {loan.farm?.farmer?.lastName}</p>
              <p className="loan-amount">💰 Amount: ₹{loan.amount}</p>
              <p className="loan-status">📌 Status: {loan.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>

      </div>
      
  );
}

export default AllLoans;