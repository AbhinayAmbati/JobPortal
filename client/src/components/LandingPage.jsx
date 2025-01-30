import { FaSearch } from 'react-icons/fa';
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
      <div className="flex flex-col pt-20 items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to the Job Finder Portal</h1>
          <p className="text-lg text-gray-700 mb-6">Find your dream job with ease. Search, apply, and get hired!</p>
          <div className="flex justify-center mb-4">
            <input 
              type="text" 
              placeholder="Search for jobs..." 
              className="p-3 border border-gray-300 rounded-l w-1/2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition duration-300">
              <FaSearch />
            </button>
          </div>
        </div>
        <h2 className="text-3xl font-semibold mb-4">Job Listings</h2>
        {loading ? (
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {displayedJobs.length > 0 ? (
              displayedJobs.map((job) => (
                <div key={job.jobId} className="bg-white shadow-md rounded-lg p-6 transition hover:shadow-lg">
                  <h3 className="text-xl font-semibold text-blue-600">{job.jobName}</h3>
                  <p className="text-gray-700 mt-2">{job.jobDescription.substring(0, 100)}...</p>
                  <p className="text-gray-500 mt-2">Location: {job.jobLocation}</p>
                  <p className="text-gray-800 mt-2">Salary: {job.jobSalaryRange}</p>
                  <div className="mt-4">
                    <a
                      href={`/job/${job.jobId}`}
                      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-2 text-center">No jobs available.</div>
            )}
          </div>
        )}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-2">Why Choose Us?</h3>
          <p className="text-gray-700 mb-4">
            We connect you with top employers and provide resources to help you succeed in your job search.
          </p>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
