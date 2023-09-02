import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const JobPostings = ({ job }) => {
  const { dispatch } = useJobsContext();
  const { user } = useAuthContext();

  if (!user) {
    return;
  }

  const handleClick = async () => {
    const accept = {
      pay: 999,
    };
    const response = await fetch("/api/jobs/" + job._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(accept),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_JOB", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{job.title}</h4>
      <p>
        <strong>Description: </strong>
        {job.description}
      </p>
      <p>
        <strong>Pay: </strong>
        {job.pay}
      </p>
      <p>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</p>
      <span
        className="material-symbols-outlined"
        onClick={handleClick}>
        Accept
      </span>
    </div>
  );
};

export default JobPostings;
