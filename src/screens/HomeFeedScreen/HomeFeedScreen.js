import React, { useEffect, useState } from "react";
import { View, StatusBar, FlatList } from "react-native";
import styled from "styled-components/native";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import axios from "axios";

let first_load = true;

const Comment = ({ UserID, Comment }) => {
  return (
    <Content>
      <ContentText>{UserID}</ContentText>
      <ContentText>{Comment}</ContentText>
    </Content>
  )
}

const ItemCard = ({ item, index }) => {
  return (
    <Card>
      <CardContent>
        <Header>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar source={item.avatar} />
            <UserName>{item.UserID}</UserName>
          </View>
          <Time>{item.DatePosted}</Time>
        </Header>
        <Content>
          <ContentText>{item.Description}</ContentText>
        </Content>
        <Image></Image>
        <Footer>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon source={require("../../../assets/images/like_icon.png")} />
            <Number>609</Number>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 32,
              }}
            >
              <Icon
                source={require("../../../assets/images/comments_icon.png")}
              />
              <Number>120</Number>
            </View>
          </View>
          <Share>{"SHARE"}</Share>
        </Footer>
        <Footer>
        <div style={{ border: '1px solid #2699fb', height: '50vh', width: '100vw' }}>
  {item.Comments.map((comment) => (
    <div style={{ border: '1px solid #2699fb', marginBottom: '10px' }}>
      <Comment UserID={comment.UserID} Comment={comment.Comment} />
    </div>
  ))}
</div>
        </Footer>
      </CardContent>
    </Card>
  );
}

const HomeFeedScreen = ({ navigation }) => {
  const [data, setData] = useState(
    new Array(10).fill({
      Title: "",
      Description: "",
      Location: "",
      Comments: [
        {"UserID": "Mike", "Comment": "Hello there"},
        {"UserID": "Luke", "Comment": "Hello Mike"}
      ],
      DatePosted: "2021-03-01",
      UserID: 0,
      PostID: 0,
      avatar: require("../../../assets/images/avatar.png"),
    })
  );

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/posts/ten")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      }, []);
  }, []);

  return (
    <Container>
      <StatusBar hidden={true} />
      <FlatList
        keyExtractor={(_, index) => "" + index}
        data={data}
        renderItem={ItemCard}
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
const Image = styled.View`
  height: 170px;
  background-color: #bce0fd;
`;
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
export default HomeFeedScreen;