import { TbShoppingBagSearch } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import logo from "../images/logo.png";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="Header h-16 shadow-md">
        <div className="container h-full mx-auto flex items-center px-4 justify-between">
          {/* Logo*/}
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-14 h-50" />
          </Link>

          {/* search code*/}
          <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
            <input
              type="text"
              placeholder=" Search product here..."
              className="w-full outline-none"
            />
            <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
              <TbShoppingBagSearch />
            </div>
          </div>
          {/* user icon and cart code */}
          <div className=" flex items-center gap-7">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="text-3xl cursor-pointer">
                  <FaRegCircleUser />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
            <div className="text-2xl relative">
              <span>
                <GiShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">0</p>
              </div>
            </div>
            <div>
              <Link
                to="/login"
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
