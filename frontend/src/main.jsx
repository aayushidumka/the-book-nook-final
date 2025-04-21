import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
// import AuthSync from "@/components/AuthSync";

// import context
import { AppProvider } from "./context/AppContext";

// import asgardeo
import { AuthProvider } from "@asgardeo/auth-react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    {/* changed for asgardeo */}
    <AuthProvider
        config={ {
            signInRedirectURL: process.env.REACT_APP_SIGNIN_REDIRECT_URL,
            signOutRedirectURL: process.env.REACT_APP_SIGNOUT_REDIRECT_URL,
            clientID: "grFPVm4jl43QsPAf43ozUVmzJ6sa",
            baseUrl: "https://api.asgardeo.io/t/aayushidumka",
            scope: [ "openid","profile" ]
        } }
    >
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {/* <AuthSync /> */}
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>
);
