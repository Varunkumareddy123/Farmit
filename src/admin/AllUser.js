import React, { useEffect, useState } from "react";
import API from "../api.js"; // Centralized API handling
// import "./UsersList.css";
import { toast } from "react-toastify";

function AllUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/getAllUsers");
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          toast.error("Failed to fetch users.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleVerify = async (id) => {
    try {
      const response = await API.put(`/Veyrify/${id}`);
      if (response.status === 200) {
        setUsers(users.map((user) => 
          user._id === id ? { ...user, isVerified: true } : user
        ));
        toast.success("User verified successfully!");
      } else {
        toast.error("Failed to verify user.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error verifying user.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await API.delete(`/deleteUser/${id}`);
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User deleted successfully!");
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user.");
    }
  };

  return (
    <div className="user-list-container">
      <div style={{border:"0.5px solid black",display:"inline-block",position:'relative',top :'10px',left:"50px",padding:"40px",backgroundColor:"whitesmoke"}}>
      <h3 className="user-list-title">Manage Users</h3>
      {loading ? (
        <p className="text-center text-gray-600">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isVerified ? "✅ Verified" : "⛔ Not Verified"}</td>
                <td>
                  {!user.isVerified && (
                    <button 
                      className="verify-button"
                      onClick={() => handleVerify(user._id)}
                      style={{backgroundcolor:"green"}}
                    >
                      Verify
                    </button>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      </div>
      
    </div>
  );
}

export default AllUser;