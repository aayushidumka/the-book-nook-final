import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import axios from "axios";

const LandingRedirect = () => {
  const { state } = useAuthContext();  // Get authentication state from Asgardeo
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("Component rendered");
  useEffect(() => {
    console.log("useEffect triggered");  // <-- Check if this log appears
    if (!state.isAuthenticated || !state.username) {
      console.log("Not authenticated yet");
      return;
    }
  
    console.log("Authenticated and username available:", state.username);
  
    const handleUserCheckAndRedirect = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/readers/${encodeURIComponent(state.username)}`
        );

        console.log(response.data)
  
        if (!response.data) {
          const newUserResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/readers`,
            { username: state.username }
          );
          console.log("New reader added:", newUserResponse.data);
          setUserRole(newUserResponse.data.role);
        } else {
          setUserRole(response.data.role);
        }
      } catch (error) {
        console.error("Unexpected error checking/creating user", error);
      } finally {
        setLoading(false);
      }
    };
  
    handleUserCheckAndRedirect();
  }, [state.isAuthenticated, state.username]);
  

  // If not authenticated, redirect to login
  if (!state.isAuthenticated) return <Navigate to="/login" />;

  // Show loading state while checking user
  if (loading) return <p>Loading...</p>;

  // Redirect based on the user's role
  if (userRole === "reader") return <Navigate to="/library" />;
  if (userRole === "admin") return <Navigate to="/admin-book-portal" />;

  // If no valid role is found, redirect to not authorized page
  return <Navigate to="/not-authorized" />;
};

export default LandingRedirect;
