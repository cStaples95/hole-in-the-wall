import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserSearchScreen = () => {

  return (
    <View style={styles.root}>
      <Text style={styles.text}>User Search Screen</Text>
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
export default UserSearchScreen;
