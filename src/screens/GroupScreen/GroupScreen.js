import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GroupScreen = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Group Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default GroupScreen;
