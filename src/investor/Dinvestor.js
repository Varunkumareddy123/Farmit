import React from 'react';

function Dinvestor() {
  return (
    <div>
        <h3>Investor Dashboard</h3>
        <nav style={{backgroundColor:"beige", height:"100px", position:"relative",bottom:"20px"}}>
        <li><a href="/LoanList" style={{ position:'relative',top:'60px',fontSize:'x-large'}}>Loans</a></li>
        <li><a href="/Myinvestment" style={{ position:'relative',top:'60px',fontSize:'x-large'}}>Investments</a></li>
        <li><a href="/InIssues" style={{ position:'relative',top:'60px',fontSize:'x-large'}}>Report Issues</a></li>

        </nav>
        
  
      
    </div>
  );
}

export default Dinvestor;
