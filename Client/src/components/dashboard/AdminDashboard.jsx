import { useGetQuery } from "../../slices/userSlice";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { data } = useGetQuery();
  if (!data) {
    // Data is still loading, or there was an error
    return <p>Loading...</p>; // You can customize this based on your needs
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
    </>
  );
};

export default AdminDashboard;
