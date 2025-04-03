import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import About from "./components/About/About";
import Catalogue from "./components/Catalogue/Catalogue";
import Details from "./components/Details/Details";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PersonalLibrary from "./components/PersonalLibrary/PersonalLibrary";
import UserProfile from "./components/UserProfile/UserProfile";
import Register from "./components/Register/Register";

import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from './api/AuthContext';  // Assuming AuthContext is exported from api/AuthContext

function App() {
  const { user } = useAuth();  // Access user from AuthContext

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in: ", user);
      } else {
        console.log("No user logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes - Visible to all */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/details" element={<Details />} />

        {/* Login and Register routes are only available if there's no user */}
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        {/* Private Routes - Visible to authenticated users */}
        <Route path="/personal-library" element={user ? <PersonalLibrary /> : <Navigate to="/login" />} />
        <Route path="/user-profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
