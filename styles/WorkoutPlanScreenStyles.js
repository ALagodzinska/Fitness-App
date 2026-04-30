import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 70,
    lineHeight: 46,
    textAlign: "center",
    color: "#E0F2F1",
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 20,
  },
  shuffleButton: {
    position: "absolute",
    top: 90,
    right: 5,
    padding: 5,
    zIndex: 1,
  },
  shuffleIcon: {
    width: 24,
    height: 24,
  },
  mainButtonContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
  },
  listContainer: {
    height: "65%",
  },
});

export default styles;
