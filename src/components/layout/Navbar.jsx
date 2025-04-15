import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartProvider } from "../../context/CartContext";
import { UsersContext } from "../../context/UserContext";

import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";

import {
  MdFavoriteBorder,
  MdOutlineDashboardCustomize,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";

import { useLocation } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

const Navbar = () => {
  const navLinks = ["Home", "About us", "Products", "Contact"];

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  const [userImage, setUserImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const { currentUser } = useContext(UsersContext);
  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq2k2sI1nZyFTtoaKSXxeVzmAwIPchF4tjwg&s";

  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser.id);
      setUserRole(currentUser.role);
      setUserImage(currentUser.image || defaultImage);
    } else {
      const storedUserId = localStorage.getItem("userId");
      const storedUserRole = localStorage.getItem("userRole");

      if (storedUserId) {
        setUserId(storedUserId);
        setUserRole(storedUserRole);

        axios
          .get(`http://localhost:3000/users/${storedUserId}`)
          .then((response) => {
            const image = response.data.image || defaultImage;
            setUserImage(image);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setUserImage(defaultImage);
          });
      } else {
        setUserImage(defaultImage);
      }
    }
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.clear();
    setUserId(null);
    setUserImage(defaultImage);
  };

  const { cart } = useContext(CartProvider);
  let cartCount = Object.values(cart).reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  let cartTotal = Object.values(cart).reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );
  const isActive = (link) => {
    return activeLink === link ? "text-black font-semibold" : "";
  };

  const theme = useTheme();
  const handleThemeToggle = () => {
    const newTheme = theme === "night" ? "winter" : "night";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="w-full border-b border-gray-200 shadow-sm sticky bg-white top-0 left-0 z-50 quicksand-regular">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="md:hidden text-black">
          {isOpen ? (
            <FiX className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
          ) : (
            <FiMenu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
          )}
        </div>

        <div className="flex items-center space-x-2 text-lg font-bold text-gray-800">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current text-blue-800"
          >
            <path d="M12 2C15.9 2 19 5.1 19 9c0 1.9-.7 3.6-1.9 5-1.2 1.4-2.8 2.4-4.6 3.2l-.5.2V22h-2v-3.6l-.5-.2c-1.8-.8-3.4-1.8-4.6-3.2C5.7 12.6 5 10.9 5 9c0-3.9 3.1-7 7-7zm0 2C9.2 4 7 6.2 7 9c0 1.4.5 2.7 1.4 3.8 1.8 2.1 4.5 3.2 7.6 3.2 3.1 0 5.8-1.1 7.6-3.2.9-1.1 1.4-2.4 1.4-3.8 0-2.8-2.2-5-5-5z" />
          </svg>
          <Link className="text-xl" to="/">
            Glamorix
          </Link>
        </div>

        <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-800">
          {navLinks.map((link) => {
            const linkPath =
              link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "")}`;
            return (
              <li
                key={link}
                className={`cursor-pointer hover:text-black relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-400 hover:after:w-full ${isActive(
                  link
                )}`}
                onClick={() => handleLinkClick(link)}
              >
                <Link to={linkPath}>{link}</Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center space-x-4 text-gray-800">
          <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" checked={theme === "night"}
              onChange={handleThemeToggle} />

            <svg
              className="swap-on h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-off h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle p-2 hover:bg-gray-200 rounded-full transition-all duration-300 ease-in-out"
              >
                <div className="indicator ">
                  <FiShoppingCart className="w-6 h-6 text-gray-800" />
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content shadow-lg rounded-lg w-64 mt-2 transition-all duration-300 ease-in-out bg-zinc-50 border-zinc-200 text-zinc-800"
              >
                <div className="card-body p-4 ">
                  <span className="text-lg font-semibold text-gray-800">
                    {cartCount} Items
                  </span>
                  <div className="my-2 text-sm text-gray-600">
                    <span className="font-medium text-gray-800">
                      Subtotal:{" "}
                    </span>
                    <span className="text-primary">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="card-actions">
                    <Link to="/cart">
                      <button className="btn btn-primary text-white btn-block py-2 rounded-lg transition-all duration-200 ease-in-out">
                        View Cart
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {userId ? (
              <div className="dropdown dropdown-end">
                <button className="cursor-pointer flex items-center space-x-2 rounded-full transition-all duration-300">
                  <div className="w-8 h-8 rounded-full overflow-hidden ">
                    <img
                      src={userImage}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
                {userRole === "admin" ? (
                  <div className="dropdown-content bg-white shadow-lg rounded-lg mt-2 p-2 w-48">
                    <div className="flex items-center justify-between p-2 w-full text-gray-800 hover:bg-gray-100 rounded-lg">
                      <Link to={"/"} className="text-left w-full">
                        Admin Profile
                      </Link>
                      <MdOutlineAdminPanelSettings className="w-5 h-5 text-gray-800" />
                    </div>

                    <div className="flex items-center justify-between p-2 w-full text-gray-800 hover:bg-gray-100 rounded-lg">
                      <Link to="/dashboard" className="text-left w-full">
                        Dashboard
                      </Link>
                      <MdOutlineDashboardCustomize className="w-5 h-5 text-gray-500" />
                    </div>

                    <div className="flex items-center space-x-2 p-2 w-full text-gray-800 hover:bg-gray-100 rounded-lg">
                      <button
                        onClick={handleLogout}
                        className="text-left w-full"
                      >
                        Logout
                      </button>
                      <CiLogout className="w-5 h-5" />
                    </div>
                  </div>
                ) : (
                  <div className="dropdown-content bg-white shadow-lg rounded-lg mt-2 p-2 w-48">
                    <div className="flex items-center justify-between p-2 w-full text-gray-800 hover:bg-gray-100 rounded-lg">
                      <Link
                        to={`/profile/${userId}`}
                        className="text-left w-full"
                      >
                        User Profile
                      </Link>
                      <FaUserCircle className="w-5 h-5 text-gray-800" />
                    </div>

                    <div className="flex items-center space-x-2 p-2 w-full text-gray-800 hover:bg-gray-100 rounded-lg">
                      <button
                        onClick={handleLogout}
                        className="text-left w-full"
                      >
                        Logout
                      </button>
                      <CiLogout className="w-5 h-5" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="dropdown dropdown-end">
                <Link to="/login">Sign Up / Log In</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 py-4 bg-zinc-50 text-gray-400">
          {navLinks.map((link) => {
            const linkPath =
              link == "Home" ? `/` : `/${link.toLowerCase().replace(" ", "")}`;
            return (
              <Link
                key={link}
                to={linkPath}
                className={`block px-4 py-2 ${isActive(link)}`}
                onClick={() => handleLinkClick(link)}
              >
                {link}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
