import React, { useState } from "react";
import API from "../api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import '../App.css'




const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
    
    try {
      await API.post("/register", formData);
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error during signup");
    }
  };
  

  return (
      <div className="main-container">
      <form onSubmit={handleSubmit} className="form-container">
              
              <div style={{border:"0.5px solid black",display:"inline-block",position:'relative',top :'10px',left:"50px",padding:"20px",backgroundColor:"whitesmoke"}}>
              <h1>Signup</h1>
              <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
              />
              <br></br>
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
              />
               <br></br>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
              />
               <br></br>
        <input
          type="password"
          placeholder="Password" 
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
              />
               <br></br>
        <select
          className="select-input"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="farmer">Farmer</option>
          <option value="investor">Investor</option>
          <option value="admin">Admin</option>
        </select>
        <h4>
          If you have already Signup,{" "}
          <Link to="/login" className="link">
            Login
          </Link>{" "}
        </h4>
        <button type="submit" className="submit-btn">
          Signup
        </button>
              </div>
              
              
        
      </form>
    </div>
  );
};

export default Signup;