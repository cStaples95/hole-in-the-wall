import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "@screens/SignInScreen";
import SignUpScreen from "@screens/SignUpScreen";
import ConfirmEmailScreen from "@screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "@screens/ForgotPasswordScreen";
import NewPasswordScreen from "@screens/NewPasswordScreen";
import ActivityFeed from "@screens/ActivityFeed";
import ProfileScreen from "@screens/ProfileScreen";
import GroupScreen from "@screens/GroupScreen";
import UserSearchScreen from "@screens/UserSearchScreen";
import CreatePostScreen from "@screens/CreatePostScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Sign In Screen" component={SignInScreen} />
        <Stack.Screen name="Sign Up Screen" component={SignUpScreen} />
        <Stack.Screen
          name="Confirm Email Screen"
          component={ConfirmEmailScreen}
        />
        <Stack.Screen
          name="Forgot Password Screen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="New Password Screen"
          component={NewPasswordScreen}
        />
        <Stack.Screen name="ActivityFeed Screen" component={ActivityFeed} />
        <Stack.Screen name="Profile Screen" component={ProfileScreen} />
        <Stack.Screen name="Group Screen" component={GroupScreen} />
        <Stack.Screen name="User Search Screen" component={UserSearchScreen} />
        <Stack.Screen name="Create Post Screen" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
