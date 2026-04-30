import { View, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MainButton from "../components/MainButton";
import { useWorkout } from "../contexts/WorkoutContext";
import Workout from "../models/Workout";

function StartScreen({ navigation }) {
  const { workout, setWorkout } = useWorkout();

  function handlePress() {
    if (!workout) {
      const newWorkout = new Workout();
      setWorkout(newWorkout);
    }

    navigation.reset({
      index: 0,
      routes: [{ name: "ExerciseTypeScreen" }],
    });
  }

  return (
    <LinearGradient colors={["#004D40", "#E3F2FD"]} style={styles.rootScreen}>
      <ImageBackground
        source={require("../assets/images/background-main-screen.avif")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.container}>
          <MainButton handlePress={handlePress} title={"START WORKOUT"} />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 500,
  },
  rootScreen: {
    flex: 1,
    width: "100%",
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
