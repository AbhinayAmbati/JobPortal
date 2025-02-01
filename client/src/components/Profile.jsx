import NavBar from "./NavBar";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Phone, 
  Calendar,
  Edit3,
  Github,
  Linkedin,
  Globe,
  Save,
  X
} from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPosition,setCurrentPosition] = useState('');
  const [location, setLocation] = useState('');
  const [education, setEducation] = useState('');
  const [phone, setPhone] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');

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
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const userData = {
    currentPosition,
    location,
    education,
    phone,
    portfolio,
    github,
    linkedin
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = Cookies.get('sid');
    try {
      const response = await axios.put(`http://localhost:8080/api/user/user-info`,
        userData,
        {
          params: { id }
        }
      );
      window.location.reload();
      setUser(response.data);
      console.log(response.data);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
          <p className="text-gray-600">Unable to load user profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-32"></div>
            <div className="px-8 pb-8">
              <div className="relative">
                <div className="-mt-16 mb-4">
                  {user.profileimage ? (
                    <img
                      src={user.profileimage}
                      alt="Profile"
                      className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="h-32 w-32 flex items-center justify-center rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white text-6xl font-bold">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="absolute top-0 right-0 bg-white text-blue-600 hover:text-blue-700 p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  {isEditing ? (
                    <>
                      <X className="h-5 w-5" />
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-5 w-5" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
                  <div className="flex items-center space-x-2 text-gray-600 mt-1">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${user.email}`} className="hover:text-blue-600 hover:underline">
                      {user.email}
                    </a>
                  </div>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Current Position</label>
                        <input
                          type="text"
                          name="currentPosition"
                          value={currentPosition}
                          onChange={(e) => setCurrentPosition(e.target.value)}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                          placeholder="e.g., Student, Software Engineer"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                          placeholder="e.g., Vijayawada, India"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Education</label>
                        <input
                          type="text"
                          name="education"
                          value={education}
                          onChange={(e) => setEducation(e.target.value)}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                          placeholder="e.g., Bachelor of Technology"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                          placeholder="e.g., +91 1234567890"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Social Links</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
                          <input
                            type="url"
                            name="githubUrl"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="https://github.com/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                          <input
                            type="url"
                            name="linkedinUrl"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Portfolio URL</label>
                          <input
                            type="url"
                            name="portfolioUrl"
                            value={portfolio}
                            onChange={(e) => setPortfolio(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="https://portfolio.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center space-x-2"
                      >
                        <Save className="h-5 w-5" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-gray-600">
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Current Position</p>
                            <p className="font-medium">{user.currentPosition || 'Not specified'}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <MapPin className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{user.location || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-gray-600">
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <GraduationCap className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Education</p>
                            <p className="font-medium">{user.education || 'Not specified'}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <Phone className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{user.phone || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect with me</h3>
                      <div className="flex space-x-4">
                        {user.githubUrl && (
                          <a 
                            href={user.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                            title="GitHub"
                          >
                            <Github className="h-5 w-5 text-gray-700" />
                          </a>
                        )}
                        {user.linkedinUrl && (
                          <a 
                            href={user.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                            title="LinkedIn"
                          >
                            <Linkedin className="h-5 w-5 text-gray-700" />
                          </a>
                        )}
                        {user.portfolioUrl && (  
                          <a 
                            href={user.portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                            title="Portfolio"
                          >
                            <Globe className="h-5 w-5 text-gray-700" />
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;