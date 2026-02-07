import { useState, useEffect } from "react";
import { type Job } from "./types/jobs"; // your type file
import SavedJobs from "./SavedJobs";
import { getJobs } from "./services/jobServices";
import QuoteDisplay from "./quoteDisplay";
import AddJobs from "./AddJobs";
// your type file

const JobForm = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load saved jobs from localStorage on mount

  useEffect(() => {
    getJobs().then(setJobs);
  }, []);

  return (
    <div className="flex flex-col relative">
      <QuoteDisplay />
      <AddJobs setJobs={setJobs} />
      <SavedJobs jobs={jobs} setJobs={setJobs} />
    </div>
  );
};

export default JobForm;
