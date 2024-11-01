/* eslint-disable no-unused-vars */
import { TbShoppingBagSearch } from 'react-icons/tb';
import { FaRegCircleUser } from 'react-icons/fa6';
import { GiShoppingCart } from 'react-icons/gi';
import logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import SearchDropdown from './SearchDropdown';
import { TbShoppingBagSearch } from 'react-icons/tb';
import { FaRegCircleUser } from 'react-icons/fa6';
import { GiShoppingCart } from 'react-icons/gi';
import logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import SearchDropdown from './SearchDropdown';

const Navbar = ({ cart }) => {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useAuth();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

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

  const handleSearch = async (value) => {
    setQuery(value);
    if (value) {
      try {
        const response = await fetch(
          `http://localhost:3001/products/search?query=${encodeURIComponent(
            value
          )}`
        );
        const data = await response.json();
        setResults(data.results);
        setShowDropdown(true);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setResults([]);
      setShowDropdown(false); // Hide dropdown if no query
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    handleSearch(value);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
    setQuery(''); // Clear query on close
  };

  return (
    <div className='Header h-16 shadow-md'>
      <div className='container h-full mx-auto flex items-center px-4 justify-between'>
        <Link to={'/'}>
          <img src={logo} alt='logo' className='w-14 h-50' />
        </Link>

        <div className='relative hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-2'>
          <input
            type='text'
            placeholder='Search product here...'
            className='w-full outline-none'
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
          />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <TbShoppingBagSearch />
          </div>
          {showDropdown && (
            <SearchDropdown results={results} onClose={closeDropdown} />
          )}
        </div>

        <div className='flex items-center gap-7'>
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

          <Link to='/cart' className='text-2xl relative'>
            <span>
              <GiShoppingCart />
            </span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>{cartCount}</p>
            </div>
          </Link>
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
          </div>
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
