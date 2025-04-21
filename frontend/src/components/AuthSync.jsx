// import React, { useEffect } from "react";
// import axios from "axios";
// import { useAuthContext } from "@asgardeo/auth-react";

// function AuthSync() {
//   const { state } = useAuthContext();

//   useEffect(() => {
//     const syncReader = async () => {
//       if (state.isAuthenticated && state.username) {
//         try {
//           await axios.post(`${import.meta.env.VITE_API_URL}/auth/register-readers`, {
//             username: state.username,
//           });
//         } catch (error) {
//           // If duplicate or any other error occurs, you can just log or ignore it
//           console.error("Error syncing reader:", error.response?.data || error.message);
//         }
//       }
//     };

//     syncReader();
//   }, [state.isAuthenticated, state.username]);

//   return null;
// }

// export default AuthSync;
