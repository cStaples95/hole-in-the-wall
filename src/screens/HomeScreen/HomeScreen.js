import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Home Screen</Text>

        <BottomNavBar/>
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

export default HomeScreen;
