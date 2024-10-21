import AddProduct from "../components/AddProduct";
import AdminSidebar from "../components/AdminSidebar";
// import { useAuth } from "../context/AuthProvider";
import { Routes, Route } from "react-router-dom";

// const { userData } = useAuth();
{
  /* {userData.admin ? <p>welcome admin</p> : <p>you are not admin</p>} */
}
const AdminPanel = () => {
  return (
    <div>
      <AdminSidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </div>
  );
};

export default AdminPanel;
