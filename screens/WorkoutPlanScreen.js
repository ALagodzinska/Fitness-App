import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
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

  const shuffleExercises = () => {
    const shuffledWorkout = workout.shuffleExercises();
    setWorkout(shuffledWorkout);
  };

  return (
    <LinearGradient
      colors={["#004d40d6", "#004d40bf"]}
      style={styles.rootScreen}
    >
      <View>
        <Text style={styles.title}>WORKOUT PLAN</Text>
      </View>
      <TouchableOpacity onPress={shuffleExercises} style={styles.shuffleButton}>
        <Image
          source={require("../assets/icons/reshuffle.png")}
          style={styles.shuffleIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <DraggableFlatList
        data={workout.exercises}
        onDragEnd={handleDragEnd}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
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
    marginTop: 70,
    lineHeight: 46,
    textAlign: "center",
    color: "#E0F2F1", // soft teal/light color that stands out
    letterSpacing: 2, // spacing between letters
    textShadowColor: "rgba(0,0,0,0.25)", // subtle shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 20,
  },
  shuffleButton: {
    position: "absolute",
    top: 90,
    right: 5,
    padding: 5,
    zIndex: 1,
  },
  shuffleIcon: {
    width: 24,
    height: 24,
  },
};

export default WorkoutPlanScreen;
