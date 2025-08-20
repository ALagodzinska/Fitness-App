import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SectionButton from "../components/SectionButton";
import EXERCISE_TYPE from "../constants/exerciseTypes";
import { filterAllExercisesByType } from "../utils/exerciseUtils";
import { useWorkout } from "../contexts/WorkoutContext";
import MainButton from "../components/MainButton";

// Probably needs a state for workout

function ExerciseTypeScreen({ navigation }) {
  function navigateToExerciseType(typeName) {
    const exercisesByType = filterAllExercisesByType(typeName);
    navigation.navigate("ExerciseScreen", {
      exercisesByType,
      typeName,
    });
  }

  function navigateToWorkoutPlan() {
    navigation.navigate("WorkoutPlan");
  }

  const { workout } = useWorkout();
  const workoutDuration = workout.getDurationAsString();

  return (
    <LinearGradient colors={["#004D40", "#E3F2FD"]} style={styles.rootScreen}>
      <ImageBackground
        source={require("../assets/images/equipment.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Exercise Type</Text>
        </View>
        <View style={styles.buttonContainer}>
          {Object.keys(EXERCISE_TYPE).map((key) => {
            const typeObj = EXERCISE_TYPE[key];
            const count = workout.getExerciseByTypeCount(typeObj.name);
            return (
              <View key={key} style={styles.buttonRow}>
                <SectionButton
                  title={typeObj.name}
                  handlePress={() => navigateToExerciseType(typeObj.name)}
                />
                {count > 0 && <Text style={styles.countText}>X{count}</Text>}
              </View>
            );
          })}
        </View>
        {workoutDuration !== "" && (
          <View style={styles.durationContainer}>
            <Text style={styles.durationLabel}>DURATION</Text>
            <Text style={styles.durationValue}>{workoutDuration}</Text>
          </View>
        )}

        <View style={styles.mainButtonContainer}>
          <MainButton
            title="VIEW WORKOUT"
            handlePress={() => navigateToWorkoutPlan()}
            disabled={workout.exercises.length === 0}
          />
        </View>
      </ImageBackground>
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
    color: "#E0F2F1", // soft teal/light color that stands out
    letterSpacing: 2, // spacing between letters
    textShadowColor: "rgba(0,0,0,0.25)", // subtle shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
    gap: 20,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  mainButtonContainer: {
    alignItems: "center",
    marginTop: 15, // Add space from bottom
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  countText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    position: "absolute",
    right: -30,
    textAlign: "center",
  },
  durationContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  durationLabel: {
    fontSize: 12,
    color: "#E0F2F1",
    letterSpacing: 1,
    marginBottom: 5,
  },
  durationValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default ExerciseTypeScreen;
