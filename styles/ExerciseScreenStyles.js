import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    width: "100%",
  },
  contentWrapper: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 70,
    color: "#fff",
    textAlign: "center",
  },
  item: {
    fontSize: 18,
    color: "#222",
    backgroundColor: "#E0F2F1",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: 300,
    textAlign: "center",
  },
  buttonContainer: {
    paddingVertical: 10,
    marginBottom: 60,
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default styles;
