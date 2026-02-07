export type JobStatus = "Applied" | "Interviewing" | "Pending" | "Rejected";
export const JOB_STATUSES: JobStatus[] = [
  "Applied",
  "Interviewing",
  "Pending",
  "Rejected",
];
export interface Job {
  company: string;
  role: string;
  status: JobStatus;
  dateApplied: string; // ISO date string
  location?: string;
}
