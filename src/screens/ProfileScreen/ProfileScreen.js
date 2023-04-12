import React from 'react';
import { View, StatusBar, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

const NavBar = ({navigation}) => {
  return (
    <NavBarView>
      <Image source={require('../../../assets/images/menu_icon.png')} style={{width: 16, height: 16}}/>
      <Text bold>PROFILE</Text>
      <Image source={require('../../../assets/images/search_icon.png')} style={{width: 16, height: 16}}/>
    </NavBarView>
  )
}

const Tag = ({tag}) => {
  return (
    <TagBox>
      <Text size='10px'style={{paddingHorizontal: 14}}>{tag}</Text>
    </TagBox>
  )
}

const ProfileScreen = ({
    navigation,
}) => {
  return (
    <Container>
      <StatusBar hidden={true}/>
      <NavBar navigation={navigation}/>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <AvatarView>
          <Image source={require('../../../assets/images/avatar_white.png')} style={{width: 96, height: 96}}/>
        </AvatarView>
        <ProfileView>
          <View style={{marginBottom:20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View>
              <Text size='20px' bold style={{marginTop: 16}}>John Smith</Text>
              <Text size='10px'>Cherry Hill, NJ</Text>
            </View>
            <FollowButton>
              <Text size='10px' bold height='12px' color='#fff'>FOLLOW</Text>
            </FollowButton>
          </View>
          <Text size='14px' align='left'>
            Insert Profile Description Here, Insert Profile Description Here, Insert Profile Description Here, Insert Profile Description Here
          </Text>
        </ProfileView>
        <SkillView>
          <View style={{marginTop: 18, marginLeft: 32, marginRight: 32, justifyContent:'flex-start', alignItems: 'flex-start'}}>
            <Text size='14px' bold>TAGS</Text>
            <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
              <Tag tag='Sushi'/><Tag tag='Pizza'/><Tag tag='Burgers'/><Tag tag='American'/>
              <Tag tag='Japanese'/><Tag tag='Chinese'/>
            </View>
          </View>
        </SkillView>
        <TeamView>
          <View style={{marginTop: 18, marginLeft: 32, marginRight: 32, justifyContent:'flex-start', alignItems: 'flex-start'}}>
            <Text size='14px' bold>GROUPS</Text>
            <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
              <Circle/><Circle/><Circle/>
            </View>
          </View>
        </TeamView>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const NavBarView = styled.View`
  height: 76px;
  margin: 0px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center
`;
const Text = styled.Text`
  color: ${(props)=>(props.color ? props.color: '#2699fb')};
  font-size: ${(props)=>(props.size ? props.size: '14px')};
  line-height: ${(props)=>(props.height ? props.height: '24px')};
  font-weight: ${(props)=>(props.bold ? 'bold': 'normal')};
  text-align: ${(props)=>(props.align ? props.align : 'center')};;
`;
const AvatarView = styled.View`
  width: 375px;
  height: 136px;
  background-color: #BCE0FD;
  justify-content: center;
  align-items: center;
`;
const ProfileView = styled.View `
  margin: 20px 32px;
`;
const SkillView = styled.View`
  width: 375px;
  height: 164px;
  background-color: #F1F9FF;
  border-bottom-width: 1px;
  border-bottom-color: #BCE0FD;
`;
const TeamView = styled.View`
  width: 375px;
  height: 134px;
  background-color: #F1F9FF;
`;
const FollowButton = styled.View`
  width: 96px;
  height: 40px;
  background-color: #2699FB;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;
const TagBox = styled.View`
  height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 10px;
  border-color: #BCE0FD;
  border-width: 1px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background-color: #F1F9FF;
`;
const Circle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: #BCE0FD;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 16px;
`;

export default ProfileScreen;