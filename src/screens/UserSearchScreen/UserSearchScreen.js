import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";

const UserSearchScreen = () => {
  const [userSearch, setUserSearch] = useState("");

  const onPressedUserSearch = () => {
    // Implement search logic using userSearch
    Alert.alert(`Searching for: ${userSearch}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={userSearch}
          onChangeText={setUserSearch}
        />
        <Button title="Search" onPress={onPressedUserSearch} />
      </View>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
});

export default UserSearchScreen;
