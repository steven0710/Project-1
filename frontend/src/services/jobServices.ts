import type { Job } from "../types/jobs";

const STORAGE_KEY = "jobs";

export async function getJobs(): Promise<Job[]> {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export async function addJob(job: Job): Promise<Job[]> {
  const jobs = await getJobs();
  const updated = [...jobs, job];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
