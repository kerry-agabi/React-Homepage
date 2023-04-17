import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PrivateRoute({ children, redirectTo = "/login" }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to={redirectTo} />;
}

export default PrivateRoute;
