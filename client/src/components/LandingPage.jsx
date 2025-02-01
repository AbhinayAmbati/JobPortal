import { FaSearch, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import NavBar from './NavBarOut';
import axios from 'axios';
import { useState, useEffect } from 'react';

const LandingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/job/all-jobs'); 
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Function to get a random selection of jobs
  const getRandomJobs = (jobsArray, count) => {
    const shuffled = jobsArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const displayedJobs = getRandomJobs(jobs, 12);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-6xl font-bold mb-6 text-gray-800">
              Find Your <span className="text-blue-600">Dream Job</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Discover your next career opportunity with ease
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 
                focus:outline-none focus:border-blue-500 transition-all duration-300
                shadow-sm hover:shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 
              bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 
              transition-all duration-300">
                <FaSearch className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="container mx-auto px-4 pb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured <span className="text-blue-600">Opportunities</span>
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 
              rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {displayedJobs.length > 0 ? (
                displayedJobs.map((job) => (
                  <div key={job.jobId} 
                    className="bg-white rounded-xl p-6 transition-all duration-300 
                    hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] group">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 
                      group-hover:text-blue-600 transition-colors duration-300">
                        {job.jobName}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-4">
                        {job.jobDescription}
                      </p>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-gray-600">
                          <FaMapMarkerAlt className="text-blue-600 mr-2" />
                          {job.jobLocation}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaDollarSign className="text-blue-600 mr-2" />
                          {job.jobSalaryRange}
                        </div>
                      </div>
                      <a
                        href={`/job/${job.jobId}`}
                        className="inline-block w-full text-center py-3 rounded-lg 
                        border-2 border-blue-600 text-blue-600 font-medium
                        hover:bg-blue-600 hover:text-white transition-all duration-300"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-20">
                  <p className="text-xl text-gray-600">
                    No jobs available at the moment.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Simple Footer */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Start Your <span className="text-blue-600">Journey</span>?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals who have already found their perfect career match through our platform.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
