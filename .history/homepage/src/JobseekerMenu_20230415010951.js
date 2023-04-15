import React from 'react';
import { Link } from 'react-router-dom';
import './JobseekerMenu.css';

function JobseekerMenu() {
  return (
    <div className="jobseeker-menu">
      <h2>Jobseeker Menu</h2>
      <ul>
      <li>
          <Link to="/job2">View Matching Job Listing</Link>
        </li>
        <li>
          <Link to="/viewuser">View Your Job Applications</Link>
        </li>
        <li>
          <Link to="/dashboard2">Update Dashboard</Link>
        </li>
        <li>
          <Link to="/forgot-password">Reset Password</Link>
        </li>
        <li>
          <Link to="/update-profile">Update Login credentials</Link>  
        </li>
       
        
      </ul>
    </div>
  );
}

export default JobseekerMenu;
