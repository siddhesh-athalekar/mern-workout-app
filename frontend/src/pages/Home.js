import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch('/api/workouts', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const data = await res.json();
        if(res.ok){
          console.log(data);
          dispatch({ type: 'SET_WORKOUTS', payload: data });
        }
      }catch(err){
        console.log(err);
      }
    };
    if(user){
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts && workouts.map(workout => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
