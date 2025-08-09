import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import { useWorkout } from "../contexts/WorkoutContext";
import ExerciseRow from "../components/ExerciseRow";
import DraggableFlatList from "react-native-draggable-flatlist";

function WorkoutPlanScreen({ navigation }) {
  const { workout, setWorkout } = useWorkout();

  const handleDragEnd = ({ data }) => {
    const newWorkout = workout.reorderExercises(data);
    setWorkout(newWorkout);
  };

  const renderItem = ({ item, drag, isActive }) => (
    <ExerciseRow exercise={item} onLongPress={drag} isActive={isActive} />
  );

  return (
    <LinearGradient colors={["#004D40", "#E3F2FD"]} style={styles.rootScreen}>
      <View>
        <Text style={styles.title}>WORKOUT PLAN</Text>
      </View>
      <DraggableFlatList
        data={workout.exercises}
        onDragEnd={handleDragEnd}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        activationDistance={10}
      />
    </LinearGradient>
  );
}

const styles = {
  rootScreen: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 60,
    lineHeight: 46,
    textAlign: "center",
    color: "#E0F2F1", // soft teal/light color that stands out
    letterSpacing: 2, // spacing between letters
    textShadowColor: "rgba(0,0,0,0.25)", // subtle shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
};

export default WorkoutPlanScreen;
