import React, { useState, useEffect } from "react";
import type { Job, JobStatus } from "./types/jobs"; // your type file
// your type file

const JobForm = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<JobStatus>("Applied");

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("jobs");
    if (saved) setJobs(JSON.parse(saved));
  }, []);

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      company,
      role,
      status,
    };
    setJobs([...jobs, newJob]);
    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <div>
      <h2>Add a Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3">
          <div className="flex flex-row p-2">
            <label className="">Company:</label>
            <input
              className=""
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Role:</label>
            <input
              className=""
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as JobStatus)}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <button type="submit">Add Job</button>
      </form>

      <h2>Saved Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.company}>
            {job.company} - {job.role} ({job.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobForm;
