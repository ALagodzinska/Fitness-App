import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

function MainButton({ title, handlePress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

export default MainButton;

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 75,
    backgroundColor: "#03675dff",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#004D40",
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center", // horizontal center
    justifyContent: "center",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: "#00695C",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: "#FAFAFA",
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase", // Ensures the title is displayed in uppercase
    textAlign: "center", // Centers the text within the button
  },
});
