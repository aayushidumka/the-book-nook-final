import { useAuthContext } from "@asgardeo/auth-react";
import React from "react";
import "@/App.css";

function Login() {
  const { signIn, signOut, state } = useAuthContext();

  const handleAuthAction = () => {
    if (state.isAuthenticated) {
      signOut();
    } else {
      signIn();
    }
  };

  const buttonLabel = state.isAuthenticated ? "Log out" : "Login";

  return (
    <div className="login-container">
      <h1 className="login-header">Welcome to the Book Nook</h1>

      <p className="login-description">
        Where you can easily browse and check out books. Enjoy exploring a vast collection and manage your checkouts with ease.
      </p>

      <button className="login-button" onClick={handleAuthAction}>
        {buttonLabel}
      </button>
    </div>
  );
}

export default Login;
