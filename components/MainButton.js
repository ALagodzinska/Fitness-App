import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

function MainButton({ handlePress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>START WORKOUT</Text>
    </Pressable>
  );
}

export default MainButton;

const styles = StyleSheet.create({
  button: {
    width: 250,
    paddingVertical: 20,
    backgroundColor: "#00897B",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#004D40",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 400,
  },
  buttonPressed: {
    backgroundColor: "#00695C",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: "#FAFAFA",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
