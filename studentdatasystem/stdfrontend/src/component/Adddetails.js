import React, { useState } from 'react';
import "./Adddetail.css";
import Navigation from './Navigation';

function Adddetails() {
  const [formData, setFormData] = useState({
    resoursename: "",
    days: "",
    need: "",
    start_date: "",
    end_date: ""
  });

  const [notification, setNotification] = useState(""); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4001/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then(() => {
      console.log("New details added");
      setNotification(" Details added successfully!"); 
      
      
      setFormData({
        resoursename: "",
        days: "",
        need: "",
        start_date: "",
        end_date: ""
      });

    
      setTimeout(() => setNotification(""), 3000);
    })
    .catch((error) => {
      console.error("Error adding details:", error);
      setNotification(" Failed to add details. Try again.");
    });
  };

  return (
    <div>
      <Navigation/>
    <div className="container">
      <h2 className="heading">Enter Your Details</h2>
      
    
      {notification && <div className="notification">{notification}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">Name</label>
          <input
            type="text"
            name="resoursename"
            value={formData.resoursename}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Days</label>
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Purpose</label>
          <input
            type="text"
            name="need"
            value={formData.need}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">End Date</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default Adddetails;
