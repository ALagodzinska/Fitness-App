import EXERCISE_TYPE from "../constants/exerciseTypes.js";
import EXERCISE_DURATION from "../constants/exerciseDurations.js";

const DEFAULT_DURATION = EXERCISE_DURATION[0]; // 30 seconds

const allExercises = [
  // Warm-up
  {
    name: "Arm Circles",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP.name,
  },
  {
    name: "High Knees",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP.name,
  },
  {
    name: "Torso Twists",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP.name,
  },
  {
    name: "Leg Swings",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP.name,
  },
  {
    name: "Butt Kicks",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP.name,
  },
  {
    name: "Jumping Jacks (Warm-up)",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP.name,
  },
  {
    name: "Side Lunges",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP.name,
  },
  {
    name: "Hip Circles",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP.name,
  },
  {
    name: "Walking Knee Hugs",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP.name,
  },
  // Cardio
  {
    name: "Jumping Jacks",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.CARDIO.name,
  },
  { name: "Burpees", duration: DEFAULT_DURATION, type: EXERCISE_TYPE.CARDIO.name },
  {
    name: "Mountain Climbers",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.CARDIO.name,
  },
  { name: "Skaters", duration: DEFAULT_DURATION, type: EXERCISE_TYPE.CARDIO.name },

  // Strength
  {
    name: "Push Ups",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.STRENGTH.name,
  },
  { name: "Squats", duration: DEFAULT_DURATION, type: EXERCISE_TYPE.STRENGTH.name },
  { name: "Lunges", duration: DEFAULT_DURATION, type: EXERCISE_TYPE.STRENGTH.name },
  { name: "Plank", duration: DEFAULT_DURATION, type: EXERCISE_TYPE.STRENGTH.name },

  // Stretching
  {
    name: "Hamstring Stretch",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.STRETCHING.name,
  },
  {
    name: "Quad Stretch",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.STRETCHING.name,
  },
  {
    name: "Shoulder Stretch",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.STRETCHING.name,
  },
  {
    name: "Neck Rolls",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.STRETCHING.name,
  },
];

export default allExercises;
