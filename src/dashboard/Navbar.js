import React from 'react';

function Navbar() {
  return (
    <nav>
        <h3>farmers</h3>
      <ul>
        <li><a href="/Farm">create farm</a></li>
        <li><a href="/Showfarm">My farms</a></li>
        <li><a href="/loan">Loans</a></li>
        <li><a href="/Documents"> uploadDocuments</a></li>
        <li><a href="/Repayloan">Repay loan</a></li>
        <li><a href="/Issues">Issues</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;