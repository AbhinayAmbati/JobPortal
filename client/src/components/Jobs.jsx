import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import { Plus, X, Search, Building2, MapPin, Clock, DollarSign } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newJob, setNewJob] = useState({
    jobName: '',
    jobDescription: '',
    jobCompanyName: '',
    jobLocation: '',
    jobSalaryRange: '',
    jobType: '',
    jobRequirements: '',
    jobContactEMail: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/job/all-jobs`);
        setJobs(response.data);
      } catch (error) {
        toast.error('Failed to fetch jobs');
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/user/job/create', newJob);
      setJobs(prev => [...prev, response.data]);
      toast.success('Job posted successfully');
      setShowForm(false);
      setNewJob({
        jobName: '',
        jobDescription: '',
        jobCompanyName: '',
        jobLocation: '',
        jobSalaryRange: '',
        jobType: '',
        jobRequirements: '',
        jobContactEMail: ''
      });
    } catch (error) {
      toast.error('Failed to post job');
      console.error('Error posting job:', error);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.jobName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.jobCompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.jobLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mt-20 mb-8">
          <h1 className="text-3xl h-10 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-0">
            Job Listings
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {showForm ? (
              <>
                <X size={20} />
                Close Form
              </>
            ) : (
              <>
                <Plus size={20} />
                Post Job
              </>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search jobs by title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>

        {/* Job Posting Form */}
        {showForm && (
          <div className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a New Job</h2>
            <form onSubmit={handleSubmitJob} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Job Title</label>
                  <input
                    type="text"
                    name="jobName"
                    value={newJob.jobName}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    name="jobCompanyName"
                    value={newJob.jobCompanyName}
                    onChange={handleInputChange}
                    placeholder="e.g., Tech Solutions Inc."
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="jobLocation"
                    value={newJob.jobLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., New York, NY"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                  <input
                    type="text"
                    name="jobSalaryRange"
                    value={newJob.jobSalaryRange}
                    onChange={handleInputChange}
                    placeholder="e.g., $80,000 - $120,000"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Job Type</label>
                  <select
                    name="jobType"
                    value={newJob.jobType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    required
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                  <input
                    type="email"
                    name="jobContactEMail"
                    value={newJob.jobContactEMail}
                    onChange={handleInputChange}
                    placeholder="e.g., hiring@company.com"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Job Description</label>
                <textarea
                  name="jobDescription"
                  value={newJob.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the role, responsibilities, and expectations..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  rows="4"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Job Requirements</label>
                <textarea
                  name="jobRequirements"
                  value={newJob.jobRequirements}
                  onChange={handleInputChange}
                  placeholder="List the required skills, experience, and qualifications..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  rows="4"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Post Job
              </button>
            </form>
          </div>
        )}

        {/* Job Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.jobId}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{job.jobName}</h3>
                <div className="space-y-2">
                  <p className="flex items-center text-gray-600">
                    <Building2 className="h-4 w-4 mr-2 text-blue-500" />
                    {job.jobCompanyName}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                    {job.jobLocation}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    {job.jobType}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                    {job.jobSalaryRange}
                  </p>
                </div>
                <Link to={`/job/${job.jobId}`} className="block mt-4">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;