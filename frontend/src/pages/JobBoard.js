import { useEffect } from "react";
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { GetLocation } from "../components/GetLocation";
import { useState } from "react";

import JobPostings from "../components/JobPostings";

const JobBoard = () => {
  const { jobs, dispatch } = useJobsContext();
  const { user } = useAuthContext();
  const { lat, lng } = GetLocation();

  const [distance, setDistance] = useState(1000);
  useEffect(() => {
    const fetchWorkouts = async () => {
      const dist = distance * 1000;
      const response = await fetch("/api/jobs/find", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          latitude: lat,
          longitude: lng,
          maxDistance: dist,
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
  }, [dispatch, user, lat, lng, distance]);

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
      <form>
        <label>Max distance in km:</label>
        <input
          type="number"
          onChange={(e) => setDistance(e.target.value)}
          value={distance}
        />
      </form>
    </div>
  );
};

export default JobBoard;
