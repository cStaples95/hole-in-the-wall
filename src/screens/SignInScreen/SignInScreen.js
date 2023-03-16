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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    {
      axios
        .post("http://localhost:8000/users/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("Login successful");
            navigation.navigate("Dummy Screen");
            // This will get changed to a more secure method of storage after more research.
            AsyncStorage.setItem("token", response.data.token);
            let token = AsyncStorage.getItem("token");
            console.log("The token is" + token);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert("Invalid username or password");
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
