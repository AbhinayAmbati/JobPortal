import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaEnvelope,
  FaBusinessTime,
} from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { BsFilePost } from "react-icons/bs";

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
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        Job not found.
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">{job.jobName}</h1>
          <h2 className="text-xl font-semibold mb-2">
            Company: {job.jobCompanyName}
          </h2>
          <p className="text-gray-700 mb-4 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-600" /> {job.jobLocation}
          </p>
          <p className="text-gray-800 mb-4 flex items-center">
            <CgDetailsMore className="mr-2 text-gray-600" />
            Description: {job.jobDescription}
          </p>
          <p className="text-gray-800 mb-4 flex items-center">
            <FaDollarSign className="mr-2 text-gray-600" />
            Salary: {job.jobSalaryRange}
          </p>
          <p className="text-gray-800 mb-4 flex items-center">
            <FaBusinessTime className="mr-2 text-gray-600" />
            Experience: {job.jobRequirements}
          </p>
          <p className="text-gray-800 mb-4 flex items-center">
            <BsFilePost className="mr-2 text-gray-600" />
            Posted on: {new Date(job.createdOn).toDateString()}
          </p>
          <p className="text-gray-800 mb-4 flex items-center">
            <FaEnvelope className="mr-2 text-gray-600" /> Contact:{" "}
            {job.jobContactEMail}
          </p>
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 text-center block"
          >
            Apply Now
          </a>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
