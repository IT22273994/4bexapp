import React from 'react'
import { Link } from 'react-router-dom'
import "./Navigation.css"; // Import the CSS file

function Navigation(){
    return(
        <nav className="navbar">
      <div className="navbar-logo">Resource Manager</div>
      <ul className="navbar-links">
        <li>
          <Link to="/serch" className="nav-link">Search</Link>
        </li>
        <li>
          <Link to="/chart" className="nav-link">Chart Show</Link>
        </li>
        <li>
          <Link to="/show" className="nav-link">Resource Details</Link>
        </li>
        <li>
          <Link to="/update" className="nav-link">Update</Link>
        </li>
      </ul>
    </nav>
    )
}

export default Navigation