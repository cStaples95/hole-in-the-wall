import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const onPressedCreatePost = () => {
    const now = new Date();
    setTimestamp(now.toISOString());
    console.log(`Creating post with title "${title}", description "${description}", location "${location}", and timestamp "${timestamp}"`);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ borderWidth: 1, backgroundColor: 'white', width: '60%', borderColor: 'gray', padding: 10, marginBottom: 10 }}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={{ borderWidth: 1, backgroundColor: 'white', width: '60%', borderColor: 'gray', padding: 10, marginBottom: 10 }}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={{ borderWidth: 1, backgroundColor: 'white', width: '60%', borderColor: 'gray', padding: 10, marginBottom: 10 }}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <Button
        title="Create Post"
        onPress={onPressedCreatePost}
      />

      <BottomNavBar />
    </View>
  );
};

export default CreatePostScreen;