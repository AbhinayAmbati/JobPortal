import NavBar from "./NavBarOut";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/user/forgotpassword', { email }); 
      console.log('Reset link sent:', response.data);
      toast.success('A password reset link has been sent to your email address.');
      setEmail(''); 
    } catch (error) {
      console.error('Error sending reset link:', error.response.data);
      toast.error('Failed to send reset link. Please try again.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h1 className="text-3xl font-bold text-center mb-6">Forgot Password</h1>
          <p className="text-center mb-4">Enter your email address below to receive a password reset link.</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
              Send Reset Link
            </button>
            <h3 className="text-center mt-4">
              Remembered your password? 
              <Link to="/sign-in" className="text-blue-600 hover:underline"> Sign In</Link>
            </h3>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
