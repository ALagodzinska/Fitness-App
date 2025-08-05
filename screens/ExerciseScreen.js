import { Text, StyleSheet, FlatList, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ExerciseItem from "../components/ExerciseItem";
import SectionButton from "../components/SectionButton";
import Workout from "../models/Workout";
import WorkoutPreview from "../components/WorkoutPreview";

// Probably needs a state for workout

function ExerciseScreen({ navigation, route }) {
  const { exercisesByType, typeName } = route.params;

  function handleContinuePress() {
    navigation.navigate("ExerciseTypeScreen");
  }

  return (
    <LinearGradient colors={["#004D40", "#E3F2FD"]} style={styles.rootScreen}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{typeName.toUpperCase()} EXERCISES</Text>
        <WorkoutPreview type={typeName} />
        <View style={styles.listContainer}>
          <FlatList
            data={exercisesByType}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ExerciseItem item={item} />}
          />
        </View>
        <View style={styles.buttonContainer}>
          <SectionButton title={"CONTINUE"} handlePress={handleContinuePress} />
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
  contentWrapper: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 70,
    color: "#fff",
    textAlign: "center",
  },
  item: {
    fontSize: 18,
    color: "#222",
    backgroundColor: "#E0F2F1",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: 300,
    textAlign: "center",
  },
  buttonContainer: {
    paddingVertical: 10,
    marginBottom: 60,
    alignItems: "center",
    backgroundColor: "transparent", // match the LinearGradient background
  },
});

export default ExerciseScreen;
