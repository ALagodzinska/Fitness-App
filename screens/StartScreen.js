import { View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MainButton from "../components/MainButton";
import { useWorkout } from "../contexts/WorkoutContext";
import Workout from "../models/Workout";
import styles from "../styles/StartScreenStyles";

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
