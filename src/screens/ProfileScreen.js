import React, { useEffect, useState } from "react";
import { View, StatusBar, Image, ScrollView } from "react-native";
import { Button, Input } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import BottomNavBar from "@components/BottomNavBar";
import axios from "axios";
import { updateProfile, getData } from "@api";
import ActivityFeed from "./ActivityFeed";

const ProfileScreen = ({ userID }) => {
  const [profile_name, set_profile_name] = useState(null);
  const [profileBio, setProfileBio] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      getData("token").then((response) => {
        setToken(response);
      });
    }
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsEditing(true);
      setImage(result.assets[0].uri);
    }
  };

  const saveProfile = () => {
    updateProfile(profileBio, image);
  };

  useEffect(() => {
    if (!profile_name && token) {
      axios
        .get(
          userID
            ? `http://localhost:8000/profiles/get/${userID}`
            : "http://127.0.0.1:8000/profiles/get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const { Bio, Picture, Username, PictureExt } = response.data;
          console.log(response.data);
          set_profile_name(Username);
          setProfileBio(Bio || "");
          if (Picture) {
            setImage(Picture);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, profile_name]);

  return (
    <Container>
      <StatusBar hidden={true} />
      <TouchableOpacity onPress={pickImage}>
        <AvatarView>
          <Image
            source={
              image
                ? { uri: image }
                : require("@assets/images/avatar_white.png")
            }
            style={{ width: 96, height: 96 }}
          />
        </AvatarView>
      </TouchableOpacity>
      <ProfileView>
        <View>
          <View>
            <Text size="20px" bold style={{ marginTop: 16 }}>
              {profile_name}
            </Text>
            {isEditing ? (
              <Input
                placeholder="Edit bio..."
                value={profileBio}
                onChange={(e) => {
                  setProfileBio(e.nativeEvent.text);
                }}
              />
            ) : (
              <Text size="14px" align="left">
                {profileBio}
              </Text>
            )}
            <Button
              title={isEditing ? "save" : "edit profile"}
              onPress={() => {
                if (isEditing) {
                  saveProfile();
                }
                setIsEditing(!isEditing);
              }}
            />
          </View>
        </View>
      </ProfileView>
      <ActivityFeed getMyProfile={true} userID={userID} />
      {!userID && <BottomNavBar />}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const NavBarView = styled.View`
  height: 76px;
  margin: 0px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled.Text`
  color: ${(props) => (props.color ? props.color : "#2699fb")};
  font-size: ${(props) => (props.size ? props.size : "14px")};
  line-height: ${(props) => (props.height ? props.height : "24px")};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  text-align: ${(props) => (props.align ? props.align : "center")}; ;
`;
const AvatarView = styled.View`
  width: 375px;
  height: 136px;
  background-color: #bce0fd;
  justify-content: center;
  align-items: center;
`;
const ProfileView = styled.View`
  margin: 20px 32px;
`;
const SkillView = styled.View`
  width: 375px;
  height: 164px;
  background-color: #f1f9ff;
  border-bottom-width: 1px;
  border-bottom-color: #bce0fd;
`;
const TeamView = styled.View`
  width: 375px;
  height: 134px;
  background-color: #f1f9ff;
`;
// const FollowButton = styled.View`
//   width: 96px;
//   height: 40px;
//   background-color: #2699fb;
//   justify-content: center;
//   align-items: center;
//   border-radius: 4px;
// `;
const TagBox = styled.View`
  height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 10px;
  border-color: #bce0fd;
  border-width: 1px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background-color: #f1f9ff;
`;
const Circle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: #bce0fd;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 16px;
`;

export default ProfileScreen;
