import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const NavBarOut = () => {
  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="bg-white bg-opacity-70 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/job-portal" className="flex items-center space-x-2">
                <img src={logo} alt="Job Portal Logo" className="h-8 w-auto" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                  Job Portal
                </span>
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/sign-in">
                <button className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg 
                flex items-center space-x-2 hover:bg-blue-50 transition-all duration-300">
                  <FaSignInAlt className="text-blue-600" />
                  <span>Sign In</span>
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 
                text-white rounded-lg flex items-center space-x-2 hover:from-blue-700 
                hover:to-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md">
                  <FaUserPlus />
                  <span>Sign Up</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarOut;
