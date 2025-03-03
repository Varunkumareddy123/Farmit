import React, { useState } from "react";
import API from "../api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import "./Farm.css"; 
 

const Farm = () => {
  const [farmData, setFarmData] = useState({
    name: "",
    description: "",
    location: "",
    farmType: "",
    size: "",
    // productionCapacity: "",
    images: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFarmData({ ...farmData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFarmData({ ...farmData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in farmData) {
      if (key === "images") {
        for (let i = 0; i < farmData.images.length; i++) {
          formData.append("images", farmData.images[i]);
        }
      } else {
        formData.append(key, farmData[key]);
      }
    }

    try {
      await API.post("/createFarm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Farm added successfully!");
      navigate("/farmerdashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error during adding Farm land"
      );
    }
  };

  return (
    <div className="add-Farm-container">
      <div className="add-Farm-card">
        <div style={{border:"0.5px solid black",display:"inline-block",position:'relative',top :'10px',left:"50px",padding:"40px",backgroundColor:"whitesmoke"}}>
        <h3>Add Farm</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Farm Name"
            value={farmData.name}
            onChange={handleChange}
          /><br></br>
          <textarea
            name="description"
            placeholder="Description"
            value={farmData.description}
            onChange={handleChange}
          /><br></br>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={farmData.location}
            onChange={handleChange}
          /><br></br>
          <input
            type="text"
            name="farmType"
            placeholder="Farm Type"
            value={farmData.farmType}
            onChange={handleChange}
          /><br></br>
          <input
            type="number"
            name="size"
            placeholder="Size (acres)"
            value={farmData.size}
            onChange={handleChange}
          /><br></br>
          {/* <input
            type="text"
            name="productionCapacity"
            placeholder="Production Capacity"
            value={farmData.productionCapacity}
            onChange={handleChange}
          /> */}
          <input type="file" name="images" multiple onChange={handleImageChange} /><br></br>
          <button type="submit">Add Farm</button>
        </form>

        </div>
        
      </div>
    </div>
  );
};

export default Farm;