import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({ onPress, text, type = "PRIMARY" }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "30%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: "cornflowerblue",
  },

  container_SECONDARY: {
    borderColor: "cornflowerblue",
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: "white",
  },

  text_SECONDARY: {
    color: "cornflowerblue",
  },

  text_TERTIARY: {
    color: "grey",
  },
});

export default CustomButton;
