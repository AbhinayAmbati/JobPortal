import NavBar from "./NavBarOut";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import passwordset from "../assets/PasswordReset.gif";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/forgot-password",
        { email }
      );
      console.log("Reset link sent:", response.data);
      toast.success(
        "A password reset link has been sent to your email address."
      );
      setEmail("");
    } catch (error) {
      console.error("Error sending reset link:", error.response.data);
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white shadow-2xl rounded-2xl p-8 flex w-4/5 max-w-4xl transition-all duration-300 mx-4">
          <div className="w-1/2 pr-8 mt-8">
            <div className="space-y-4">
              <h1 className="text-4xl h-12 font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Forgot Password?
              </h1>
              <p className="text-center mb-6 text-gray-600">
                Don't worry! It happens. Please enter your email address below to receive a password reset link.
              </p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 p-3 border-2 border-gray-200 rounded-lg w-full 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-300 bg-gray-50 hover:bg-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg
                  hover:from-blue-700 hover:to-indigo-700  
                  transition-all duration-300 font-medium text-lg shadow-md hover:shadow-lg
                  disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
                <div className="text-center mt-6 space-y-2">
                  <p className="text-gray-600">Remembered your password?</p>
                  <Link 
                    to="/sign-in" 
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-300"
                  >
                    Back to Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>

          <div className="w-1/2 flex items-center justify-center p-4">
            <img
              src={passwordset}
              alt="Password Reset Illustration"
              className="max-w-full h-auto object-contain animate-float"
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

export default ForgotPassword;
