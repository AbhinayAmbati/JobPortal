import NavBar from "./NavBar";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const id = Cookies.get('sid');
      try {
        const response = await axios.get('http://localhost:8080/api/user/profile', {
          params: { id }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>;
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">User not found.</div>;
  }

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>
          <div className="flex flex-col items-center mb-4">
            {user.profileimage ? (
              <img
                src={user.profileimage}
                alt="Profile"
                className="h-32 w-32 rounded-full border-2 border-blue-600 mb-4"
              />
            ) : (
              <div className="h-32 w-32 flex items-center justify-center rounded-full border-2 border-blue-600 mb-4 bg-blue-200 text-blue-600 text-6xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="space-y-4 text-center">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-gray-800">{user.username}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-800">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link to="/edit-profile" className="text-blue-600 hover:underline"><button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Edit Profile
            </button></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;