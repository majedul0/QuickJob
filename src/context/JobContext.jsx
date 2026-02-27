import { createContext, useContext, useState, useCallback } from "react";
import { MOCK_JOBS } from "../data/jobs";

const JobContext = createContext(null);

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [applications, setApplications] = useState([]);

  const addJob = useCallback((job) => {
    setJobs((prev) => [
      { ...job, id: Date.now(), postedAt: new Date().toISOString().split("T")[0] },
      ...prev,
    ]);
  }, []);

  const deleteJob = useCallback((id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }, []);

  const getJobById = useCallback(
    (id) => jobs.find((job) => job.id === Number(id)),
    [jobs]
  );

  const addApplication = useCallback((application) => {
    setApplications((prev) => [...prev, { ...application, id: Date.now(), appliedAt: new Date().toISOString() }]);
  }, []);

  return (
    <JobContext.Provider
      value={{ jobs, addJob, deleteJob, getJobById, applications, addApplication }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error("useJobs must be used within a JobProvider");
  return ctx;
}
