import EXERCISE_TYPE from "../constants/exerciseTypes";

class Exercise {
  constructor(name, type, duration) {
    if (!Object.values(EXERCISE_TYPE).includes(type)) {
      throw new Error(`Invalid exercise type: ${type}`);
    }

    if (duration <= 0) {
      throw new Error(
        `Invalid duration: ${duration}. Duration must be greater than 0.`
      );
    }

    this.name = name;
    this.type = type;
    this.duration = duration; // in seconds
  }
}

export default Exercise;
