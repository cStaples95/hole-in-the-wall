import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigation";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { ActivityFeed } from "./src/screens/Feed";

export default function App() {
  return (
    <ActivityFeed />
    //<ProfileScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
