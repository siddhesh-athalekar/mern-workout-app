import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch('/api/workouts');
        const data = await res.json();
        if(res.ok){
          console.log(data);
          dispatch({ type: 'SET_WORKOUTS', payload: data });
        }
      }catch(err){
        console.log(err);
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div classname='home'>
      <div classname='workouts'>
        {workouts && workouts.map(workout => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
