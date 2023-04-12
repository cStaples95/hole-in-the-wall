import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  // ********** DELETE AFTER TESTING **********
  const onProfileScreenPressed = () => {
    navigation.navigate("Profile Screen");
  };

  const onReturnToSignInScreenPressed = () => {
    navigation.navigate("Sign In Screen");
  };

  const onUserSearchScreenPressed = () => {
    navigation.navigate("User Search Screen");
  };
  // ********** DELETE AFTER TESTING **********

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Home Screen</Text>

      <CustomButton
        text="PLACEHOLDER: Profile Screen"
        onPress={onProfileScreenPressed}
      />

      <CustomButton
        text="PLACEHOLDER: Return to Sign In Screen"
        onPress={onReturnToSignInScreenPressed}
      />

      <CustomButton
        text="PLACEHOLDER: User Search Screen"
        onPress={onUserSearchScreenPressed}
        />
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
