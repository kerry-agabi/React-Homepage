import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function AdminRoute({ element, ...rest }) {
  const { currentUser } = useAuth();
  const adminUserId = 'HO8cRUPUW0edKq19RHEUMPzKxbB2';

  return (
    <Route
      {...rest}
      element={
        currentUser && currentUser.uid === adminUserId ? (
          element
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
}

export default AdminRoute;
