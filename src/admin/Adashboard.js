import React from 'react';
import "./Admin.css";

function Adashboard() {
  return (
    <div>
        <h3>Admin Dashboard</h3>
        <nav className="admin-bar">
        <li><a href="/Allfarms" style={{ position:'relative',top:'60px',fontSize:'x-large'}}>All farms</a></li>
        <li><a href="/AllLoans" style={{ position:'relative',top:'60px',fontSize:'x-large'}}>all loans</a></li>
        <li><a href="/AllIssues" style={{ position:'relative',top:'60px',fontSize:'x-large'}}>all Issues</a></li>
        <li><a href="/AllUser" style={{ position:'relative',top:'60px',fontSize:'x-large'}}>getall User</a></li>

        </nav>
        
  
      
    </div>
  );
}

export default Adashboard;
