import React, { createContext, useState, useContext } from "react";

// 1. Create the context object
const WorkoutContext = createContext(null);

// 2. Create a provider component to wrap your app
export function WorkoutProvider({ children }) {
  const [workout, setWorkout] = useState(null);

  // Optional: add helper methods here to manage workout state

  return (
    <WorkoutContext.Provider value={{ workout, setWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
}

// 3. Create a custom hook to use the context easily
export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}
