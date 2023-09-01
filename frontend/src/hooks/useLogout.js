import { useAuthContext } from "./useAuthContext";
import { useJobsContext } from "./useJobsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: jobsDispatch } = useJobsContext();

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });

    // i didnt need this line for my website
    jobsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
