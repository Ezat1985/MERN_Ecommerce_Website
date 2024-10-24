import { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/users', {
          withCredentials: true,
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleAdminStatus = async (userId, newAdminStatus) => {
    try {
      const response = await axios.put(
        'http://localhost:3001/auth/update-admin-status',
        { userId, admin: newAdminStatus },
        { withCredentials: true }
      );
      alert(response.data.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, admin: newAdminStatus } : user
        )
      );
    } catch (error) {
      console.error('Error updating admin status:', error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl mb-4 text-center'>User List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='space-y-4'>
          {users.map((user) => (
            <div
              key={user._id}
              className='flex justify-between items-center border-b pb-2'
            >
              <div className='flex flex-col space-y-1'>
                <span className='font-semibold'>
                  {user.firstName} {user.lastName}
                </span>
                <span>{user.username}</span>
                <span className='text-gray-500'>{user.email}</span>
              </div>

              <div className='flex items-center'>
                <label className='mr-2 font-semibold'>Role:</label>
                <select
                  value={user.admin ? 'admin' : 'user'}
                  onChange={(e) =>
                    toggleAdminStatus(user._id, e.target.value === 'admin')
                  }
                  className='bg-gray-100 border border-gray-300 rounded-lg px-3 py-1'
                >
                  <option value='user'>User</option>
                  <option value='admin'>Admin</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
