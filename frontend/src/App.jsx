import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    fetch("http://localhost/parentup/api/route.php/api/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      localStorage.removeItem("user");
      setUser(null);
    });
  };

  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />

        {/* Login e Registrazione */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
