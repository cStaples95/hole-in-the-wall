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
      try {
        const code = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(getData("email-code"));
          }, 1000);
        });

        code.then((value) => {
          console.log("The code is " + value);
          if (value === verificationCode) {
            alert("Email verified");
            navigation.navigate("Sign In Screen");
          } else {
            alert("Invalid code");
          }
        });
      } catch (error) {
        console.log("Error: " + error);
      }
    }
  };

  const onSignInPressed = () => {
    navigation.navigate("Sign In Screen");
  };

  const onResendVerificationPressed = () => {
    {
      const email = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(getData("email"));
        }, 1000);
      });

      axios
        .post("http://localhost:8000/emails/sendemail", {
          Email: [email],
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("Email sent");
            // This will get chansged to a more secure method of storage after more research.
            console.log("The code is " + response.data);
            let code = response.data;
            storeData(code);
            navigation.navigate("Confirm Email Screen");
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            alert("Username already exists");
          } else {
            console.log(error);
          }
        });
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
