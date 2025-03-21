import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Fetchdata.css"; 
import Navigation from "./Navigation";

export default function Fetchdata() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4001/fetch")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        setData(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <Navigation/>
    <div className="container">
      <h2 className="heading">Resource List</h2>
      <table className="table">
        <thead>
          <tr className="table-header">
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((user) => (
              <tr key={user.resoursename} className="table-row">
                <td>{user.resoursename}</td>
                <td>{user.description}</td>
                <td>{user.status}</td>
                <td>
                  <Link to={`/edituser/${user.resoursename}`} className="edit-btn">
                    Edit
                  </Link>
                  <Link to={`/details/${user.resoursename}`} className="assign-btn">
                    Assign
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}
