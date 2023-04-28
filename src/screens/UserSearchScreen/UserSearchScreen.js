import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("userToken", value);
    alert(value + "saved");
  } catch (e) {
    // saving error
    console.log("Error saving data" + e);
  }
};

const UserSearchScreen = () => {
  const [nameList, setNameList] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/users/all").then((response) => {
      console.log(response.data);
      setNameList(response.data);
    });
  }, []);

  const toProfile = (username) => {
    alert("You clicked " + username);
    storeData(username);
    navigation.navigate("Selected Profile Screen");
  };

  return (
    <div className="UserSearchScreen">
      <h1>User Search</h1>
      <input
        type="text"
        placeholder="Type to search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {nameList
        .filter((item) => {
          if (search === "") {
            return "";
          } else if (
            item.Username.toLowerCase().includes(search.toLowerCase())
          ) {
            return item;
          }
        })
        .map((item) => {
          return (
            <div className="nameContainer" key={item.Username}>
              {" "}
              <button onClick={() => toProfile(item.Username)}>
                {item.Username}
              </button>
            </div>
          );
        })}
      <View style={styles.nav}>
        <BottomNavBar />
      </View>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default UserSearchScreen;
