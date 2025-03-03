import React, { useState, useEffect } from "react";
import API from "../api.js";
// import "./Investments.css";
import { toast } from "react-toastify";

function Myinvestments() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await API.get("/myinvestments");

        if (response.status === 200) {
          setInvestments(response.data);
        } else {
          toast.error("Failed to fetch investments.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching investments.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  if (loading) return <p>Loading investments...</p>;

  return (
    <div className="investment-list-container">
      <div>
      <h3 className="investment-list-title">My Investments</h3>
      {investments.length === 0 ? (
        <p className="text-center text-gray-600">No investments found.</p>
      ) : (
        <div className="investment-grid">
          {investments.map((investment) => (
            <div key={investment._id} className="investment-card">
              <p className="investment-amount">💰  Invested Amount: ₹{investment.amount}</p>
              <p className="investment-duration">⏳ Duration: {investment.duration} months</p>
              <p className="investment-interest">📈 Interest Rate: {investment.interestRate}%</p>
              <p className="investment-purpose">📌 Purpose: {investment.purpose}</p>
              <p className="investment-status">
                Status: <span className={investment.status.toLowerCase()}>{investment.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}

      </div>
     
    </div>
  );
}

export default Myinvestments;