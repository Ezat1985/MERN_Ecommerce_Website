import AddProduct from "../components/AddProduct";
import AdminSidebar from "../components/AdminSidebar";
// import { useAuth } from "../context/AuthProvider";
import { Outlet } from "react-router-dom";

// const { userData } = useAuth();
{
  /* {userData.admin ? <p>welcome admin</p> : <p>you are not admin</p>} */
}
const AdminPanel = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default AdminPanel;
