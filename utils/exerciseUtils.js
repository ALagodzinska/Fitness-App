import allExercises from "../data/exercises";

export function filterAllExercisesByType(type) {
  return allExercises.filter((exercise) => exercise.type === type);
}
