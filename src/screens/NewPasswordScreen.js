import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Logo from "@assets/images/HoleInTheWall.png";
import CustomInput from "@components/CustomInput";
import CustomButton from "@components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const NewPasswordScreen = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSubmitPressed = () => {
    navigation.navigate("Sign In Screen");

    // Implement once accounts can be created through the database

    {
      /*}  const onSubmitPressed = () => {
    if (setNewPassword !== setNewPasswordConfirm) 
    {
      alert("Passwords do not match");
      return;
    }
    else
    {
      navigation.navigate("Sign In Screen");
    }
    
  }; */
    }
  };

  const onSignInPressed = () => {
    navigation.navigate("Sign In Screen");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <Text style={styles.title}>Reset your Password</Text>

        <CustomInput
          placeholder="Verification Code"
          value={verificationCode}
          setValue={setVerificationCode}
        />

        <CustomInput
          placeholder="Enter New Password"
          value={newPassword}
          setValue={setNewPassword}
        />

        <CustomInput
          placeholder="Confirm New Password"
          value={newPasswordConfirm}
          setValue={setNewPasswordConfirm}
        />

        <CustomButton text="Submit" onPress={onSubmitPressed} />

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

  logo: {
    width: "70%",
    maxWidth: 800,
    height: 200,
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

export default NewPasswordScreen;
