import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Geocode from "react-geocode";

const JobPostings = ({ job }) => {
  const { dispatch } = useJobsContext();
  const { user } = useAuthContext();
  const [address, setAddress] = useState(null);

  if (!user) {
    return;
  }

  Geocode.fromLatLng(
    job.location.coordinates[1],
    job.location.coordinates[0]
  ).then(
    (response) => {
      const address = response.results[0].formatted_address;
      console.log(response);
      setAddress(address);
    },
    (error) => {
      console.error(error);
    }
  );

  const handleClick = async () => {
    const response = await fetch("/api/jobs/accept/" + job._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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
      {address && (
        <p>
          <strong>Location: </strong>
          {address}
        </p>
      )}
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
