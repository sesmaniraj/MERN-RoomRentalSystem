import { useGetQuery } from "../../slices/userSlice";
import "./AdminDashboard.css";
import RoomRegister from "../pages/RoomRegister";

const AdminDashboard = () => {
  const { data } = useGetQuery();
  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <table>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
              <tr>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            </table>
          </li>
        ))}
      </ul>
      <hr />
      <RoomRegister />
    </>
  );
};

export default AdminDashboard;
