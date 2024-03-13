import React, { useState, useEffect } from "react";

const ViewUser = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/v1/getalluser");
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  return (
    <div>
      <div className="mt-3">
        <h2 className="text-2xl font-semibold mb-4">User list</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-blue-500">
              <th className="px-4 py-2">UserName</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">PhoneNumber</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phoneNumber}</td>
                <td className="border px-4 py-2">{user.address}</td>
                <td className="border px-4 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUser;
