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
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      alert("Token saved");
    } catch (e) {
      // saving error
      console.log("Error saving data" + e);
    }
  };

  const onRegisterPressed = () => {
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    } else {
      axios
        .post("http://localhost:8000/users/register", {
          Username: username,
          Password: password,
          Email: email,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            alert("Registration successful");
            storeData("email", email);
          }
        })
        .then(() => {
          axios
            .post("http://localhost:8000/emails/sendemail", {
              Email: [email],
            })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                alert("Email sent");
                console.log("The code is " + response.data);
                let code = response.data;
                storeData("email-code", code);
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
        });
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
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <Text style={styles.title}>Create an Account</Text>

        <CustomInput placeholder="Email" value={email} setValue={setEmail} />

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />

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

export default SignUpScreen;
