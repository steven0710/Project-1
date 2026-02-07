import { useState } from "react";
import { JOB_STATUSES, type Job, type JobStatus } from "./types/jobs";
import { addJob } from "./services/jobServices";
type Props = {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
};
const JobForm: React.FC<Props> = ({ setJobs }) => {
  const [company, setCompany] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<JobStatus>("Applied");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newJob: Job = {
      company,
      role,
      status,
      dateApplied: new Date().toISOString(),
    };
    const updated = await addJob(newJob);
    setJobs(updated);
    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <div>
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
    </div>
  );
};

export default JobForm;
