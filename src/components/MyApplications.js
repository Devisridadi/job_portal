import React, { useEffect, useState } from "react";

function MyApplications({ userId }) {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetch(`/api/applied-jobs/${userId}`)
      .then((res) => res.json())
      .then((data) => setAppliedJobs(data))
      .catch((err) => console.error("Failed to fetch applied jobs:", err));
  }, [userId]);

  return (
    <div>
      <h2>My Applications</h2>
      {appliedJobs.length === 0 && <p>You have not applied for any jobs yet.</p>}
      {appliedJobs.map((job) => (
        <div
          key={job._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{job.title}</h3>
          <p>
            <strong>Company:</strong> {job.company}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;
