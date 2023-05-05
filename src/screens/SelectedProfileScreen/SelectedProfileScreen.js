import React, { useState } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeFeedScreen from '../HomeFeedScreen/HomeFeedScreen';

const Tag = ({ tag }) => {
  return (
    <TagBox>
      <Text size="10px" style={{ paddingHorizontal: 14 }}>
        {tag}
      </Text>
    </TagBox>
  );
};

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

const SelectedProfileScreen = () => {
  const [profile_name, set_profile_name] = useState("Default");
  const [profile_bio, set_profile_bio] = useState("Default");
  const [profile_location, set_profile_location] = useState("Default");

  let token = new Promise((resolve, reject) => {
    resolve(getData("userToken"));
  });
  token.then((value) => {
    axios
      .get("http://localhost:8000/profiles/get/users/" + value, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
      })
      .then((response) => {
        console.log(response);
        set_profile_name(response.data.Username);
        set_profile_bio(response.data.Bio);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.profile}>
          <View style={styles.avatar} />
          <View style={styles.details}>
            <Text style={styles.name}>{profile_name}</Text>
            <Text style={styles.bio}>
              {profile_bio}
            </Text>
          </View>
        </View>
        <View style={styles.feed}>
          <Text style={styles.feedTitle}>My Posts</Text>
        </View>
      </View>
      <BottomNavBar />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    padding: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.2) / 2,
    backgroundColor: '#ddd',
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  bio: {
    fontSize: 16,
    marginTop: 8,
  },
  feed: {
    marginTop: 32,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default SelectedProfileScreen;
