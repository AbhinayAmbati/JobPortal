import NavBar from "./NavBar";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import profileimage from "../assets/userPhoto.png"
import loadingIcon from "../assets/Rolling@1x-1.0s-200px-200px.gif"

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const id = Cookies.get('sid');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/profile', {
          params: { id }
        });
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    setNewProfileImage(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (newProfileImage) {
      formData.append('image', newProfileImage);
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/user/update/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params : {id},
      });
      setUser(response.data);
      toast.success('Profile updated successfully.');
      navigate('/profile'); 
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return <img src={loadingIcon} height="10px" width="10px"/>;
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">User not found.</div>;
  }

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h1 className="text-3xl font-bold text-center mb-6">Edit Profile</h1>
          <form className="space-y-4" onSubmit={handleUpdateProfile}>
            <div className="flex flex-col items-center mb-4">
              <img 
                src={user.profileimage || profileimage} 
                alt="Profile"
                className="h-32 w-32 rounded-full border-2 border-blue-600 mb-4"
              />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="mb-2"
              />
            </div>
            <div className="relative">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
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
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;