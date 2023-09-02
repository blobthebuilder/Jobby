import React, { useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: ["places"],
  });

  const [lat, setLat] = useState(48.85);
  const [lng, setLong] = useState(2.29);
  const successCallback = (position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  };

  const errorCallback = (error) => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  if (!isLoaded) {
    return <p>Is Loading</p>;
  }
  const center = { lat: lat, lng: lng };
  return (
    <div>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: true,
        }}
        onLoad={(map) => setMap(map)}>
        <Marker position={center} />
      </GoogleMap>
      <button
        text="center"
        onClick={() => map.panTo(center)}
      />
      <Autocomplete>
        <input
          type="text"
          placeholder="destinations"
        />
      </Autocomplete>
    </div>
  );
}

export default Map;
