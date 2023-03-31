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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("userToken", value);
    alert("Token saved");
  } catch (e) {
    // saving error
    console.log("Error saving data" + e);
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("userToken");
    if (value !== null) {
      alert("Token retrieved");
      console.log("The token is " + value);
      return value;
    }
  } catch (e) {
    // error reading value
    console.log("Error reading data" + e);
  }
};

const ConfirmEmailScreen = () => {
  const [verificationCode, setVerificationCode] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onConfirmPressed = () => {
    {
      /* TODO: validate user */
      /* axios
        .post("http://localhost:8000/emails/sendemail", {
        email: "akewlhipzter@gmail.com"
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("Email sent");
            // This will get chansged to a more secure method of storage after more research.
            console.log("The token is " + response.data);
            let code = response.data;
            storeData(code);
          }
           })*/
        //.then(() => {
          try {
          const code = getData();
          if (setVerificationCode === code) {
            alert("Email confirmed");
            navigation.navigate("Sign In Screen");
          }
          }
        catch(error) {
          if (error.response.status === 401) {
            alert("Invalid email");}
        };
    }
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
