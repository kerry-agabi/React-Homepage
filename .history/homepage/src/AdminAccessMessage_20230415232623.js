// AdminAccessMessage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminAccessMessage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirects to the homepage after 10 seconds
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      This page requires Admin access, due to privacy policy and the sensitivity of the information it contains.
    </div>
  );
}

export default AdminAccessMessage;