import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomNavBar = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.bottomNavBarContainer}>
      <TouchableOpacity
        style={styles.navBarItem}
        onPress={() => navigateToScreen("ActivityFeed Screen")}
      >
        <Ionicons name="home" size={24} color="black" />
        <Text style={styles.navBarText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navBarItem}
        onPress={() => navigateToScreen("User Search Screen")}
      >
        <Ionicons name="search" size={24} color="black" />
        <Text style={styles.navBarText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navBarItem}
        onPress={() => navigateToScreen("Create Post Screen")}
      >
        <Ionicons name="add-circle-outline" size={24} color="black" />
        <Text style={styles.navBarText}>Create Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navBarItem}
        onPress={() => navigateToScreen("Profile Screen")}
      >
        <Ionicons name="person" size={24} color="black" />
        <Text style={styles.navBarText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  navBarItem: {
    alignItems: "center",
  },
  navBarText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomNavBar;
