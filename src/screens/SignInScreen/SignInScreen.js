import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Logo from "../../../assets/images/HoleInTheWall.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      alert(value + "saved");
    } catch (e) {
      // saving error
      console.log("Error saving data" + e);
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        alert(key + "retrieved");
        console.log("The value is " + value);
        return value;
      }
    } catch (e) {
      // error reading value
      console.log("Error reading data" + e);
    }
  };

  const onSignInPressed = () => {
    {
      const form_data = new FormData();
      form_data.append("username", username);
      form_data.append("password", password);

      axios
        .post("http://localhost:8000/users/login", form_data)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("Login successful");
            navigation.navigate("Home Feed Screen");
            // This will get chansged to a more secure method of storage after more research.
            console.log("The token is " + response.data.access_token);
            storeData("token", response.data.access_token);
          }
        })
        .then(() => {
          console.log("The token is " + getData("token"));
          return 1;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert("Invalid username or password");
            return 0;
          }
        });
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("Forgot Password Screen");
  };

  const onCreateAccountPressed = () => {
    navigation.navigate("Sign Up Screen");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

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

        <CustomButton text="Sign In" onPress={onSignInPressed} />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <CustomButton
          text="Create account"
          onPress={onCreateAccountPressed}
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
});

export default SignInScreen;
