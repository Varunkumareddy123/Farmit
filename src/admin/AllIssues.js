import React, { useEffect, useState } from "react";
import API from "../api.js"; // Centralized API handling
import { toast } from "react-toastify";
// import "./AllIssues.css";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await API.get("/getallissues");
        if (response.status === 200) {
          setIssues(response.data);
        } else {
          toast.error("Failed to fetch issues.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching issues.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="issues-container">
      <div style={{border:"0.5px solid black",display:"inline-block",position:'relative',top :'10px',left:"50px",padding:"40px",backgroundColor:"whitesmoke"}}>
      <h3 className="issues-title">Reported AllIssues</h3>
      {loading ? (
        <p className="text-center text-gray-600">Loading issues...</p>
      ) : issues.length === 0 ? (
        <p className="text-center text-gray-600">No issues reported.</p>
      ) : (
        <table className="issues-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Reported By</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td>{issue.issueTitle}</td>
                <td>
                  {issue.user?.firstName} {issue.user?.lastName} <br />
                  <span className="email-text">({issue.user?.email})</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

      </div>
      
  );
};

export default AllIssues;