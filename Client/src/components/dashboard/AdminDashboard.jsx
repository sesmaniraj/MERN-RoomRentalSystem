import React from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <>{userInfo.email}</>
    </div>
  );
};

export default AdminDashboard;
