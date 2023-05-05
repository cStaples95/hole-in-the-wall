import React, { useEffect, useState } from "react";
import { Text, View, StatusBar, FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import BottomNavBar from "@components/BottomNavBar";
import axios from "axios";
import { getData } from "../api";

async function asyncMap(arr, asyncFunc) {
  const promises = arr.map(asyncFunc);
  return Promise.all(promises);
}

const ActivityFeed = ({ navigation, getMyProfile, userID }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (data === null) {
        let response;
        if (getMyProfile) {
          const token = await getData("token");
          response = await axios.get("http://127.0.0.1:8000/posts/myposts", {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          response = await axios.get("http://127.0.0.1:8000/posts/10");
        }
        const { data } = response;

        const dataWithProfilePicture = await asyncMap(data, async (item) => {
          const res = await axios.get(
            `http://localhost:8000/profiles/get/picture/${item.UserID}`
          );
          const profilePicture = res.data;
          return {
            ...item,
            ProfilePicture: profilePicture || null,
          };
        });

        console.log(dataWithProfilePicture, "the data");
        setData(dataWithProfilePicture);
      }
    };

    fetchData();
  }, []);

  const CardItem = ({ item, index }) => {
    useEffect(() => {
      setLikeCount(item.Likes.length);

      const getUsername = async () => {
        const res = await axios.get(
          `http://localhost:8000/users/username/${item.UserID}`
        );

        const { data } = res;

        setUsername(data);
      };

      getUsername();
    }, [item]);

    const [likeCount, setLikeCount] = useState(0);
    const [username, setUsername] = useState("");

    const likePost = async () => {
      const token = await getData("token");
      console.log(token, "bitch");

      try {
        const res = await axios.get(
          `http://localhost:8000/posts/${item.PostID}/like`,

          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          setLikeCount(likeCount + 1);
        }
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Card>
        <CardContent>
          <Header>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar source={{ uri: item.ProfilePicture }} />
              <UserName>{username}</UserName>
            </View>
            <Time>{item.DatePosted}</Time>
          </Header>
          <Content>
            <ContentText>{item.Description}</ContentText>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Icon
                source={require("@assets/location_icon.png")}
                style={{ marginRight: 8 }}
              />
              <ContentText style={{ fontWeight: "bold", color: "black" }}>
                {item.Location}
              </ContentText>
            </View>
          </Content>
          <Image
            source={{ uri: item.Picture }}
            style={{
              height: 170,
              backgroundColor: "#bce0fd",
            }}
          />
          <Footer>
            <TouchableOpacity onPress={likePost}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon source={require("@assets/images/like_icon.png")} />
                <Number>{likeCount}</Number>
              </View>
            </TouchableOpacity>
          </Footer>
        </CardContent>
      </Card>
    );
  };

  const _renderItem = ({ item, index }) => {
    return <CardItem item={item} index={index} />;
  };

  return (
    <Container>
      <StatusBar hidden={true} />
      <FlatList
        keyExtractor={(_, index) => "" + index}
        data={data}
        renderItem={_renderItem}
      />
      <BottomNavBar />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f1f9ff;
`;
const Icon = styled.Image`
  width: 16px;
  height: 16px;
`;
const Title = styled.Text`
  color: #2699fb;
  font-size: 14px;
  line-height: 24px;
  font-weight: bold;
`;
const Card = styled.View`
  margin: 8px;
  background-color: #fff;
`;
const CardContent = styled.View`
  margin: 32px;
`;
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: #bce0fd;
`;
const UserName = styled.Text`
  color: #2699fb;
  font-size: 14px;
  line-height: 24px;
  font-weight: bold;
  margin-left: 8px;
`;
const Time = styled.Text`
  color: #2699fb;
  font-size: 14px;
  line-height: 24px;
`;
const Content = styled.View`
  margin: 16px 0px;
  height: 80px;
`;
const ContentText = styled.Text`
  color: #2699fb;
  font-size: 14px;
  line-height: 24px;
`;
// const Image = styled.View`
//   height: 170px;
//   background-color: #bce0fd;
// `;
const Footer = styled.View`
  margin-top: 32px;
  flex-direction: row;
  justify-content: space-between;
`;
const Number = styled.Text`
  margin-left: 8px;
  color: #2699fb;
  font-size: 14px;
  line-height: 24px;
  font-weight: bold;
`;
const Share = styled.Text`
  color: #2699fb;
  font-size: 14px;
  line-height: 24px;
  font-weight: bold;
`;
export default ActivityFeed;
