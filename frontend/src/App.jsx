import React, { useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar.jsx";
import { Login } from "./component/login/login.jsx";
import { Signup } from "./component/login/signup.jsx";
import PrivateRoute from "./component/PrivateRoute.jsx";
import Dashboard from "./component/Dashboard.jsx";
import ForgotPassword from "./component/login/ForgotPassword.jsx";
import ResetPassword from "./component/login/ResetPassword.jsx";

import { Routes, Route, useLocation } from "react-router-dom";
import Profile from "./component/profile.jsx";

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") // or use cookies
  );

  return (
    <>
      {location.pathname !== "/Login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/ForgotPassword" &&
        !location.pathname.startsWith("/reset-password") && (
          <Navbar isAuthenticated={isAuthenticated} />
        )}
      <Routes>
        <Route
          path="/Login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Profile setIsAuthenticated={setIsAuthenticated} />
            </PrivateRoute>
          }
        />
        {/* Add more routes if needed */}
      </Routes>
    </>
  );
}

export default App;
