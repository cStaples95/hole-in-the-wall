import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BottomNavBar from "@components/BottomNavBar";
import axios from "axios";
import ProfileScreen from "./ProfileScreen";

const UserSearchScreen = () => {
  const [userSearch, setUserSearch] = useState("");

  const [allProfiles, setAllProfiles] = useState(null);
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const getProfiles = async () => {
      const response = await axios.get("http://localhost:8000/profiles/all");
      const { data } = response;
      setAllProfiles(data);
    };

    getProfiles();
  }, []);

  useEffect(() => {
    if (allProfiles) {
      const filtered = allProfiles.filter((profile) => {
        return profile.Username.toLowerCase().includes(
          userSearch.toLowerCase()
        );
      });
      setFilteredProfiles(filtered);
    }
  }, [allProfiles, userSearch]);

  console.log(filteredProfiles);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={userSearch}
          onChangeText={setUserSearch}
        />
      </View>
      <ScrollView>
        {userID ? (
          <ProfileScreen userID={userID} />
        ) : (
          filteredProfiles.map((profile) => (
            <TouchableOpacity
              key={profile.UserID}
              onPress={() => {
                setUserID(profile.UserID);
              }}
            >
              <ProfileCard key={profile.Username} profile={profile} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      {!userID && <BottomNavBar />}
    </View>
  );
};

const ProfileCard = ({ profile }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: profile.Picture }}
          style={{
            height: 50,
            width: 50,
            borderRadius: "50%",
            backgroundColor: "#bce0fd",
          }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile.Username}</Text>
          <Text style={styles.profileBio}>{profile.Bio}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
    padding: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
});

export default UserSearchScreen;
