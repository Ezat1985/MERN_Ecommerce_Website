import { useAuth } from "../context/AuthProvider";

const AdminPanel = () => {
  const { userData } = useAuth();
  return (
    <div>
      {userData.admin ? <p>welcome admin</p> : <p>you are not admin</p>}
    </div>
  );
};

export default AdminPanel;
