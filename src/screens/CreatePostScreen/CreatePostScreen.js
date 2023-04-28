import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      alert(key + "retrieved");
      return value;
    }
  } catch (e) {
    // error reading value
    console.log("Error reading data" + e);
  }
};

const CreatePostScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const onPressedCreatePost = () => {
    console.log(
      `Creating post with title "${title}", description "${description}", location "${location}",`
    );

    let token = new Promise((resolve, reject) => {
      resolve(getData("token"));
    });
    token.then((value) => {
      axios
        .post(
          "http://localhost:8000/posts/create",
          {
            Title: title,
            Description: description,
            Location: location,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${value}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={{
          borderWidth: 1,
          backgroundColor: "white",
          width: "60%",
          borderColor: "gray",
          padding: 10,
          marginBottom: 10,
        }}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={{
          borderWidth: 1,
          backgroundColor: "white",
          width: "60%",
          borderColor: "gray",
          padding: 10,
          marginBottom: 10,
        }}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={{
          borderWidth: 1,
          backgroundColor: "white",
          width: "60%",
          borderColor: "gray",
          padding: 10,
          marginBottom: 10,
        }}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Create Post" onPress={onPressedCreatePost} />

      <BottomNavBar />
    </View>
  );
};

export default CreatePostScreen;
