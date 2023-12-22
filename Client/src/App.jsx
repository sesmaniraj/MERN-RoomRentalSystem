import React from "react";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/pages/HomePage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import AdminDashboard from "./components/dashboard/AdminDashboard.jsx";
import OwnerDashboard from "./components/dashboard/OwnerDashboard.jsx";
import ProfilePage from "./components/pages/ProfilePage.jsx";
import PrivateRoute from "./components/private/PrivateRoute.jsx";
import RegisterPage from "./components/pages/RegisterPage.jsx";
import RoomRegister from "./components/pages/RoomRegister.jsx";
import UpdateRoom from "./components/pages/UpdateRoom.jsx";
import RoomDetails from "./components/pages/RoomDetails.jsx";

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
          <Route path="/room/:id" element={<RoomDetails />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/ownerdashboard" element={<OwnerDashboard />} />
            <Route path="/registerroom" element={<RoomRegister />} />
            <Route path="/updateroom/:roomId" element={<UpdateRoom />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
