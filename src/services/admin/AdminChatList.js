import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { listenToChatList } from '../../config/Chat';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// const ChatListScreen = ({ currentUser }) => {
//   const [chats, setChats] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const unsubscribe = listenToChatList(setChats);
//     return () => unsubscribe();
//   }, []);

//   const renderItem = ({ item }) => {
//     // const otherId = item.participants.find(id => id !== currentUser.id);
//     const otherId = item.participants[1];
//     const lastMsg = item.lastMessage?.content || "Bắt đầu cuộc trò chuyện...";
//     return (
//       <TouchableOpacity
//         onPress={() => navigation.navigate('pesonalChat', { chatId: item.id, senderId:"admin" })}
//         style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
//       >
//         <Text style={{ fontWeight: 'bold' }}>{otherId}</Text>
//         <Text numberOfLines={1}>{lastMsg}</Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>

//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={chats}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//     </SafeAreaView>
//   );
// };

// export default ChatListScreen;




// import { View, Text, TouchableOpacity, FlatList } from 'react-native';
// import { listenToChatList } from './FirebaseService'; // Import hàm vừa tạo
// import { useEffect, useState } from 'react';

// const ChatListScreen = ({ navigation }) => {
//   const [chats, setChats] = useState([]);
  
//   useEffect(() => {
//     const unsubscribe = listenToChatList('admin', setChats); // admin là ID của admin
//     return () => unsubscribe();
//   }, []);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { chatId: item.id })}>
//       <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
//         <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.otherUserName}</Text>
//         <Text>{item.lastMessage.content}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <FlatList
//       data={chats}
//       keyExtractor={(item) => item.id}
//       renderItem={renderItem}
//     />
//   );
// };

// export default ChatListScreen;



import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import { listenToChatList } from './FirebaseService'; // Import hàm vừa tạo
// import { useEffect, useState } from 'react';
import { Badge } from 'react-native-paper';

const ChatListScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  
  useEffect(() => {
    const unsubscribe = listenToChatList('admin', setChats); // admin là ID của admin
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => {
    return (

    <TouchableOpacity onPress={() => navigation.navigate('pesonalChat', { chatId: item.id,senderId:"admin" ,receiverId: item.otherUserId})}>
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

