import NavBar from "./NavBar";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import userprofile from "../assets/userPhoto.png"

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newProfileImage, setNewProfileImage] = useState(null);

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

  const handleImageChange = (e) => {
    setNewProfileImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!newProfileImage) {
      toast.error('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', newProfileImage);

    try {
      const id = Cookies.get('sid');
      const response = await axios.put(`http://localhost:8080/api/user/update/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: { id }
      });
      setUser(response.data); 
      window.location.reload();
      toast.success('Profile image updated successfully.');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to update profile image. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
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
            <img 
              src={user.profileimage || userprofile} 
              alt="Profile"
              className="h-32 w-32 rounded-full border-2 border-blue-600 mb-4"
            />
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
          <div className="mt-4">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="mb-2"
            />
            <button 
              onClick={handleImageUpload} 
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Update Profile Image
            </button>
          </div>
          <div className="mt-6 text-center">
            <Link to="/edit-profile" className="text-blue-600 hover:underline">Edit Profile</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;