import { Text, FlatList, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ExerciseItem from "../components/ExerciseItem";
import SectionButton from "../components/SectionButton";
import WorkoutPreview from "../components/WorkoutPreview";
import styles from "../styles/ExerciseScreenStyles";

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

export default ExerciseScreen;
