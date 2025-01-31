import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import { Plus, X } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
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

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mt-20">
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
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

        {/* Job Posting Form */}
        {showForm && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl mb-4">Post a New Job</h2>
            <form onSubmit={handleSubmitJob}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="jobName"
                  value={newJob.jobName}
                  onChange={handleInputChange}
                  placeholder="Job Title"
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="jobCompanyName"
                  value={newJob.jobCompanyName}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="jobLocation"
                  value={newJob.jobLocation}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="jobSalaryRange"
                  value={newJob.jobSalaryRange}
                  onChange={handleInputChange}
                  placeholder="Salary Range"
                  className="border p-2 rounded"
                />
                <select
                  name="jobType"
                  value={newJob.jobType}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                  required
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                </select>
                <input
                  type="email"
                  name="jobContactEMail"
                  value={newJob.jobContactEMail}
                  onChange={handleInputChange}
                  placeholder="Contact Email"
                  className="border p-2 rounded"
                  required
                />
              </div>
              <textarea
                name="jobDescription"
                value={newJob.jobDescription}
                onChange={handleInputChange}
                placeholder="Job Description"
                className="w-full border p-2 rounded mt-4"
                rows="4"
                required
              />
              <textarea
                name="jobRequirements"
                value={newJob.jobRequirements}
                onChange={handleInputChange}
                placeholder="Job Requirements"
                className="w-full border p-2 rounded mt-4"
                rows="4"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
              >
                Post Job
              </button>
            </form>
          </div>
        )}

        {/* Job Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
          {jobs.map((job) => (
            <div
              key={job.jobId}
              className="border rounded p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold">{job.jobName}</h3>
              <p className="text-gray-600">{job.jobCompanyName}</p>
              <p className="text-sm">{job.jobLocation}</p>
              <p className="text-sm">{job.jobType}</p>
              <p className="text-sm mt-2">{job.jobSalaryRange}</p>
              <Link to={`/job/${job.jobId}`}>
                <button className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Jobs;