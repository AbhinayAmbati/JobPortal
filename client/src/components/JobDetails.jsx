import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Building2,
  MapPin,
  DollarSign,
  Mail,
  Clock,
  Briefcase,
  CalendarDays,
  GraduationCap,
  ExternalLink
} from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/job/jobs/${id}`
        );
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
          <p className="text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
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
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">{job.jobName}</h1>
              <div className="flex items-center space-x-2 text-blue-100">
                <Building2 className="h-5 w-5" />
                <span className="text-xl">{job.jobCompanyName}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>{job.jobLocation}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <span>{job.jobSalaryRange}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Briefcase className="h-5 w-5 text-blue-500" />
                  <span>{job.jobType}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <CalendarDays className="h-5 w-5 text-blue-500" />
                  <span>Posted on {new Date(job.createdOn).toLocaleDateString('en-US', { 
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                    Job Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {job.jobDescription}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
                    Requirements
                  </h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {job.jobRequirements}
                  </p>
                </div>

                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <a href={`mailto:${job.jobContactEMail}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                    {job.jobContactEMail}
                  </a>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  Apply Now
                  <ExternalLink className="h-5 w-5 ml-2" />
                </a>
                <button
                  onClick={() => window.history.back()}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300 text-center font-medium"
                >
                  Back to Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
