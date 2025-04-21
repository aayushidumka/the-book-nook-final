import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

// pages
import Login from './pages/common/Login';
import LandingRedirect from './pages/common/LandingRedirect';
import Library from './pages/user/Library';
import MyCheckouts from './pages/user/MyCheckouts';
import Books from './pages/admin/Books';
import AllCheckouts from './pages/admin/AllCheckouts';
import NotAuthorized from './pages/common/NotAuthorized';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* common routes */} 
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<LandingRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />

        {/* user-only routes */}
        <Route
          path="/library"
          element={
            <PrivateRoute allowedRoles={["reader"]}>
              <Library />
            </PrivateRoute>
          }
        />
        <Route
          path="/mycheckouts"
          element={
            <PrivateRoute allowedRoles={["reader"]}>
              <MyCheckouts />
            </PrivateRoute>
          }
        />

        {/* admin-only routes */}
        <Route
          path="/admin-book-portal"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Books />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-checkouts"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AllCheckouts />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
