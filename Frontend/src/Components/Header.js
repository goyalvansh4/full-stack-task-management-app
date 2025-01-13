import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  return (
    <header className="bg-green-500 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer">
          Healthy <span className="text-yellow-300">Food</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-300 transition-colors duration-300"
            }
          >
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-300 transition-colors duration-300"
            }
          >
            Cart
          </NavLink>
          <NavLink
            to="/order"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-300 transition-colors duration-300"
            }
          >
            Order
          </NavLink>
        </nav>

        {/* Authentication Buttons */}
        <div className="flex items-center space-x-4">
          {!(Cookies.get("token")) ? 
          <NavLink
            to="/login"
            className="bg-yellow-300 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-300"
          >
            Login
          </NavLink>
          :
          <NavLink
            onClick={() => {
              Cookies.remove("token");
              window.location.href = "/login";
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300"
          >
            Logout
          </NavLink>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
