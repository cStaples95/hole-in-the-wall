import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.TextInput}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "70%",
    borderColor: "#e8e8e8",
    borderWidth: 3,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginVertical: 10,
  },

  input: {},
});

export default CustomInput;
