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
    const exerciseWithID = new Exercise(
      exercise.name,
      exercise.type,
      exercise.duration,
    );
    exerciseWithID.id = newWorkout.nextID++;
    newWorkout.exercises.push(exerciseWithID);

    newWorkout.incrementStats(exercise.name, exercise.type);

    return newWorkout; // return new instance
  }

  removeExerciseById(id) {
    const newWorkout = new Workout();
    newWorkout.exercises = [...this.exercises];
    newWorkout.nextID = this.nextID;
    newWorkout.stats = [...this.stats];

    const exerciseToRemove = newWorkout.exercises.find((ex) => ex.id === id);
    if (!exerciseToRemove) return newWorkout;

    // Decrement stats
    newWorkout.decrementStats(exerciseToRemove.name, exerciseToRemove.type);

    // Remove by id
    newWorkout.exercises = newWorkout.exercises.filter((ex) => ex.id !== id);

    return newWorkout;
  }

  removeLastMatchingExercise(name, type) {
    const matching = this.exercises.filter(
      (ex) => ex.name === name && ex.type === type,
    );
    if (matching.length === 0) return this;

    const lastAdded = matching.reduce((prev, current) =>
      current.id > prev.id ? current : prev,
    );

    return this.removeExerciseById(lastAdded.id);
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
      (s) => s.name === name && s.type === type,
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

  getExerciseByTypeCount(type) {
    return this.getGroupedStatsByType(type).reduce(
      (total, stat) => total + stat.count,
      0,
    );
  }

  getTotalWorkoutDuration() {
    return this.exercises.reduce(
      (total, exercise) => total + exercise.duration,
      0,
    );
  }

  getDurationAsString() {
    const durationInSeconds = this.getTotalWorkoutDuration();
    if (durationInSeconds <= 0) return "";
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;
    if (hours > 0)
      return seconds > 0
        ? `${hours} hr ${minutes} min ${seconds} s`
        : `${hours} hr ${minutes} min`;
    return seconds > 0 ? `${minutes} min ${seconds} s` : `${minutes} min`;
  }

  getExerciseCount(name, type) {
    const exercisesStats = this.stats.find(
      (s) => s.name === name && s.type === type,
    );
    return exercisesStats ? exercisesStats.count : 0;
  }

  reorderExercises(newOrder) {
    const newWorkout = new Workout();
    newWorkout.exercises = newOrder;
    newWorkout.nextID = this.nextID;
    newWorkout.stats = [...this.stats];
    return newWorkout;
  }

  shuffleExercises() {
    const shuffled = [...this.exercises];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const newWorkout = new Workout();
    newWorkout.exercises = shuffled;
    newWorkout.nextID = this.nextID;
    newWorkout.stats = [...this.stats];
    return newWorkout;
  }
}

export default Workout;
