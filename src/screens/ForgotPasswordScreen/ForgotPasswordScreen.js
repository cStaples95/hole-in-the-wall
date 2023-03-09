import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from '@react-navigation/core';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const onSendPressed = () => {
    navigation.navigate("New Password Screen");
  };

  const onSignInPressed = () => {
    navigation.navigate("Sign In Screen");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your Password</Text>

        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />

        <CustomButton text="Send Verification Code" onPress={onSendPressed} />

        <CustomButton
          text="Back to Sign In"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051c60",
    margin: 10,
  },

  text: {
    color: "gray",
    marginVertical: 10,
  },

  link: {
    color: "#fdb075",
  },
});

export default ForgotPasswordScreen;