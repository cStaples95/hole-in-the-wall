import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";

import navbar from "../components/navbar";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GroupScreen from "../screens/GroupScreen";

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
        <Stack.Screen name="Home Screen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Navbar = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/profile' exact component={ProfileScreen} />
        <Route path='/gorups' exact component={GroupScreen} />
      </Switch>
      <navbar />
    </Router>
  )
}

export default Navigation;
