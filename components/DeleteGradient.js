import { LinearGradient } from "expo-linear-gradient";

function DeleteGradient() {
  return (
    <LinearGradient
      colors={[
        "rgba(174, 18, 18, 0.91)",
        "rgba(175, 37, 37, 0.53)",
        "rgba(197, 27, 27, 0.18)",
        "rgba(197, 27, 27, 0.04)",
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientBackground}
    />
  );
}

const styles = {
  gradientBackground: {
    width: 30,
    marginRight: 0,
    alignSelf: "left",
    height: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default DeleteGradient;
