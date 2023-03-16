import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/core";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation();

  const onRegisterPressed = () => {
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    } else {
      navigation.navigate("Confirm Email Screen");
    }
  };

  const onSignInPressed = () => {
    navigation.navigate("Sign In Screen");
  };

  const onTermsPressed = () => {
    {
      /* TODO: Create Terms of Service page if necessary and link in navigation */
    }
  };

  const onPrivacyPressed = () => {
    {
      /* TODO: Create Privacy Policy page if necessary and link in navigation */
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an Account</Text>

        <CustomInput placeholder="Email" value={email} setValue={setEmail} />

        <CustomInput placeholder="Username" value={username} setValue={setUsername} />

        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomInput
          placeholder="Confirm Password"
          value={passwordConfirm}
          setValue={setPasswordConfirm}
          secureTextEntry={true}
        />

        <CustomButton text="Register" onPress={onRegisterPressed} />

        <Text style={styles.text}>
          {" "}
          PLACEHOLDER:{" "}
          <Text style={styles.link} onPress={onTermsPressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <CustomButton
          text="Have an account? Sign in"
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

export default SignUpScreen;
