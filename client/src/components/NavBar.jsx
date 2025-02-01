import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FaHome, FaBriefcase, FaUser, FaSignOutAlt, FaUserCircle, FaBars } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useState } from 'react';

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const username = Cookies.get('username');

  const handleLogout = () => {
    try {
      Cookies.remove('username');
      Cookies.remove('token');
      Cookies.remove('sid');
      window.location.href = '/job-portal';
    } catch (error) {
      console.error('Logout error :', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="bg-white bg-opacity-70 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src={logo} alt="Job Portal Logo" className="h-8 w-auto" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                  Job Portal
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/">
                <button className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 
                flex items-center space-x-2 transition-all duration-300">
                  <FaHome className="text-blue-600" />
                  <span>Home</span>
                </button>
              </Link>
              <Link to="/jobs">
                <button className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 
                flex items-center space-x-2 transition-all duration-300">
                  <FaBriefcase className="text-blue-600" />
                  <span>Jobs</span>
                </button>
              </Link>
              <Link to="/companies">
                <button className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 
                flex items-center space-x-2 transition-all duration-300">
                  <FaUser className="text-blue-600" />
                  <span>Companies</span>
                </button>
              </Link>

              {/* User Profile Dropdown */}
              <div className="relative ml-2">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 
                  hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                >
                  <FaUserCircle className="text-blue-600 text-xl" />
                  <span>{username}</span>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 
                  overflow-hidden transform origin-top-right transition-all duration-200">
                    <Link to="/profile">
                      <button className="flex items-center space-x-2 w-full px-4 py-3 text-gray-700 
                      hover:bg-gray-50 transition-colors duration-200">
                        <FaUser className="text-blue-600" />
                        <span>Profile</span>
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-3 text-red-600 
                      hover:bg-red-50 transition-colors duration-200"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 
                transition-all duration-300"
              >
                <FaBars className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto py-2 space-y-1">
              <Link to="/">
                <button className="flex items-center space-x-2 w-full px-4 py-3 text-gray-700 
                hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                  <FaHome className="text-blue-600" />
                  <span>Home</span>
                </button>
              </Link>
              <Link to="/jobs">
                <button className="flex items-center space-x-2 w-full px-4 py-3 text-gray-700 
                hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                  <FaBriefcase className="text-blue-600" />
                  <span>Jobs</span>
                </button>
              </Link>
              <Link to="/companies">
                <button className="flex items-center space-x-2 w-full px-4 py-3 text-gray-700 
                hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                  <FaUser className="text-blue-600" />
                  <span>Companies</span>
                </button>
              </Link>
              <Link to="/profile">
                <button className="flex items-center space-x-2 w-full px-4 py-3 text-gray-700 
                hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                  <FaUserCircle className="text-blue-600" />
                  <span>Profile</span>
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-4 py-3 text-red-600 
                hover:bg-red-50 transition-all duration-200"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;