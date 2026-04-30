import StartScreen from "./screens/StartScreen";
import ExerciseScreen from "./screens/ExerciseScreen";
import ExerciseTypeScreen from "./screens/ExerciseTypeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WorkoutProvider } from "./contexts/WorkoutContext";
import WorkoutPlanScreen from "./screens/WorkoutPlanScreen";
import SessionScreen from "./screens/SessionScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WorkoutProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen
              name="ExerciseTypeScreen"
              component={ExerciseTypeScreen}
            />
            <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
            <Stack.Screen name="WorkoutPlan" component={WorkoutPlanScreen} />
            <Stack.Screen
              name="SessionScreen"
              component={SessionScreen}
              options={{ gestureEnabled: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </WorkoutProvider>
    </GestureHandlerRootView>
  );
}
