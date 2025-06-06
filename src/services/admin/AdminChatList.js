import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { listenToChatList } from '../../config/Chat';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';




import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import { listenToChatList } from './FirebaseService';
// import { useEffect, useState } from 'react';
import { Badge } from 'react-native-paper';

const ChatListScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  
  useEffect(() => {
    const unsubscribe = listenToChatList('admin', setChats);
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => {
    return (

    <TouchableOpacity style = {{padding:10,paddingTop:20,paddingBottom:20}} onPress={() => navigation.navigate('pesonalChat', { chatId: item.id,senderId:"admin" ,receiverId: item.otherUserId})}>
      <View style={styles.chatItem}>
        <View style={styles.chatInfo}>
          <Text style={styles.chatName}>{item.otherUserName}</Text>
          <Text style={styles.lastMessage}>
            {item.hasUnreadMessages ? "Tin nhắn mới..." : item.lastMessage.content}
          </Text>
        </View>
        {item.hasUnreadMessages && <Badge style={styles.unreadBadge}>!</Badge>}
      </View>
    </TouchableOpacity>
    )
  };

  return (
    <SafeAreaView>

    <FlatList
      data={chats}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#888',
  },
  unreadBadge: {
    backgroundColor: 'red',
    color: 'white',
  },
});

export default ChatListScreen;

