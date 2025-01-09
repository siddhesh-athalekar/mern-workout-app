const express = require('express');
const { 
  createWorkout, 
  getWorkouts, 
  getWorkout, 
  deleteWorkout, 
  updateWorkout 
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
// require authentication for all routes
router.use(requireAuth);

// get all workouts
router.get('/', getWorkouts);

// Get single workout
router.get('/:id', getWorkout);

// Post new workout
router.post('/', createWorkout);

// Delete a workout
router.delete('/:id', deleteWorkout);

// Edit a workout
router.put('/:id', updateWorkout);

module.exports = router;
