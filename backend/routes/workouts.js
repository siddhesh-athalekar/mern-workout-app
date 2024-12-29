const express = require('express');
const { 
  createWorkout, 
  getWorkouts, 
  getWorkout, 
  deleteWorkout, 
  updateWorkout 
} = require('../controllers/workoutController');
const router = express.Router();

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
