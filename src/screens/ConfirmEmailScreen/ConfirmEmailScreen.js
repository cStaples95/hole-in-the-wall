import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/core";

const ConfirmEmailScreen = () => {
  const [verificationCode, setVerificationCode] = useState("");

  const navigation = useNavigation();

  const onConfirmPressed = () => {
    {
      /* TODO: validate user */
    }

    navigation.navigate("Sign In Screen");
  };

  const onSignInPressed = () => {
    navigation.navigate("Sign In Screen");
  };

  const onResendVerificationPressed = () => {
    {
      /* TODO: Set up resend verification code to linked email address */
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your Email</Text>

        <CustomInput
          placeholder="Enter Verification Code"
          value={verificationCode}
          setValue={setVerificationCode}
        />

        <CustomButton text="Confirm" onPress={onConfirmPressed} />

        <CustomButton
          text="Resend Verification Code"
          onPress={onResendVerificationPressed}
          type="SECONDARY"
        />

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

export default ConfirmEmailScreen;
