import { JobsContext } from "../context/JobsContext";
import { useContext } from "react";

export const useJobsContext = () => {
  const context = useContext(JobsContext);

  if (!context) {
    throw Error("useJobsContext must be used inside an JobsContextProvider");
  }

  return context;
};
