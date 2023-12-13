import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import HomePage from "./components/pages/HomePage";
import Login from "./components/auth/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
