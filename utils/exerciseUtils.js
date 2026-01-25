import allExercises from "../data/exercises";

export function filterAllExercisesByType(type) {
  return allExercises.filter((exercise) => exercise.type === type);
}

export function convertSecondsToMins(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}m ${seconds}s`;
}
