import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useEffect, useState } from "react";

const AcceptedJobDetails = ({ job }) => {
  const { dispatch } = useJobsContext();
  const { user } = useAuthContext();

  if (!user) {
    return;
  }

  const handleClick = async () => {
    const response = await fetch("/api/jobs/finish/" + job._id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
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
      {job.finished && <p>Finished!</p>}
      <p>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</p>
      {!job.finished && (
        <span
          className="material-symbols-outlined"
          onClick={handleClick}>
          Finish
        </span>
      )}
    </div>
  );
};

export default AcceptedJobDetails;
