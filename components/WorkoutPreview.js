import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useWorkout } from "../contexts/WorkoutContext";

function WorkoutPreview({ type }) {
  const { workout } = useWorkout();
  console.log(workout);
  const grouped = workout.getGroupedStatsByType(type);
  console.log("hERE", grouped);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {grouped.map(({ name, count }) => (
        <View key={name} style={styles.exerciseItem}>
          <Text style={styles.countText}>{count}x</Text>
          <View style={styles.circle}>
            <Text style={styles.exerciseName}>
              {name.length > 10 ? name.slice(0, 10) + ".." : name}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexGrow: 0,
  },
  contentContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 5,
  },
  exerciseItem: {
    alignItems: "center",
  },
  countText: {
    color: "#fff",
    fontWeight: "bold",
  },
  circle: {
    margin: 5,
    marginTop: 0,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#26A69A",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseName: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    flexShrink: 1,
    numberOfLines: 1,
  },
});

export default WorkoutPreview;
