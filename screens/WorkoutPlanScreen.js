import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";

function WorkoutPlanScreen({ navigation }) {
  return (
    <LinearGradient colors={["#004D40", "#E3F2FD"]} style={styles.rootScreen}>
      <View>
        <Text>List of all exercises</Text>
      </View>
    </LinearGradient>
  );
}

const styles = {
  rootScreen: {
    flex: 1,
    width: "100%",
  },
};

export default WorkoutPlanScreen;
