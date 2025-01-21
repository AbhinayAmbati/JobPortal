import NavBar from "./NavBarOut";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import {toast} from "react-toastify"

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser, setUsername } = useAppContext(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/signin",
        userData
      );
      console.log("Login successful:", response.data);
      const { jwtToken, user } = response.data;
      console.log(
        jwtToken,
        "\nEmail " + user.email,
        "\nUsername " + user.username
      );
      setUser(true);
      setUsername(user.username);
      Cookies.set("token", response.data.jwtToken);
      Cookies.set("username", user.username);
      toast.success("User logged in successfully.");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error.response.data);
      toast.error("Login Failed");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="flex items-center">
                <FaEnvelope className="absolute left-3 top-10 text-gray-600" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 pl-10 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="flex items-center">
                <FaLock className="absolute left-3 top-10 text-gray-600" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 pl-10 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  style={{ marginTop: "25px" }}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-800" />
                  ) : (
                    <FaEye className="text-gray-800" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
            <Link to="/forgot-password">
              <h5 className="text-blue-600 mt-2 text-center">
                Forgot Password?
              </h5>
            </Link>
            <h3 className="text-center mt-4">
              Don&apos;t have an account?
              <Link to="/sign-up" className="text-blue-600 hover:underline">
                {" "}
                Sign Up
              </Link>
            </h3>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
