/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import logo from "/logo.png";
import useProfile from "../../hooks/getUserProfile";
import axios from "axios";
import { Link } from "react-router";
import Loading from "../../pages/loadding/Loading";



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [user, setUser] = useState(null);
  const { data, isLoading, isError, error } = useProfile();

  const dropdownRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_ADMIN_URL;

  // user setter
  useEffect(() => {
    setUser(data?.user);
    setIsLoggingIn(user?.email ? true : false);
    
  }, [data, user]);
   
  

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // loding and error handling
  if (isLoading) {
    return <Loading />;
  }

  

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      const response = await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        window.location.href = "/auth/user/login";
      }
    } catch (error) {
      // যদি কোনো কারণে রিকোয়েস্ট ব্যর্থ হয়
      console.error(
        "লগআউট ব্যর্থ হয়েছে:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#7F0B0B] to-[#590000] shadow-lg sticky top-0 z-50">
      <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + Website Name */}
          <Link to="/">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Logo"
                className="w-9 h-9 rounded-lg shadow-md"
              />
              <span className="text-white text-xl font-bold tracking-wide drop-shadow-lg">
                Eventify
              </span>
            </div>
          </Link>
          {/* Hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#7F0B0B] focus:outline-none transition"
              aria-label="Toggle menu"
            >
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                )}
              </svg>
            </button>
          </div>
          {/* Menu */}
          <ul
            className={`flex-1 md:flex md:items-center md:justify-end gap-6 font-medium text-white 
            ${
              menuOpen
                ? "absolute bg-gradient-to-r from-[#7F0B0B] to-[#590000] shadow-xl left-0 top-16 w-full py-6 flex flex-col items-center space-y-4 md:space-y-0 z-40"
                : "hidden md:flex"
            }`}
          >
            <li>
              <Link
                to="/"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/add-event"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Add Event
              </Link>
            </li>
            <li>
              <Link
                to="/my-events"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                My Event
              </Link>
            </li>
            <li className="relative" ref={dropdownRef}>
              {user ? (
                <>
                  <img
                    src={user?.photo}
                    alt="Profile"
                    className="w-10 h-10 rounded-full ring-2 ring-yellow-400 object-cover transition transform hover:scale-105 cursor-pointer"
                    title={user?.name}
                    onClick={() => setDropdownOpen((v) => !v)}
                  />
                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50 py-2 animate-fadeIn">
                      <div className="px-4 py-2 font-semibold">
                        {user?.name}
                      </div>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-[#FFF2CC] transition rounded-b"
                        onClick={() => {
                          setDropdownOpen(false);
                          // TODO: Add your logout logic here
                          handleLogout();
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/auth/user/login"
                  className="bg-yellow-400 text-[#7F0B0B] px-4 py-2 rounded-md font-semibold shadow hover:bg-yellow-300 transition"
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
