import { useState, useEffect, useRef } from "react";
import { JOB_STATUSES, type Job, type JobStatus } from "./types/jobs"; // your type file
import SavedJobs from "./SavedJobs";
import { getJobs } from "./services/jobServices";
import { getRandomQuote } from "./services/quoteServices";
// your type file

const JobForm = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<JobStatus>("Applied");

  const [quote, setQuote] = useState<{ q: string; a: string } | null>(null);

  const timeoutRef = useRef<number | null>(null);
  // Load saved jobs from localStorage on mount

  useEffect(() => {
    getJobs().then(setJobs);

    let isMounted = true;

    const fetchQuote = async () => {
      try {
        const q = await getRandomQuote();
        if (!isMounted) return;
        setQuote(q);
        timeoutRef.current = window.setTimeout(fetchQuote, 10000);
      } catch (err) {
        console.error(err);
      }
      // schedule next fetch 10s after previous fetch completes
    };

    fetchQuote(); // first fetch

    return () => {
      isMounted = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newJob: Job = {
      company,
      role,
      status,
      dateApplied: new Date().toISOString(),
    };
    setJobs([...jobs, newJob]);
    setStatus("Applied");
  };

  // // update status for a job at a given index
  // const updateJobStatus = (index: number, newStatus: JobStatus) => {
  //   setJobs((prev) => {
  //     const updated = prev.map((job, i) =>
  //       i === index ? { ...job, status: newStatus } : job,
  //     );
  //     localStorage.setItem("jobs", JSON.stringify(updated));
  //     return updated;
  //   });
  // };

  return (
    <div className="flex flex-col relative">
      {quote && (
        <div className="absolute top-0 left-0 w-full h-20">
          {quote.q}" — {<strong>{quote.a}</strong>}
        </div>
      )}

      <h2 className="py-16">Add a Job</h2>
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
