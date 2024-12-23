import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LandingPage from "./home/LandingPage";
import SignIn from "./home/SignIn";
import Home from "./home/Home";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default route to LandingPage */}
        <Route path="/" element={<LandingPage />} />
        {/* Redirect to Home if user is authenticated, else SignIn */}
        <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
};

export default App;
