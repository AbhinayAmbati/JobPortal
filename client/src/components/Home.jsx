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
        console.error('Error fetching jobs:', error);
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
      <NavBar />
      <div className="flex flex-col pt-20 items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-600 mb-4 text-center">Welcome to the Job Finder Portal</h1>
        <p className="text-lg text-gray-700 mb-6">Find your dream job with ease. Search, apply, and get hired!</p>

        <div className=" mb-6 w-full max-w-md">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <h2 className="text-3xl font-semibold mb-4">Job Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {filteredJobs.map((job) => (
            <div  key={job.jobId} className="bg-white shadow-lg rounded-lg p-6 ">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-blue-600">{job.jobName}</h3>
                <p className="text-gray-700 flex items-center mt-2">
                  <FaBriefcase className="mr-1" /> {job.jobCompanyName}
                </p>
                <p className="text-gray-500 flex items-center">
                  <FaMapMarkerAlt className="mr-1" /> {job.jobLocation}
                </p>
                <p className="mt-2 text-gray-800">{job.jobDescription.substring(0, 100)}...</p>
                <p className="text-gray-800 flex items-center mt-2">
                  <FaDollarSign className="mr-1" /> {job.jobSalaryRange}
                </p>
              </div>
              <div className="mt-4">
                <Link to={`/job/${job.jobId}`}>
                  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
                    View Details
                  </button>
                </Link>
                <a 
                  href={job.applyLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300 text-center block"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-2">Why Choose Us?</h3>
          <p className="text-gray-700 mb-4">
            We connect you with top employers and provide resources to help you succeed in your job search.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
