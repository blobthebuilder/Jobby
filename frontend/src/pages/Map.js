import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
require("dotenv").config();

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.API_KEY,
  });
  if (isLoaded) {
    return <p>Is Loading</p>;
  }

  return <div>{process.env.API_KEY}</div>;
}

export default Map;
