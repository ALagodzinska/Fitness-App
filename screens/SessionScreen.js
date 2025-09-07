import { StyleSheet, Text, View } from "react-native";
import { useWorkout } from "../contexts/WorkoutContext";
import { useEffect, useState } from "react";
import { WORKOUT_STATUS } from "../constants/workoutStatus";
import { LinearGradient } from "expo-linear-gradient";
import ExerciseTime from "../components/ExerciseTime";

function SessionScreen() {
  const { workout } = useWorkout();

  const [session, setSession] = useState({
    activeExerciseIndex: 0,
    timeRemainingInExercise: workout.exercises[0].duration,
    totalTimeRemaining: workout.getTotalWorkoutDuration(),
    status: WORKOUT_STATUS.INPROGRESS,
  });

  function updateSession() {
    setSession((prevSession) => {
      let exerciseTime = prevSession.timeRemainingInExercise - 1;
      let totalTimeLeft = prevSession.totalTimeRemaining - 1;
      let activeIndex = prevSession.activeExerciseIndex;

      if (totalTimeLeft === 0) {
        return {
          ...prevSession,
          timeRemainingInExercise: exerciseTime,
          totalTimeRemaining: totalTimeLeft,
          status: WORKOUT_STATUS.COMPLETED,
        };
      }

      if (exerciseTime === 0) {
        activeIndex += 1;
        if (activeIndex === workout.exercises.length) {
          return {
            ...prevSession,
            status: WORKOUT_STATUS.COMPLETED,
          };
        } else {
          exerciseTime = workout.exercises[activeIndex].duration;
        }
      }

      return {
        ...prevSession,
        activeExerciseIndex: activeIndex,
        timeRemainingInExercise: exerciseTime,
        totalTimeRemaining: totalTimeLeft,
      };
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (session.status === WORKOUT_STATUS.INPROGRESS) {
        updateSession();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  return (
    <LinearGradient colors={["#004D40", "#E3F2FD"]} style={styles.rootScreen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>WORKOUT SESSION</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.exerciseName}>
          {workout.exercises[session.activeExerciseIndex].name}
        </Text>
        <Text style={styles.timeText}>{session.timeRemainingInExercise}s</Text>
        <ExerciseTime
          timeRemaining={session.timeRemainingInExercise}
          duration={workout.exercises[session.activeExerciseIndex].duration}
        />
        <Text style={styles.totalTimeText}>
          Total: {session.totalTimeRemaining}s
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    width: "100%",
  },
  titleContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
    textTransform: "uppercase",
    lineHeight: 46,
    textAlign: "center",
    color: "#E0F2F1",
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  timeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  totalTimeText: {
    fontSize: 16,
    color: "#E0F2F1",
  },
});

export default SessionScreen;
