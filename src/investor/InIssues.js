import React, { useState } from "react";
import API from "../api.js";
import { toast } from "react-toastify";
// import "./InIssues.css";

function InIssues() {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const handleTitleChange = (e) => {
    setIssueTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setIssueDescription(e.target.value);
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/PostIssues", { issueTitle, issueDescription });
      console.log(data);
      toast.success("InIssues posted successfully!");
      setIssueTitle("");
      setIssueDescription("");
    } catch (error) {
      toast.error("Error in posting the issue.");
    }
  };

  return (
    <div className="body-issue">
    <div className="issue-form-container">
      <h2>Report an InIssues</h2>
      <form onSubmit={save}>
        <div className="form-group">
          <label>InIssues Title</label>
          <input
            type="text"
            placeholder="Enter the title of the issue"
            value={issueTitle}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>InIssues Description</label>
          <textarea
            placeholder="Describe the issue in detail"
            value={issueDescription}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit InIssues</button>
      </form>
    </div>
    </div>
  );
}

export default InIssues;