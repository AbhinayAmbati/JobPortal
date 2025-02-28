import NavBar from './NavBar';
import { FaBriefcase, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/job/all-jobs'); 
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.jobName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <NavBar />
        <div className="flex flex-col pt-24 items-center justify-center p-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Welcome to the Job Finder Portal
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find your dream job with ease. Search, apply, and get hired!
            </p>
          </div>

          <div className="mb-12 w-full max-w-2xl relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search jobs by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
            />
          </div>

          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Available Positions
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {filteredJobs.map((job) => (
              <div key={job.jobId} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                      {job.jobName}
                    </h3>
                    <p className="text-gray-700 flex items-center mt-3">
                      <FaBriefcase className="mr-2 text-blue-500" /> {job.jobCompanyName}
                    </p>
                    <p className="text-gray-600 flex items-center mt-2">
                      <FaMapMarkerAlt className="mr-2 text-blue-500" /> {job.jobLocation}
                    </p>
                    <p className="mt-4 text-gray-600 line-clamp-3">{job.jobDescription}</p>
                    <p className="text-gray-700 flex items-center mt-3 font-semibold">
                      <FaDollarSign className="mr-2 text-green-500" /> {job.jobSalaryRange}
                    </p>
                  </div>
                  <div className="mt-6 space-y-3">
                    <Link to={`/job/${job.jobId}`} className="block">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-300 font-medium">
                        View Details
                      </button>
                    </Link>
                    <Link
                      to={`${job.jobApplyLink}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 rounded-lg hover:from-green-700 hover:to-green-800 transition duration-300 text-center font-medium"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 mb-12 text-center max-w-3xl">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Us?
            </h3>
            <p className="text-xl text-gray-600">
              We connect you with top employers and provide resources to help you succeed in your job search.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
