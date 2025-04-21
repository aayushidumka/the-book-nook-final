import { useNavigate } from 'react-router-dom';
import '@/App.css';

import { useAuthContext } from '@asgardeo/auth-react';
import React, { useEffect } from "react";

function Login() {
  const { signIn, state } = useAuthContext();
  const navigate = useNavigate();

  // Use effect to navigate to /library after successful login
  useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/library");
    }
  }, [state.isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <h1 className="login-header">Welcome to the Book Nook</h1>
      <p className="login-description">
        Where you can easily browse and check out books. Enjoy exploring a vast collection and manage your checkouts with ease.
      </p>
      <button className="login-button" onClick={() => {
        console.log("Login button clicked");
        try {
            signIn();
          } catch (err) {
            console.error("Sign-in error:", err);
          }
      }}>
        Login
      </button>
    </div>
  );
}

export default Login;
