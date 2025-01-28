import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FaHome, FaBriefcase, FaUser, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useState } from 'react';

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const username = Cookies.get('username');

  const handleLogout = () => {
    try {
      Cookies.remove('username');
      Cookies.remove('token');
      Cookies.remove('sid');
      window.location.href = '/sign-in';
    } catch (error) {
      console.error('Logout error :', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex fixed w-full items-center justify-between p-4 bg-blue-600 text-white shadow-md">
      <div className="flex items-center">
        <Link to="/"><img src={logo} alt="Job Portal Logo" className="h-10 w-30 mr-2" /></Link>
        <h1 className="text-xl font-semibold">Job Portal</h1>
      </div>
      <div className="space-x-4 flex items-center ">
        <Link to='/'><button className="hover:bg-blue-500 px-3 py-2 flex rounded items-center gap-1 transition duration-300"> <FaHome /> Home</button></Link>
        <Link to='/jobs'><button className="hover:bg-blue-500 px-3 py-2 flex items-center gap-1 rounded transition duration-300"> <FaBriefcase /> Jobs</button></Link>
        <Link to='/companies'><button className="hover:bg-blue-500 px-3 py-2 items-center gap-1 flex rounded transition duration-300"> <FaUser /> Companies</button></Link>
        
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center hover:bg-blue-500 px-3 py-2 rounded transition duration-300">
            <FaUserCircle className="mr-2" /> {username}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10">
              <Link to="/profile">
                <button className="flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"><FaUser /> Profile</button>
              </Link>
              <button onClick={handleLogout} className="flex text-red-600 items-center gap-1 px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"><FaSignOutAlt /> Logout</button>
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden">
        <button onClick={toggleDropdown} className="flex items-center hover:bg-blue-500 px-3 py-2 rounded transition duration-300">
          <FaUserCircle className="mr-2" /> Menu
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10">
            <Link to='/'><button className="flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"><FaHome /> Home</button></Link>
            <Link to='/jobs'><button className="flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"><FaBriefcase /> Jobs</button></Link>
            <Link to='/companies'><button className="flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"><FaUser /> Companies</button></Link>
            <Link to="/profile"><button className="flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"><FaUser /> Profile</button></Link>
            <button onClick={handleLogout} className="flex text-red-600 items-center gap-1 px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"><FaSignOutAlt /> Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
