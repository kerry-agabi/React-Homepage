import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function AdminRoute({ children, ...rest }) {
  const { currentUser } = useAuth();
  const adminUserId = "HO8cRUPUW0edKq19RHEUMPzKxbB2";

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return currentUser && currentUser.uid === adminUserId ? (
          children
        ) : (
          <Navigate to="/" state={{ from: location }} />
        );
      }}
    />
  );
}

export default AdminRoute;
