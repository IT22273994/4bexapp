import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Search.css"; 
import Navigation from "./Navigation";

export default function Search() {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/fetch")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setRecords(
      data.filter((f) => f.resoursename && f.resoursename.toLowerCase().includes(searchValue))
    );
  };

  return (
    <div>
      <Navigation/>
    <div className="search-container">
      
      <h2 className="search-title">Search Resources</h2>
      <input
        className="search-box"
        placeholder="Type to search..."
        type="text"
        onChange={filter}
      />
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((user) => (
              <tr key={user.resoursename}>
                <td>{user.resoursename}</td>
                <td>{user.description}</td>
                <td>{user.status}</td>
                <td>
                  <Link to={`/edituser/${user.resoursename}`} className="edit-btn">
                    Assign
                  </Link>
                  <Link to={`/details/${user.resoursename}`} className="assign-btn">
                   Add Details
                  </Link>
                  <Link to={`/edituser1/${user.resoursename}`} className="edit-btn">
                    Return
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}
