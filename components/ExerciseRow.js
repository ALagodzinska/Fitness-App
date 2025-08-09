import { Pressable, Text, Image } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import DeleteGradient from "./DeleteGradient";
import { useRef } from "react";
import { useWorkout } from "../contexts/WorkoutContext";
import EXERCISE_TYPE from "../constants/exerciseTypes";

function ExerciseRow({ exercise, onLongPress, isActive }) {
  const { workout, setWorkout } = useWorkout();
  const swipeableReference = useRef(null);

  const getTypeColor = (type) => {
    const typeObj = Object.values(EXERCISE_TYPE).find((et) => et.name === type);
    return typeObj ? typeObj.color : "#E0F2F1";
  };

  const renderDeleteGradient = () => {
    return <DeleteGradient style={styles.gradientBackground} />;
  };

  const deleteExercise = () => {
    const updatedWorkout = workout.removeExerciseById(exercise.id);
    console.log(`Deleted one instance of ${exercise.name}`);
    setWorkout(updatedWorkout);
  };

  return (
    <ReanimatedSwipeable
      renderLeftActions={renderDeleteGradient}
      onSwipeableOpen={deleteExercise}
      ref={swipeableReference}
      overshootLeft={false}
      friction={10}
      leftThreshold={20}
    >
      <Pressable
        onLongPress={onLongPress}
        style={[
          styles.exerciseRow,
          { backgroundColor: getTypeColor(exercise.type) },
          isActive && styles.activeRow,
        ]}
      >
        <Image
          source={require(`../assets/images/type-icons/cardio.png`)}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <Text style={styles.exerciseText}>{exercise.name}</Text>
        <Text style={styles.duration}>{exercise.getDurationAsString()}</Text>
      </Pressable>
    </ReanimatedSwipeable>
  );
}

const styles = {
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  exerciseText: {
    fontSize: 16,
    color: "#181818ff",
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  duration: {
    marginLeft: "auto",
    color: "#252525ff",
  },
};

export default ExerciseRow;
