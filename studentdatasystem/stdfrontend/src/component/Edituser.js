import React, { useState, useEffect } from 'react';
import axios from "axios"; 
import { useParams } from 'react-router-dom';
import "./Adddetail.css"; 

export default function Edituser() {
  const { resoursename } = useParams();
  const [user, setUser] = useState({ 
    resoursename: "",
    status: ""
  });
  const [message, setMessage] = useState("");  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/resource/${resoursename}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error fetching user data!");
      }
    };
    fetchUser();
  }, [resoursename]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4001/update/${resoursename}`, user, {
        headers: { "Content-Type": "application/json" }
      });
      setMessage("User updated successfully!");  
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Failed to update user!");  
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">  
      <h2 className="heading">Edit Resource Details</h2>

      
      {message && <div className="notification">{message}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">Resource</label>
          <input
            type="text"
            name="resoursename"
            value={user.resoursename}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
  <label className="label">Availability</label>
  <input
    type="text"
    name="status"
    value={user.status}
    onChange={handleChange}
    required
    className="input"
    placeholder="input 'in-use'..."
  />
</div>
        <button type="submit" className="button">Update</button>
      </form>
    </div>
  );
}
