import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import './employee.css';

function EmployeeDashboard() {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(res => setJobs(res.data))
      .catch(err => {
        console.error(err);
        alert("Failed to load jobs");
      });
  }, []);

  const handleApply = async (jobId, title) => {
  const employeeEmail = localStorage.getItem("email"); // Or pass this from login

  try {
    const res = await axios.post('http://localhost:5000/api/apply', {
      jobId,
      employeeEmail
    });

    alert(res.data.message);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Apply failed");
  }
};


  return (
    <div className="dashboard">
      <header>
        <h2>Welcome, Employee 👩‍💼</h2>
        <div className="navbar">
        <nav>
          <a href="/employee-dashboard">Dashboard</a>
          <Link to="/my-applications">My Applications</Link>
          <a href="/login">Logout</a>
        </nav>
        </div>
      </header>

      <main>
        <h3>Available Jobs</h3>
        <div className="jobs-list">
          {jobs.length > 0 ? (
            jobs.map(job => (
              <div key={job._id} className="job-card">
                <h4>{job.title}</h4>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <button onClick={() => handleApply(job._id, job.title)}>Apply</button>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default EmployeeDashboard;
