import { View, Text } from "react-native";
import { useWorkout } from "../contexts/WorkoutContext";

function WorkoutPreview({ type }) {
  const { workout } = useWorkout();
  console.log(workout);
  const grouped = workout.getGroupedStatsByType(type);
  console.log("hERE", grouped);

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {grouped.map(({ exercise, count }) => (
        <View
          key={exercise.name}
          style={{
            margin: 5,
            padding: 10,
            borderRadius: 50,
            backgroundColor: "#26A69A",
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>{count}x</Text>
          <Text style={{ color: "#fff", fontSize: 10 }}>{exercise.name}</Text>
        </View>
      ))}
    </View>
  );
}

export default WorkoutPreview;
