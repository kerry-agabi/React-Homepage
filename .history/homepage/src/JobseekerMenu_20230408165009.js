import React from 'react';
import { Link } from 'react-router-dom';
import './JobseekerMenu.css';

function JobseekerMenu() {
  return (
    <div className="jobseeker-menu">
      <h2>Jobseeker Menu</h2>
      <ul>
        <li>
          <Link to="/update-dashboard">Update Dashboard</Link>
        </li>
        <li>
          <Link to="/forgot-password">Reset Password</Link>
        </li>
        <li>
          <Link to="/view-applications">Update Login credentials</Link>
        </li>
        <li>
          <Link to="/job2">View Available Job Listings</Link>
        </li>
        <li>
          <Link to="/view-applications">View Your Job Applications</Link>
        </li>
        
      </ul>
    </div>
  );
}

export default JobseekerMenu;
