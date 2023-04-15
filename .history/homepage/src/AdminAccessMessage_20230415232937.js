// AdminAccessMessage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminAccess.css';

function AdminAccessMessage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirects to the homepage after 10 seconds
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="admin-access-message">
      This page requires Admin access, due to privacy policy and the sensitivity of the information it contains.
       You will be redirected back to the homepage shortly.
    </div>
  );
}

export default AdminAccessMessage;
