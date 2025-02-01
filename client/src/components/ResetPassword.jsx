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
      toast.error('Passwords do not match');
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-xl font-semibold text-gray-700 flex items-center">
          <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Verifying reset link...
        </div>
      </div>
    );
  }

  return (
    <>
    <NavBar/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
  <div className="flex items-center gap-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-[42rem]">
    <div className="w-1/2">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-md font-medium text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength={6}
            placeholder="Confirm your new password"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Resetting...
            </span>
          ) : (
            'Reset Password'
          )}
        </button>
      </form>
    </div>

    {/* GIF Section */}
    <img
      src={resetGif}
      alt="Reset Password GIF"
      className="w-1/2 rounded-lg"
    />
  </div>
</div>
</>
  );
};

export default ResetPassword;