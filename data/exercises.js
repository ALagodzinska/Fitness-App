import EXERCISE_TYPE from "../constants/exerciseTypes.js";
import EXERCISE_DURATION from "../constants/exerciseDurations.js";

const DEFAULT_DURATION = EXERCISE_DURATION[0]; // 30 seconds

const allExercises = [
  // Warm-up
  {
    name: "Arm Circles",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP,
  },
  {
    name: "High Knees",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP,
  },
  {
    name: "Torso Twists",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP,
  },
  {
    name: "Leg Swings",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP,
  },
  {
    name: "Butt Kicks",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP,
  },
  {
    name: "Jumping Jacks (Warm-up)",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP,
  },
  {
    name: "Side Lunges",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP,
  },
  {
    name: "Hip Circles",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP,
  },
  {
    name: "Walking Knee Hugs",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.WARMUP,
  },
  // Cardio
  {
    name: "Jumping Jacks",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.CARDIO,
  },
  { name: "Burpees", duration: DEFAULT_DURATION, type: EXERCISE_TYPE.CARDIO },
  {
    name: "Mountain Climbers",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.CARDIO,
  },
  { name: "Skaters", duration: DEFAULT_DURATION, type: EXERCISE_TYPE.CARDIO },

  // Strength
  {
    name: "Push Ups",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.STRENGTH,
  },
  { name: "Squats", duration: DEFAULT_DURATION, type: EXERCISE_TYPE.STRENGTH },
  { name: "Lunges", duration: DEFAULT_DURATION, type: EXERCISE_TYPE.STRENGTH },
  { name: "Plank", duration: DEFAULT_DURATION, type: EXERCISE_TYPE.STRENGTH },

  // Stretching
  {
    name: "Hamstring Stretch",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.STRETCHING,
  },
  {
    name: "Quad Stretch",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.STRETCHING,
  },
  {
    name: "Shoulder Stretch",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.STRETCHING,
  },
  {
    name: "Neck Rolls",
    duration: DEFAULT_DURATION,
    type: EXERCISE_TYPE.STRETCHING,
  },
];

export default allExercises;
