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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 flex w-4/5 max-w-4xl">
          <div className="w-1/2 pr-8 mt-16">
            <h1 className="text-3xl font-bold text-center mb-6">
              Forgot Password
            </h1>
            <p className="text-center mb-4">
              Enter your email address below to receive a password reset link.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                {loading ? (
                  <>
                    {" "}
                    <div className="w-5 h-5 border-2 border-white justify-self-center border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
              <h3 className="text-center mt-4">
                Remembered your password?
                <Link to="/sign-in" className="text-blue-600 hover:underline">
                  {" "}
                  Sign In
                </Link>
              </h3>
            </form>
          </div>

          <div className="w-1/2 flex items-center justify-center">
            <img
              src={passwordset}
              alt="Password Reset Illustration"
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
