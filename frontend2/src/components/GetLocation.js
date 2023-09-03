import { useState } from "react";

export const GetLocation = () => {
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
  return { lat, lng };
};
