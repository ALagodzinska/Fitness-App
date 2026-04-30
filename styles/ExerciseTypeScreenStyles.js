import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    width: "100%",
  },
  titleContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
    textTransform: "uppercase",
    lineHeight: 46,
    textAlign: "center",
    color: "#E0F2F1",
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
    gap: 20,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  mainButtonContainer: {
    alignItems: "center",
    marginTop: 15,
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  countText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    position: "absolute",
    right: -30,
    textAlign: "center",
  },
  durationContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  durationLabel: {
    fontSize: 12,
    color: "#E0F2F1",
    letterSpacing: 1,
    marginBottom: 5,
  },
  durationValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default styles;
