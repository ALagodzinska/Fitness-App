import Exercise from "./Exercise";

class Workout {
  constructor(date) {
    this.exercises = [];
    this.nextID = 1; // Unique ID for each exercise
  }

  addExercise(exercise) {
    if (!(exercise instanceof Exercise)) {
      throw new Error("Invalid exercise: must be an instance of Exercise");
    }

    // Clone the current workout
    const newWorkout = new Workout();
    newWorkout.exercises = [...this.exercises];
    newWorkout.nextID = this.nextID;

    // Add new exercise with ID
    const exerciseWithID = { ...exercise, id: newWorkout.nextID++ };
    newWorkout.exercises.push(exerciseWithID);

    return newWorkout; // return new instance
  }

  removeExerciseById(id) {
    this.exercises = this.exercises.filter((exercise) => exercise.id !== id);
  }

  removeLastMatchingExercise(name, type) {
    /// Clone the current workout
    const newWorkout = new Workout();
    newWorkout.exercises = [...this.exercises];
    newWorkout.nextID = this.nextID;

    // Find matching exercises in newWorkout.exercises
    const matching = newWorkout.exercises.filter(
      (ex) => ex.name === name && ex.type === type
    );

    if (matching.length === 0) return newWorkout; // nothing to remove

    // Find last added
    const lastAdded = matching.reduce((prev, current) =>
      current.id > prev.id ? current : prev
    );

    // Remove it by id
    newWorkout.exercises = newWorkout.exercises.filter(
      (ex) => ex.id !== lastAdded.id
    );

    return newWorkout; // return new instance
  }

  filterExercisesByType(type) {
    return this.exercises.filter((exercise) => exercise.type === type);
  }

  getGroupedStatsByType(type) {
    const result = [];

    const grouped = {};

    for (const exercise of this.exercises) {
      if (exercise.type === type) {
        const key = exercise.name;
        if (!grouped[key]) {
          grouped[key] = {
            exercise,
            count: 0,
          };
        }
        grouped[key].count++;
      }
    }

    for (const key in grouped) {
      result.push(grouped[key]);
    }

    return result;
  }
}

export default Workout;
