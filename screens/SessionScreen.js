import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useWorkout } from "../contexts/WorkoutContext";
import { useEffect, useState } from "react";
import { WORKOUT_STATUS } from "../constants/workoutStatus";
import { LinearGradient } from "expo-linear-gradient";
import ExerciseTime from "../components/ExerciseTime";
import { convertSecondsToMins } from "../utils/exerciseUtils";
import { setAudioModeAsync, useAudioPlayer } from "expo-audio";

function SessionScreen() {
  const { workout } = useWorkout();

  const [session, setSession] = useState({
    activeExerciseIndex: 0,
    timeRemainingInExercise: workout.exercises[0].duration,
    totalTimeRemaining: workout.getTotalWorkoutDuration(),
    status: WORKOUT_STATUS.INPROGRESS,
  });

  function handlePause() {
    setSession((prev) => ({
      ...prev,
      status:
        prev.status === WORKOUT_STATUS.INPROGRESS
          ? WORKOUT_STATUS.PAUSED
          : WORKOUT_STATUS.INPROGRESS,
    }));
  }

  function updateSession() {
    setSession((prevSession) => {
      let exerciseTime = prevSession.timeRemainingInExercise - 1;
      let totalTimeLeft = prevSession.totalTimeRemaining - 1;
      let activeIndex = prevSession.activeExerciseIndex;

      // play beep when there are 3 seconds left
      if (exerciseTime === 3) {
        playCountdownSound();
      }

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
    setAudioModeAsync({ playsInSilentMode: true });
  }, []);

  const countdownPlayer = useAudioPlayer(
    require("../assets/sound/countdown.mp3"),
  );

  const playCountdownSound = async () => {
    if (!countdownPlayer?.isLoaded) return;

    try {
      await countdownPlayer.seekTo(0); // rewind
      countdownPlayer.play();
    } catch (e) {
      console.warn("Countdown sound play error", e);
    }
  };

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
          Total: {convertSecondsToMins(session.totalTimeRemaining)}
        </Text>
        <View style={styles.controlsContainer}>
          <Pressable style={styles.roundButton} onPress={handlePause}>
            <Image
              source={
                session.status === WORKOUT_STATUS.INPROGRESS
                  ? require("../assets/icons/pause.png")
                  : require("../assets/icons/play.png")
              }
              style={styles.iconImage}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable style={styles.roundButton} onPress={() => {}}>
            <Image
              source={require("../assets/icons/next.png")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            style={[styles.roundButton, styles.endButton]}
            onPress={() => {}}
          >
            <Image
              source={require("../assets/icons/stop-button.png")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    width: "100%",
  },
  iconImage: {
    width: 28,
    height: 28,
  },
  titleContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    marginTop: 120,
  },
  roundButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  endButton: {
    backgroundColor: "#328f7fd7",
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
