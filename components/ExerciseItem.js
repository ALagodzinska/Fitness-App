import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { LinearGradient } from "expo-linear-gradient";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

// Probably needs a state for workout

function ExerciseItem({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [exerciseTime, setExerciseTime] = useState(30); // Default time
  const [exerciseCount, setExerciseCount] = useState(0);

  const swipeableReference = useRef(null);

  const expand = () => {
    setIsExpanded((previous) => !previous);
  };

  const renderDeleteGradient = () => {
    if (exerciseCount > 0)
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
        ></LinearGradient>
      );
  };

  function addExercise() {
    setExerciseCount((prevCount) => prevCount + 1);
    setIsExpanded(false);
    // Logic to add exercise with selected time
    console.log(`Added ${item.name} for ${exerciseTime} seconds`);
  }

  const deleteExercise = () => {
    if (exerciseCount > 0) {
      setExerciseCount((prevCount) => prevCount - 1);
      console.log(`Deleted one instance of ${item.name}`);
    }
    if (swipeableReference.current) {
      swipeableReference.current.close();
    }
  };

  const times = [30, 60, 120, 200, 300];

  return (
    <View style={styles.swipeableWrapper}>
      <ReanimatedSwipeable
        renderLeftActions={renderDeleteGradient}
        onSwipeableOpen={deleteExercise}
        ref={swipeableReference}
        overshootLeft={false}
        friction={10}
        leftThreshold={20}
      >
        <TouchableOpacity onPress={expand}>
          <View
            style={
              isExpanded
                ? [styles.itemRow, styles.expanded]
                : [styles.itemRow, styles.closed]
            }
          >
            <Image
              source={require(`../assets/images/type-icons/cardio.png`)}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <Text style={styles.itemText}>{item.name}</Text>
            {exerciseCount > 0 && (
              <Text
                style={styles.exerciseCountText}
              >{`X${exerciseCount}`}</Text>
            )}
          </View>
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.timesRow}>
            {times.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeButton,
                  exerciseTime === time && { backgroundColor: "#2C3539" }, // grey when selected
                ]}
                onPress={() => setExerciseTime(time)}
              >
                <Text style={styles.timeButtonText}>{time}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.verticalDivider} />
            <TouchableOpacity style={styles.plusButton} onPress={addExercise}>
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </ReanimatedSwipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  swipeableWrapper: {},
  gradientBackground: {
    width: 30,
    marginRight: 0,
    alignSelf: "left",
    height: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  expanded: { borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  closed: { borderRadius: 8 },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2F1",
    padding: 10,
    marginVertical: 5,
    justifyContent: "flex-start",
    marginBottom: 0,
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  itemText: {
    fontSize: 18,
    color: "#222",
    flex: 1,
  },
  timesRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#BDD6D1", // dark grey background
    marginBottom: 0, // space from the bottom
    paddingVertical: 10,
    width: "90%",
    alignSelf: "center",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  timeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#26A69A",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    elevation: 2,
  },
  timeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  plusButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#39791fff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 2,
    elevation: 2,
  },
  plusButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 24,
  },
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#888",
    alignSelf: "stretch",
  },
  exerciseCountText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "#8D6E63",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: "hidden",
  },
});

export default ExerciseItem;
