import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useWorkout } from "../contexts/WorkoutContext";
import { useEffect, useState, useRef } from "react";
import { WORKOUT_STATUS } from "../constants/workoutStatus";
import { LinearGradient } from "expo-linear-gradient";
import ExerciseTime from "../components/ExerciseTime";
import { convertSecondsToMins } from "../utils/exerciseUtils";
import { useAudioPlayer } from "expo-audio";
import { useNavigation } from "@react-navigation/native";
import * as Sound from "../utils/soundUtils";

function SessionScreen() {
  const { workout, setWorkout } = useWorkout();
  const navigation = useNavigation();
  const intervalRef = useRef(null);
  const countdownPlayer = useAudioPlayer(
    require("../assets/sound/countdown.mp3"),
  );

  const [session, setSession] = useState(() => ({
    activeExerciseIndex: 0,
    timeRemainingInExercise: workout?.exercises?.[0]?.duration ?? 0,
    totalTimeRemaining: workout?.getTotalWorkoutDuration() ?? 0,
    status: WORKOUT_STATUS.IN_PROGRESS,
  }));

  function handlePause() {
    setSession((prev) => ({
      ...prev,
      status:
        prev.status === WORKOUT_STATUS.IN_PROGRESS
          ? WORKOUT_STATUS.PAUSED
          : WORKOUT_STATUS.IN_PROGRESS,
    }));
  }

  function handleNext() {
    if (!workout?.exercises?.length) return;

    setSession((prev) => {
      const nextIndex = prev.activeExerciseIndex + 1;

      if (nextIndex < workout.exercises.length) {
        return {
          ...prev,
          activeExerciseIndex: nextIndex,
          totalTimeRemaining:
            prev.totalTimeRemaining - prev.timeRemainingInExercise,
          timeRemainingInExercise: workout.exercises[nextIndex].duration,
        };
      }

      return {
        ...prev,
        status: WORKOUT_STATUS.COMPLETED,
        totalTimeRemaining: 0,
        timeRemainingInExercise: 0,
      };
    });
  }

  function handleEnd() {
    setSession((prev) => ({
      ...prev,
      status: WORKOUT_STATUS.COMPLETED,
      timeRemainingInExercise: 0,
      totalTimeRemaining: 0,
    }));
  }

  function updateSession() {
    if (!workout?.exercises?.length) return;

    setSession((prevSession) => {
      let exerciseTime = prevSession.timeRemainingInExercise - 1;
      let totalTimeLeft = prevSession.totalTimeRemaining - 1;
      let activeIndex = prevSession.activeExerciseIndex;

      // play beep when there are 3 seconds left
      if (exerciseTime === 3) {
        Sound.playCountdown();
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
    Sound.initSound();
  }, []);

  useEffect(() => {
    if (!workout?.exercises?.length) {
      navigation.replace("StartScreen");
    }
  }, [navigation, workout]);

  useEffect(() => {
    if (session.status !== WORKOUT_STATUS.COMPLETED) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    Sound.detachPlayers();
    setWorkout(null);
    navigation.reset({
      index: 0,
      routes: [{ name: "StartScreen" }],
    });
  }, [navigation, session.status, setWorkout]);

  useEffect(() => {
    Sound.setCountdownPlayer(countdownPlayer);

    return () => {
      Sound.detachPlayers();
    };
  }, [countdownPlayer]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (session.status !== WORKOUT_STATUS.IN_PROGRESS) return;

    intervalRef.current = setInterval(() => {
      if (session.status === WORKOUT_STATUS.IN_PROGRESS) {
        updateSession();
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [session.status]);

  const activeExercise = workout?.exercises?.[session.activeExerciseIndex];

  if (!workout?.exercises?.length || !activeExercise) {
    return null; // CHANGE LATER TO DIFFERENT SCREEN
  }

  return (
    <LinearGradient colors={["#004D40", "#E3F2FD"]} style={styles.rootScreen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>WORKOUT SESSION</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.exerciseName}>{activeExercise.name}</Text>
        <Text style={styles.timeText}>{session.timeRemainingInExercise}s</Text>
        <ExerciseTime
          timeRemaining={session.timeRemainingInExercise}
          duration={activeExercise.duration}
        />
        <Text style={styles.totalTimeText}>
          Total: {convertSecondsToMins(session.totalTimeRemaining)}
        </Text>
        <View style={styles.controlsContainer}>
          <Pressable style={styles.roundButton} onPress={handlePause}>
            <Image
              source={
                session.status === WORKOUT_STATUS.IN_PROGRESS
                  ? require("../assets/icons/pause.png")
                  : require("../assets/icons/play.png")
              }
              style={styles.iconImage}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable style={styles.roundButton} onPress={handleNext}>
            <Image
              source={require("../assets/icons/next.png")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            style={[styles.roundButton, styles.endButton]}
            onPress={handleEnd}
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
