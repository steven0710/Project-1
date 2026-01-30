import React, { useState, useEffect } from "react";
import { JOB_STATUSES, type Job, type JobStatus } from "./types/jobs"; // your type file
import SavedJobs from "./SavedJobs";
// your type file

const JobForm = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<JobStatus>("Applied");

  const [quote, setQuote] = useState<{ q: string; a: string } | null>(null);

  const api_url = "https://dummyjson.com/quotes/random";

  const getapi = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.quote, data.author);
    setQuote({ q: data.quote, a: data.author });
  };
  // Load saved jobs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("jobs");
    if (saved) setJobs(JSON.parse(saved));
    void getapi(api_url);
    // set interval to fetch every 5s
    const id = window.setInterval(() => {
      void getapi(api_url);
    }, 5000);
    return () => clearInterval(id);
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
      dateApplied: "",
    };
    setJobs([...jobs, newJob]);
    setStatus("Applied");
  };

  // update status for a job at a given index
  const updateJobStatus = (index: number, newStatus: JobStatus) => {
    setJobs((prev) => {
      const updated = prev.map((job, i) =>
        i === index ? { ...job, status: newStatus } : job,
      );
      localStorage.setItem("jobs", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="flex flex-col">
      {quote && (
        <div
          className="pb-16"
          // style={{ backgroundColor: "blue" }}
        >
          “{quote.q}” — <strong>{quote.a}</strong>
        </div>
      )}
      <h2 className="py-4">Add a Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-row p-2">
            <label className="">Company:</label>
            <input
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
              {JOB_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit">Add Job</button>
      </form>
      <h2>Saved Jobs</h2>
      <SavedJobs jobs={jobs} setJobs={setJobs} />
    </div>
  );
};

export default JobForm;
