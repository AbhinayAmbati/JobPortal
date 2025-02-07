import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import resetGif from "../assets/ResetPage.gif"
import NavBar from './NavBarOut';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`http://localhost:8080/api/user/verify-reset-token/${token}`);
        setIsTokenValid(true);
      } catch (error) {
        toast.error('Invalid or expired reset link',error);
        navigate('/sign-in');
      }
    };
    verifyToken();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('http://localhost:8080/api/user/reset-password', {
        token,
        newPassword: password
      });
      toast.success('Password reset successful');
      navigate('/sign-in');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isTokenValid) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-xl font-semibold text-gray-700 flex items-center bg-white p-6 rounded-xl shadow-lg">
          <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mr-3"></div>
          Verifying reset link...
        </div>
      </div>
    );
  }

  return (
    <>
    <NavBar/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="flex items-center gap-8 bg-white p-8 rounded-2xl shadow-2xl w-[42rem] mx-4">
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Reset Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Please enter your new password below
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-3 w-full border-2 border-gray-200 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-300 bg-gray-50 hover:bg-white"
                  required
                  minLength={6}
                  placeholder="Enter your new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 p-3 w-full border-2 border-gray-200 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-300 bg-gray-50 hover:bg-white"
                  required
                  minLength={6}
                  placeholder="Confirm your new password"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 
              rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 
              font-medium text-lg shadow-md hover:shadow-lg disabled:opacity-70 
              disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </div>

        <div className="w-1/2 flex items-center justify-center p-4">
          <img
            src={resetGif}
            alt="Reset Password Illustration"
            className="w-full h-auto object-contain animate-float rounded-lg"
            style={{
              animation: 'float 6s ease-in-out infinite'
            }}
          />
        </div>
      </div>
    </div>
    <style>
      {`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}
    </style>
    </>
  );
};

export default ResetPassword;