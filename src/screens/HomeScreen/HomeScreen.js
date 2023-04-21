import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../../navigation";
import GroupScreen from "../GroupScreen";
import ProfileScreen from "../ProfileScreen";

function HomeScreen() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/home" component={HomeScreen} />
          <Route path="/groups" component={GroupScreen} />
          <Route path="/profile" component={ProfileScreen} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
