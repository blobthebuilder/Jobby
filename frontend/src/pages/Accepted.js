import { useEffect } from "react";
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import AcceptedJobDetails from "../components/AcceptedJobDetails";

const Accepted = () => {
  const { jobs, dispatch } = useJobsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/jobs/accepted", {
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
        <h1>Accepted Jobs</h1>
        {jobs &&
          jobs.map((job) => (
            <AcceptedJobDetails
              key={job._id}
              job={job}
            />
          ))}
        {(!jobs || jobs.length === 0) && (
          <p>You don't have any accepted jobs yet.</p>
        )}
      </div>
    </div>
  );
};
export default Accepted;
