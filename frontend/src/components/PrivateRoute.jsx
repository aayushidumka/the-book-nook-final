import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "@asgardeo/auth-react";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { state } = useAuthContext();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!state.isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/readers/${encodeURIComponent(state.username)}`);
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [state]);

  if (loading) return <p>Loading...</p>;

  if (!state.isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default PrivateRoute;
