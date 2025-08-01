import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SectionButton from "../components/SectionButton";
import EXERCISE_TYPE from "../constants/exerciseTypes";
import { filterAllExercisesByType } from "../utils/exerciseUtils";
import { useWorkout } from "../contexts/WorkoutContext";

// Probably needs a state for workout

function ExerciseTypeScreen({ navigation }) {
  function handlePress(typeName) {
    const exercisesByType = filterAllExercisesByType(typeName);
    navigation.navigate("ExerciseScreen", {
      exercisesByType,
      typeName,
    });
  }

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
            const typeName = EXERCISE_TYPE[key];
            return (
              <SectionButton
                key={key}
                title={typeName}
                handlePress={() => handlePress(typeName)}
              />
            );
          })}
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
    paddingTop: 50,
    gap: 20,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});

export default ExerciseTypeScreen;
