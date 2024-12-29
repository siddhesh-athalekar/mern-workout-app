const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');

// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  }catch(err){
    res.status(400).json({ error: err.message });
  }
};

// Get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ error: 'Workout not found' });
  }

  try {
    const workout = await Workout.findById(id);
    res.status(200).json(workout);
  }catch(err){
    res.status(400).json({ error: err.message });
  }
};

// Create new workout
const createWorkout = async (req, res) => {
  const {title, reps, load} = req.body;

  let emptyFields = [];

  if(!title) emptyFields.push('title');
  if(!load) emptyFields.push('load');
  if(!reps) emptyFields.push('reps');
  if(emptyFields.length > 0){
    return res.status(400).json({ error: `Please provide ${emptyFields.join(', ')}`, emptyFields });
  }

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  }catch(err){
    res.status(400).json({ error: err.message });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ error: 'Workout not found' });
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout);
};

// Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, reps, load } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ error: 'Workout not found' });
  }

  try {
    const workout = await Workout.findByIdAndUpdate(id, { title, reps, load }, { new: true });
    res.status(200).json(workout);
  }catch(err){
    res.status(400).json({ error: err.message });
  }
};


module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout
}
