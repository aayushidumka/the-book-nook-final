// import React, { useEffect, useState } from 'react';
// import { useAuthContext } from '@asgardeo/auth-react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Header = () => {
//   const { state, signIn, signOut } = useAuthContext();
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       if (!state.isAuthenticated) {
//         setUserRole(null);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/auth/readers/${encodeURIComponent(state.username)}`
//         );
//         setUserRole(response.data.role);
//       } catch (error) {
//         console.error("Error fetching user role", error);
//       }
//     };

//     fetchUserRole();
//   }, [state]);

//   return (
//     <header className="header">
//       <div className="header-left">
//       <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
//         <h1 className="site-title">The Book Nook</h1>
//       </Link>
//         {state.isAuthenticated && (
//           <span className="welcome-text">Welcome, {state.username}</span>
//         )}
//       </div>

//       <nav className="nav-links">
//         {!state.isAuthenticated ? null : (
//           <>
//             {userRole === "reader" && (
//               <>
//                 <Link to="/library">Library</Link>
//                 <Link to="/mycheckouts">My Checkouts</Link>
//               </>
//             )}
//             {userRole === "admin" && (
//               <>
//                 <Link to="/admin-book-portal">All Books</Link>
//                 <Link to="/admin-checkouts">All Checkouts</Link>
//               </>
//             )}
//             <span onClick={signOut} className="auth-link">Log Out</span>
//           </>
//         )}

//         {/* {!state.isAuthenticated && (
//           <span onClick={signIn} className="auth-link">Log In</span>
//         )} */}
//       </nav>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const { state, signIn, signOut } = useAuthContext();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchOrCreateUser = async () => {
      if (!state.isAuthenticated || !state.username) {
        setUserRole(null);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/readers/${encodeURIComponent(state.username)}`
        );

        if (response.data && response.data.role) {
          setUserRole(response.data.role);
        } else {
          // User not found – create them
          await axios.post(`${import.meta.env.VITE_API_URL}/auth/readers`, {
            username: state.username
          });

          setUserRole("reader"); // set locally
          console.log("New user added to DB");
        }
      } catch (error) {
        console.error("Error checking or adding user", error);
      }
    };

    fetchOrCreateUser();
  }, [state]);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className="site-title hover:underline cursor-pointer">The Book Nook</h1>
        </Link>
        {state.isAuthenticated && (
          <span className="welcome-text">Welcome, {state.username}</span>
        )}
      </div>

      <nav className="nav-links">
        {!state.isAuthenticated ? null : (
          <>
            {userRole === "reader" && (
              <>
                <Link to="/library">Library</Link>
                <Link to="/mycheckouts">My Checkouts</Link>
              </>
            )}
            {userRole === "admin" && (
              <>
                <Link to="/admin-book-portal">All Books</Link>
                <Link to="/admin-checkouts">All Checkouts</Link>
              </>
            )}
            <span onClick={signOut} className="auth-link">Log Out</span>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
