import { useEffect } from "react";
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { GetLocation } from "../components/GetLocation";

import JobPostings from "../components/JobPostings";

const JobBoard = () => {
  const { jobs, dispatch } = useJobsContext();
  const { user } = useAuthContext();
  const { lat, lng } = GetLocation();
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/jobs/find", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          latitude: lat,
          longitude: lng,
          maxDistance: 1000,
        }),
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_JOBS",
          payload: json.filter((job) => job.accepted === "-1"),
        });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user, lat, lng]);
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
        {(!jobs || jobs.length === 0) && <p>No nearby Jobs</p>}
      </div>
    </div>
  );
};

export default JobBoard;
