import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MainButton from "../components/MainButton";

function StartScreen({ navigation }) {
  function handlePress() {
    navigation.navigate("ExerciseTypeScreen");
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
          <MainButton handlePress={handlePress} />
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
  },
  rootScreen: {
    flex: 1,
    width: "100%",
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
