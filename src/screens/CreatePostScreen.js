import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import BottomNavBar from "@components/BottomNavBar";
import * as ImagePicker from "expo-image-picker";
import { createPost } from "@api";

const CreatePostScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputLocation, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const onPressedCreatePost = async () => {
    console.log(
      `Creating post with title "${title}", description "${description}", location "${location}"`
    );

    createPost({ title, description, inputLocation, pictureFile: image });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
        value={inputLocation}
        onChangeText={setLocation}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <Button title="Upload Image" onPress={pickImage} />
        <View style={{ width: 16 }} /> {/* add spacing */}
        <Button title="Create Post" onPress={onPressedCreatePost} />
      </View>

      <BottomNavBar />
    </View>
  );
};

export default CreatePostScreen;
