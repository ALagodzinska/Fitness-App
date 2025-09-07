import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated, Image } from "react-native";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function ExerciseTime({ timeRemaining, duration }) {
  const progress = (duration - timeRemaining) / duration;

  const size = 180;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animated progress
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (timeRemaining === duration) {
      // reset progress immediately when a new countdown starts
      animatedProgress.setValue(0);
    } else if (timeRemaining > 0) {
      // animate while running
      Animated.timing(animatedProgress, {
        toValue: (duration - timeRemaining) / duration,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [timeRemaining]);

  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0], // decreases as progress increases
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          stroke="rgba(255,255,255,0.3)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          stroke="#4CAF50"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
      {/*TODO IMAGE*/}
      <Image
        source={require(`../assets/images/type-icons/cardio.png`)}
        style={styles.centerImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  centerImage: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    width: 170,
    height: 170,
    marginRight: 10,
    borderRadius: 170,
    backgroundColor: "#fff",
  },
});

export default ExerciseTime;
