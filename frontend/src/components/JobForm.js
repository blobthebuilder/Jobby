import { useState } from "react";
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useJsApiLoader } from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const libraries = ["places"];
const JobForm = () => {
  const { dispatch } = useJobsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pay, setPay] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  Geocode.setApiKey(process.env.REACT_APP_API_KEY);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    // convert location to lat and lng
    pushPost();
  };

  const pushPost = async () => {
    const job = {
      title,
      description,
      pay,
      latitude: lat,
      longitude: lng,
      accepted: "-1",
      finished: false,
      startDate,
      endDate,
    };
    console.log(job);

    const res = await fetch("/api/jobs", {
      method: "POST",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (res.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setDescription("");
      setPay("");
      setStartDate("");
      setEndDate("");
      setLocation("");
      dispatch({ type: "CREATE_JOB", payload: json });
    }
  };

  return (
    <form
      className="create"
      onSubmit={handleSubmit}>
      <h3>Add a New Job</h3>

      <label>Job Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />

      <label>Pay:</label>
      <input
        type="number"
        onChange={(e) => setPay(e.target.value)}
        value={pay}
        className={emptyFields.includes("pay") ? "error" : ""}
      />
      <label>Location: </label>
      <Autocomplete
        apiKey={process.env.REACT_APP_API_KEY}
        onPlaceSelected={(place) => {
          setLocation(place.formatted_address);
          Geocode.fromAddress(place.formatted_address).then(
            (response) => {
              const { lat: latitude, lng: longitude } =
                response.results[0].geometry.location;
              setLat(latitude);
              setLng(longitude);
            },
            (error) => {
              console.error("couldnt get Geocode" + error);
            }
          );
        }}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        value={location}
        options={{ types: [] }}
        className={emptyFields.includes("location") ? "error" : ""}
      />

      <label>Start Date:</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <label>End Date:</label>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
      />

      <button>Add Job</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default JobForm;
