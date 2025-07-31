import Exercise from "./Exercise";

class Workout {
  constructor(date) {
    this.exercises = [];
    this.nextID = 1; // Unique ID for each exercise
  }

  addExercise(exercise) {
    if (!(exercise instanceof Exercise)) {
      throw new Error(
        "Invalid exercise: must be an instance of Exercise or its subclasses"
      );
    }
    const exerciseWithID = {
      ...exercise,
      id: this.nextID++,
    };
    this.exercises.push(exerciseWithID);
  }

  removeExerciseById(id) {
    this.exercises = this.exercises.filter((exercise) => exercise.id !== id);
  }

  removeLastMatchingExercise(name, type) {
    // Find matching exercises
    const matching = this.exercises.filter(
      (exercise) => exercise.name === name && exercise.type === type
    );

    if (matching.length === 0) return;

    // Find the one with the highest ID
    const lastAdded = matching.reduce((prev, current) =>
      current.id > prev.id ? current : prev
    );

    // Remove it
    this.removeExerciseById(lastAdded.id);
  }

  filterExercisesByType(type) {
    return this.exercises.filter((exercise) => exercise.type === type);
  }
}

export default Workout;
