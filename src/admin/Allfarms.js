import React, { useEffect, useState } from "react";
import API from "../api.js";
import './Admin.css';
import { toast } from "react-toastify";

function AllFarms() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await API.get("/getAllFarmsnn");
        if (response.status === 200) {
          setFarms(response.data);
        } else {
          toast.error("Failed to fetch farms.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching farms.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  const handleInvest = async (farm, loan) => {
    const amount = prompt("Enter investment amount:");
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Invalid investment amount.");
      return;
    }

    try {
      const response = await API.post(`/loans/${loan._id}/invest`, { amount });
      if (response.status === 200) {
        toast.success("Investment successful!");
      } else {
        toast.error("Investment failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error processing investment.");
    }
  };

  return (
    <div className="farm-list-container">
      <div style={{border:"0.5px solid black",display:"inline-block",position:'relative',top :'10px',left:"50px",padding:"40px",backgroundColor:"whitesmoke"}}>
      <h3 className="farm-list-title" style={{color:"blue", position:'relative', left:"15px",bottom:"10px"}}>All Farms</h3>
      {loading ? (
        <p className="text-center text-gray-600">Loading farms...</p>
      ) : farms.length === 0 ? (
        <p className="text-center text-gray-600">No farms available.</p>
      ) : (
        <div className="farm-grid">
          {farms.map((farm) => (
            <div key={farm._id} className="farm-card">
              <h3 className="farm-name">🏡 {farm.name}</h3>
              {farm.images?.length > 0 && (
                <img
                  src={`http://localhost:5001/${farm.images[0]}`}
                  alt="Farm"
                  className="farm-image"
                />
              )}
              <p className="farm-location">📍 Location: {farm.location}</p>
              <p className="farm-type">🌾 Type: {farm.farmType}</p>
              <p className="farm-size">📏 Size: {farm.size} acres</p>
              <p className="farm-status">✅ Status: {farm.status}</p>
              <p className="farm-owner">👨‍🌾 Owner: {farm.farmer?.firstName} {farm.farmer?.lastName}</p>
              {farm.loan && (
                <button className="invest-button" onClick={() => handleInvest(farm, farm.loan)}>
                  Invest in Farm
                </button>
                   )}
                   </div>
                 ))}
               </div>
             )}
           </div>

      </div>
      
           
  );
};

export default AllFarms;