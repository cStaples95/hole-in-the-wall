import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import HomeFeedScreen from '../HomeFeedScreen/HomeFeedScreen';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.profile}>
          <View style={styles.avatar} />
          <View style={styles.details}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.bio}>
              I am a foodie who loves to explore different cuisines and share my experiences with others.
            </Text>
          </View>
        </View>
        <View style={styles.feed}>
          <Text style={styles.feedTitle}>My Posts</Text>
          <HomeFeedScreen/>
        </View>
      </View>
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

export default ProfileScreen;
