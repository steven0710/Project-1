export type JobStatus = "Applied" | "Interview" | "Rejected";

export interface Job {
  company: string;
  role: string;
  status: JobStatus;
}
