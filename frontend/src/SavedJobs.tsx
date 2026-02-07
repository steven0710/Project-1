import React, { useState } from "react";
import { JOB_STATUSES, type Job, type JobStatus } from "./types/jobs";

type Props = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
};

const SavedJobs: React.FC<Props> = ({ jobs, setJobs }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editCompany, setEditCompany] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState<JobStatus>("Applied");

  const startEdit = (i: number) => {
    const j = jobs[i];
    setEditCompany(j.company);
    setEditRole(j.role);
    setEditStatus(j.status);
    setEditingIndex(i);
  };

  const saveEdit = (i: number) => {
    setJobs((prev) => {
      const updated = prev.map((job, idx) =>
        idx === i
          ? { ...job, company: editCompany, role: editRole, status: editStatus }
          : job,
      );
      localStorage.setItem("jobs", JSON.stringify(updated));
      return updated;
    });
    setEditingIndex(null);
  };

  const cancelEdit = () => setEditingIndex(null);

  const deleteJob = (i: number) => {
    setJobs((prev) => {
      const updated = prev.filter((_, idx) => idx !== i);
      localStorage.setItem("jobs", JSON.stringify(updated));
      return updated;
    });
  };

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
    <>
      <h2>Saved Jobs</h2>
      <ul>
        {jobs.map((job, i) => (
          <li
            key={i}
            className="flex justify-between items-center border p-2 mb-2"
          >
            <div>
              {editingIndex === i ? (
                <div className="flex gap-2 items-center">
                  <input
                    value={editCompany}
                    onChange={(e) => setEditCompany(e.target.value)}
                  />
                  <input
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                  />
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as JobStatus)}
                  >
                    {JOB_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  {job.company} - {job.role} (<span>{job.status}</span>){" "}
                  {new Date(job.dateApplied).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {editingIndex === i ? (
                <>
                  <button onClick={() => saveEdit(i)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => deleteJob(i)}>Delete</button>
                  <button onClick={() => startEdit(i)}>Edit</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SavedJobs;
