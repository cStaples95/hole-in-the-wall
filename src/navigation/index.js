import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import HomeFeedScreen from "../screens/HomeFeedScreen/HomeFeedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UserSearchScreen from "../screens/UserSearchScreen";
import CreatePostScreen from "../screens/CreatePostScreen/CreatePostScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Sign In Screen" component={SignInScreen} />
        <Stack.Screen name="Sign Up Screen" component={SignUpScreen} />
        <Stack.Screen name="Confirm Email Screen" component={ConfirmEmailScreen} />
        <Stack.Screen name="Forgot Password Screen" component={ForgotPasswordScreen} />
        <Stack.Screen name="New Password Screen" component={NewPasswordScreen} />
        <Stack.Screen name="Home Feed Screen" component={HomeFeedScreen}/>
        <Stack.Screen name="Profile Screen" component={ProfileScreen} />
        <Stack.Screen name="User Search Screen" component={UserSearchScreen} />
        <Stack.Screen name="Create Post Screen" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
