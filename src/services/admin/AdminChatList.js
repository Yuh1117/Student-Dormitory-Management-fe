import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { listenToChatList } from '../../config/Chat';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatListScreen = ({ currentUser }) => {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = listenToChatList(setChats);
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => {
    // const otherId = item.participants.find(id => id !== currentUser.id);
    const otherId = item.participants[1];
    const lastMsg = item.lastMessage?.content || "Bắt đầu cuộc trò chuyện...";
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('pesonalChat', { chatId: item.id, senderId:"admin" })}
        style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
      >
        <Text style={{ fontWeight: 'bold' }}>{otherId}</Text>
        <Text numberOfLines={1}>{lastMsg}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

    <View style={{ flex: 1 }}>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
    </SafeAreaView>
  );
};

export default ChatListScreen;
