import { View, Text, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SectionButton from "../components/SectionButton";
import EXERCISE_TYPE from "../constants/exerciseTypes";
import { filterAllExercisesByType } from "../utils/exerciseUtils";
import { useWorkout } from "../contexts/WorkoutContext";
import MainButton from "../components/MainButton";
import { useEffect } from "react";
import styles from "../styles/ExerciseTypeScreenStyles";

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

  useEffect(() => {
    if (!workout) {
      navigation.replace("StartScreen");
    }
  }, [navigation, workout]);

  if (!workout) {
    return null;
  }

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

export default ExerciseTypeScreen;
