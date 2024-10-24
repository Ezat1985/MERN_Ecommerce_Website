import { useState } from 'react';
import loginicons from '../images/signin.gif';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider.jsx';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsLoggedIn, checkUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
        const user = await checkUser();

        if (user) {
          toast.success(`Welcome back, ${user.firstName}`);
        } else {
          toast.error("Couldn't retrieve user data.");
        }

        navigate('/');
      }
    } catch (error) {
      setError(error.response.data.error || 'Something went wrong');
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className='container mt-8 mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500'>
      <div className='p-4'>
        <div className='flex justify-center '>
          <img
            src={loginicons}
            alt='loginicons'
            className='border rounded-full'
          />
        </div>
        {error && <p className='text-red-500 mb-4 font-semibold'>{error}</p>}
        <form className='pt-6 flex flex-col gap-2 ' onSubmit={handleLogin}>
          <div className='grid'>
            <label>Email : </label>
            <div className='bg-slate-100 p-2'>
              <input
                type='email'
                placeholder='enter email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full h-full outline-none bg-transparent'
              />
            </div>
          </div>

          <div>
            <label>Password : </label>
            <div className='bg-slate-100 p-2 flex'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='enter password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full h-full outline-none bg-transparent'
              />
              <div
                className='cursor-pointer text-xl'
                onClick={() => setShowPassword((preve) => !preve)}
              >
                <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>
            <Link
              to={'/forgot-password'}
              className='block w-fit ml-auto hover:underline hover:text-red-600'
            >
              Forgot password ?
            </Link>
          </div>

          <button
            type='submit'
            className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
          >
            Login
          </button>
        </form>
        <p className='mt-4'>
          Not registered?{' '}
          <Link to='/register' className='text-blue-500 underline'>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
