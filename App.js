import StartScreen from "./screens/StartScreen";
import ExerciseScreen from "./screens/ExerciseScreen";
import ExerciseTypeScreen from "./screens/ExerciseTypeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
