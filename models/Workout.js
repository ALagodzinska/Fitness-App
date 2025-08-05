import Exercise from "./Exercise";

class Workout {
  constructor(date) {
    this.exercises = [];
    this.nextID = 1; // Unique ID for each exercise
    this.stats = [];
  }

  addExercise(exercise) {
    if (!(exercise instanceof Exercise)) {
      throw new Error("Invalid exercise: must be an instance of Exercise");
    }

    // Clone the current workout
    const newWorkout = new Workout();
    newWorkout.exercises = [...this.exercises];
    newWorkout.nextID = this.nextID;
    newWorkout.stats = [...this.stats];

    // Add new exercise with ID
    const exerciseWithID = { ...exercise, id: newWorkout.nextID++ };
    newWorkout.exercises.push(exerciseWithID);

    console.log("addindg", exercise.name, exercise.type);

    newWorkout.incrementStats(exercise.name, exercise.type);

    return newWorkout; // return new instance
  }

  removeLastMatchingExercise(name, type) {
    /// Clone the current workout
    const newWorkout = new Workout();
    newWorkout.exercises = [...this.exercises];
    newWorkout.nextID = this.nextID;
    newWorkout.stats = [...this.stats];

    // Find matching exercises in newWorkout.exercises
    const matching = newWorkout.exercises.filter(
      (ex) => ex.name === name && ex.type === type
    );

    if (matching.length === 0) return newWorkout; // nothing to remove

    // Decrement stats
    newWorkout.decrementStats(name, type);

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

  incrementStats(name, type) {
    const stat = this.stats.find((s) => s.name === name && s.type === type);
    if (stat) {
      stat.count += 1;
    } else {
      this.stats.push({ name, type, count: 1 });
    }
  }

  decrementStats(name, type) {
    const statIndex = this.stats.findIndex(
      (s) => s.name === name && s.type === type
    );
    if (statIndex !== -1) {
      this.stats[statIndex].count -= 1;
      if (this.stats[statIndex].count <= 0) {
        this.stats.splice(statIndex, 1); // Remove if count is zero
      }
    }
  }

  getGroupedStatsByType(type) {
    return this.stats.filter((stat) => stat.type === type);
  }

  getExerciseCount(name, type) {
    const exercisesStats = this.stats.find(
      (s) => s.name === name && s.type === type
    );
    return exercisesStats ? exercisesStats.count : 0;
  }
}

export default Workout;
