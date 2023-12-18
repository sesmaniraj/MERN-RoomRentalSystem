import React from "react";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/pages/HomePage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import RegisterPage from "./components/pages/RegisterPage.jsx";
import AdminDashboard from "./components/dashboard/AdminDashboard.jsx";
import OwnerDashboard from "./components/dashboard/OwnerDashboard.jsx";
import ProfilePage from "./components/pages/ProfilePage.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/ownerdashboard" element={<OwnerDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
