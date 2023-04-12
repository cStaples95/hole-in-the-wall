import React, { useState } from 'react';
import { Text, View, StatusBar, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

const ActivityFeed = ({ navigation }) => {

  const [data, setData] = useState(new Array(10).fill({
    id: 1,
    userName: 'Name Surname',
    avatar: require('../../../assets/images/avatar.png'),
    content: 'Eiusmod tempor quis ex aliquip non ipsum minim reprehenderit esse quis deserunt eiusmod proident id. Aliqua laborum pariatu...',
    timeAgo: '1h ago'
  }));

  const _renderItem = ({item, index}) => {
    return (
      <Card>
        <CardContent>
          <Header>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar source={item.avatar} />
              <UserName>{item.userName}</UserName>
            </View>
            <Time>{item.timeAgo}</Time>
          </Header>
          <Content>
            <ContentText>{item.content}</ContentText>
          </Content>
          <Image></Image>
          <Footer>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon source={require('../../../assets/images/like_icon.png')}/>
              <Number>609</Number>
              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 32}}>
                <Icon source={require('../../../assets/images/comments_icon.png')}/>
                <Number>120</Number>
              </View>
            </View>
            <Share>{'SHARE'}</Share>
          </Footer>
        </CardContent>
      </Card>
    )
  }

  return (
    <Container>
      <StatusBar hidden={true} />
      <NavBar>
        <Icon source={{uri: '../../../assets/images/menu_icon.png'}}/>
        <Title>{'ACTIVITY FEED'}</Title>
        <Icon source={{uri: '../../../assets/images/search_icon.png'}}/>
      </NavBar>
      <FlatList keyExtractor={(_, index) => ''+index} data={data} renderItem={_renderItem}/>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f1f9ff;
`;
const NavBar = styled.View`
  height: 76px;
  margin: 0px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  background-color: #BCE0FD;
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
export default ActivityFeed;