import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import HomePage from "./components/pages/HomePage";
import Login from "./components/auth/Login";
import AdminDashboard from "./components/dashboard/AdminDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
