import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SectionButton from "../components/SectionButton";
import exercisesByType from "../data/exercises";

// Probably needs a state for workout

function ExerciseTypeScreen({ navigation }) {
  function handlePress(exercises) {
    navigation.navigate("ExerciseScreen", { exercises });
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
          <SectionButton
            title={"warm-up"}
            handlePress={() => handlePress(exercisesByType.warmUp)}
          />
          <SectionButton
            title={"cardio"}
            handlePress={() => handlePress(exercisesByType.cardio)}
          />
          <SectionButton
            title={"strength"}
            handlePress={() => handlePress(exercisesByType.strength)}
          />
          <SectionButton
            title={"flexibility"}
            handlePress={() => handlePress(exercisesByType.flexibility)}
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
    paddingTop: 50,
    gap: 20,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});

export default ExerciseTypeScreen;
