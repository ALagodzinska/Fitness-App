import { StyleSheet, Text, View } from "react-native";
import StartScreen from "./screens/StartScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExerciseTypeScreen from "./screens/ExerciseTypeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Start Screen" component={StartScreen} />
        <Stack.Screen
          name="ExerciseTypeScreen"
          component={ExerciseTypeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
