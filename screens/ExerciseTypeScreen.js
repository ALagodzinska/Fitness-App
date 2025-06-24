import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

function ExerciseTypeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Exercise Type</Text>
      <Button
        title="Cardio"
        onPress={() =>
          navigation.navigate("ExerciseDetails", { type: "Cardio" })
        }
      />
      <Button
        title="Strength"
        onPress={() =>
          navigation.navigate("ExerciseDetails", { type: "Strength" })
        }
      />
      <Button
        title="Flexibility"
        onPress={() =>
          navigation.navigate("ExerciseDetails", { type: "Flexibility" })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ExerciseTypeScreen;
