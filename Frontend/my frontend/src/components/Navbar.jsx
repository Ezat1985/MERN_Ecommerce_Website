import { TbShoppingBagSearch } from 'react-icons/tb';
import { FaRegCircleUser } from 'react-icons/fa6';
import logo from '../images/logo.png';
import { GiShoppingCart } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      setUserData({});
      toast(`Goodbye ${userData.firstName}`, {
        icon: '👏',
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <div className='Header h-16 shadow-md'>
      <div className='container h-full mx-auto flex items-center px-4 justify-between'>
        <Link to={'/'}>
          <img src={logo} alt='logo' className='w-14 h-50' />
        </Link>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input
            type='text'
            placeholder=' Search product here...'
            className='w-full outline-none'
            onChange={handleSearch}
          />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <TbShoppingBagSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>
          <div className='text-2xl relative'>
            <span>
              <GiShoppingCart />
            </span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </div>
          {userData.admin && (
            <Link
              to='/admin-panel'
              className='px-3 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700'
            >
              Admin Panel
            </Link>
          )}
          <div>
            {isLoggedIn ? (
              <div className='flex items-center space-x-4'>
                <button
                  className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
                <p className='text-sm'>Welcome, {userData.firstName}</p>
              </div>
            ) : (
              <Link
                to='/login'
                className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'
              >
                Login
              </Link>
            )}
          </div>{' '}
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='text-3xl cursor-pointer'>
                <FaRegCircleUser />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
            >
              <li>
                <Link to='/profile' className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </Link>
              </li>
              <li>
                <Link to='/settings'>Settings</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
