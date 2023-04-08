import React from 'react';
import { Link } from 'react-router-dom';

function RecruiterMenu() {
  return (
    <div className="recruiter-menu">
      <h2>Recruiter Menu</h2>
      <ul>
        <li>
          <Link to="/advertise">Advertise a Job</Link>
        </li>
        <li>
          <Link to="/view">View Job Applications</Link>
        </li>
        <li>
          <Link to="/update1">Update a Job Listing</Link>
        </li>
        <li>
          <Link to="/delete">Delete a Job Listing</Link>
        </li>
      </ul>
    </div>
  );
}

export default RecruiterMenu;
