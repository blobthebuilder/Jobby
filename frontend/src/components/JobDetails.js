import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Geocode from "react-geocode";

const JobDetails = ({ job }) => {
  const { dispatch } = useJobsContext();
  const { user } = useAuthContext();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [email, setEmail] = useState(null);

  const [address, setAddress] = useState(null);
  useEffect(() => {
    const getEmail = async () => {
      if (job.accepted === "-1") {
        return;
      }
      const response = await fetch("/api/user/" + job.accepted, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setEmail(json.email);
      }
    };

    getEmail();

    try {
      setStartDate(format(new Date(job.startDate), "MM-dd-yyyy"));
      setEndDate(format(new Date(job.endDate), "MM-dd-yyyy"));
    } catch (error) {
      console.log(error);
    }
  });

  if (!user) {
    return;
  }

  Geocode.fromLatLng(
    job.location.coordinates[1],
    job.location.coordinates[0]
  ).then(
    (response) => {
      const address = response.results[0].formatted_address;
      setAddress(address);
    },
    (error) => {
      console.error(error);
    }
  );

  const handleClick = async () => {
    const response = await fetch("/api/jobs/" + job._id, {
      method: "DELETE",
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

      {job.accepted !== "-1" && (
        <p>
          <strong>Accepted by: </strong>
          {email}
        </p>
      )}
      {address && (
        <p>
          <strong>Location: </strong>
          {address}
        </p>
      )}
      <p>
        <strong>From: </strong>
        {startDate} to
        {endDate}
      </p>
      {job.finished && <p>Finished!</p>}
      <p>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</p>
      <span
        className="material-symbols-outlined"
        onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default JobDetails;
