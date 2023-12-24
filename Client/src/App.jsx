import React from "react";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/pages/Home.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import AdminDashboard from "./components/dashboard/AdminDashboard.jsx";
import OwnerDashboard from "./components/dashboard/OwnerDashboard.jsx";
import ProfilePage from "./components/pages/ProfilePage.jsx";
import PrivateRoute from "./components/private/PrivateRoute.jsx";
import RegisterPage from "./components/pages/RegisterPage.jsx";
import RoomRegister from "./components/pages/RoomRegister.jsx";
import UpdateRoom from "./components/pages/UpdateRoom.jsx";
import RoomDetails from "./components/pages/RoomDetails.jsx";
import Search from "./components/pages/Search.jsx";
import Footer from "./components/Footer.jsx";
import About from "./components/pages/About.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/about" element={<About />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/ownerdashboard" element={<OwnerDashboard />} />
            <Route path="/registerroom" element={<RoomRegister />} />
            <Route path="/updateroom/:roomId" element={<UpdateRoom />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
