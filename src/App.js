import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signup from "./components/Signup";
import Login from "./components/Login";
// import Farmer from "./dashboard/Navbar";
import "./App.css";
import About from "./components/About";
import Navbar from "./dashboard/Navbar";
// import Farms from "./farmer/Farm";
import Showfarm from "./farmer/Showfarms";
import Farm from "./farmer/Farm.js";
import LoanRequestForm from "./farmer/Loan.js";
import DocumentUpload from "./farmer/Documents.js";
import RepayLoan from "./farmer/Repayloan.js";
import Dashboard from "./investor/Dinvestor.js"
import LoanList from "./investor/LoanList.js";
import Myinvestments from "./investor/Myinvestment.js";
import Issues from "./farmer/Issues.js";
import InIssues from "./investor/InIssues.js";
import Adashboard from "./admin/Adashboard.js";
import AllFarms from "./admin/Allfarms.js";
import AllLoans from "./admin/AllLoans.js";
import AllIssues from "./admin/AllIssues.js";
import AllUser from "./admin/AllUser.js";

function App() {
  // // const handleLogout = () => {
  //   // Clear authentication data (modify as per your logic)
  //   localStorage.removeItem("user");
  //   alert("Logged out successfully!");
  // };

  return (
    <Router>
      <ToastContainer></ToastContainer>
      <div className="App">
        <nav className="navbar">
          <h2>FARM IT</h2>
          <ul className="nav-links">
          <li>
              <Link to="/About" className="about-link">About</Link>
            </li>
            <li>
              {/* <Link to="/" className="service-link">Services</Link> */}
            </li>
            <li>
              <Link to="/signup" className="signup-link">Signup</Link>
            </li>
            <li>
              <Link to="/login" className="login-link">Login</Link>
            </li>
            <li>
            <Link to="/logout" className="logout-link">Log out</Link>
              
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/about" element={<About />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/farmer" element={<Navbar />} />
          <Route path="/farm" element={<Farm/>} />
          <Route path="/Showfarm" element={<Showfarm />} />
          <Route path="/loan" element={<LoanRequestForm />} />
          <Route path="/Documents" element={<DocumentUpload />} />
          <Route path="/repayloan" element={<RepayLoan />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/investor" element={<Dashboard />} />
          <Route path="/loanlist" element={<LoanList />} />
          <Route path="/myinvestment" element={<Myinvestments />} />
          <Route path="/inissues" element={<InIssues />} />
          <Route path="/Admin" element={<Adashboard />} />
          <Route path="/Allfarms" element={<AllFarms />} />
          <Route path="/allloans" element={<AllLoans/>} />
          <Route path="/allissues" element={<AllIssues/>} />
          <Route path="/alluser" element={<AllUser/>} />








        </Routes>
      </div>
    </Router>
  );
}

export default App;
