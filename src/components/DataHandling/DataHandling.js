import React from "react";
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

export default { storeData, getData };
