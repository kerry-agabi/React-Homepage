import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import { db } from "./firebase";

function RoleProtectedRoute({
  children,
  allowedRoles = [],
  redirectTo = "/",
  ...rest
}) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchRole = async () => {
        const userDoc = await db.collection("users").doc(currentUser.uid).get();
        setRole(userDoc.data().role);
        setLoading(false);
      };
      fetchRole();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) return null;

  if (currentUser && allowedRoles.includes(role)) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return (
      <Navigate
        to={{
          pathname: redirectTo ,
          state: {
            from: rest.path,
            message:
              "This page requires access from another respective role, please create an account with that role.",
          },
        }}
      />
    );
}
}

export default RoleProtectedRoute;
