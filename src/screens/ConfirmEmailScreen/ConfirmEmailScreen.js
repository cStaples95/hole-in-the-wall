import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Logo from "../../../assets/images/HoleInTheWall.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/core";

const ConfirmEmailScreen = () => {
  const [verificationCode, setVerificationCode] = useState("");

  const { height } = useWindowDimensions();
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
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
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

export default ConfirmEmailScreen;
