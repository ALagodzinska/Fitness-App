import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function ExerciseTypeScreen({ navigation }) {
  return (
    <LinearGradient colors={["#004D40", "#E3F2FD"]} style={styles.rootScreen}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Exercise Type</Text>
        <Button
          title="Strength"
          onPress={() =>
            navigation.navigate("ExerciseDetails", { type: "Strength" })
          }
        />
        <Button
          title="Cardio"
          onPress={() =>
            navigation.navigate("ExerciseDetails", { type: "Cardio" })
          }
        />
        <Button
          title="Flexibility"
          onPress={() =>
            navigation.navigate("ExerciseDetails", { type: "Flexibility" })
          }
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ExerciseTypeScreen;
