import { useEffect } from "react";
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import JobPostings from "../components/JobPostings";

const JobBoard = () => {
  const { jobs, dispatch } = useJobsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/jobs/all", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_JOBS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="workouts">
        <h1>Job Board</h1>
        {jobs &&
          jobs.map((job) => (
            <JobPostings
              key={job._id}
              job={job}
            />
          ))}
      </div>
    </div>
  );
};

export default JobBoard;
