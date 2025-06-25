import { StyleSheet, Text, Pressable } from "react-native";

function SectionButton({ title, handlePress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

export default SectionButton;

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
    marginTop: 16, // Use a small gap between buttons
  },
  buttonPressed: {
    backgroundColor: "#00695C",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: "#FAFAFA",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase", // Ensures the title is displayed in lowercase
  },
});
