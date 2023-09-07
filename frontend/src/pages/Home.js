import { useEffect } from "react";
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import JobDetails from "../components/JobDetails";
import JobForm from "../components/JobForm";

const Home = () => {
  const { jobs, dispatch } = useJobsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/jobs", {
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
        <h1>My Jobs</h1>
        {jobs &&
          jobs.map((job) => (
            <JobDetails
              key={job._id}
              job={job}
            />
          ))}
        {(!jobs || jobs.length === 0) && <p>You don't have any jobs yet.</p>}
      </div>
      <JobForm />
    </div>
  );
};
export default Home;
