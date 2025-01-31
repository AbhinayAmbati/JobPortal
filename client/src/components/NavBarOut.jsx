import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    <div className="flex fixed w-full items-center justify-between p-4 bg-blue-600 text-white shadow-md">
      <div className="flex items-center">
        <Link to="/job-portal"> <img src={logo} alt="Job Portal Logo" className="h-10 w-30 mr-2" /></Link>
        <h1 className="text-xl font-semibold">Job Portal</h1>
      </div>
    </div>
  )
}

export default NavBar;
