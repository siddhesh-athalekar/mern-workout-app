import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchWorkouts } = useWorkoutsContext();

  const logout = () => {
    // remove user from localstorage
    localStorage.removeItem("user");

    // update dispatch function
    dispatch({ type: "LOGOUT" });
    dispatchWorkouts({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
