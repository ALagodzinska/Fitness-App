import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useWorkout } from "../contexts/WorkoutContext";
import ExerciseRow from "../components/ExerciseRow";
import DraggableFlatList from "react-native-draggable-flatlist";
import MainButton from "../components/MainButton";
import { useEffect } from "react";
import styles from "../styles/WorkoutPlanScreenStyles";

function WorkoutPlanScreen({ navigation }) {
  const { workout, setWorkout } = useWorkout();

  useEffect(() => {
    if (!workout) {
      navigation.replace("StartScreen");
    }
  }, [navigation, workout]);

  if (!workout) {
    return null;
  }

  const handleDragEnd = ({ data }) => {
    const newWorkout = workout.reorderExercises(data);
    setWorkout(newWorkout);
  };

  function navigateToSessionScreen() {
    navigation.navigate("SessionScreen");
  }

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
      <View style={styles.listContainer}>
        <DraggableFlatList
          data={workout.exercises}
          onDragEnd={handleDragEnd}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.mainButtonContainer}>
        <MainButton
          title="Start"
          handlePress={() => navigateToSessionScreen()}
          disabled={workout.exercises.length === 0}
        />
      </View>
    </LinearGradient>
  );
}

export default WorkoutPlanScreen;
