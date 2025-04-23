// import React, { useEffect, useState, useRef } from 'react';
// import { View, TextInput, FlatList, Button, Text, KeyboardAvoidingView } from 'react-native';
// import { sendMessage, listenMessages, markMessagesAsRead } from '../services/chatService';

// const AdminChatScreen = ({ route }) => {
//   const { chatId, otherId } = route.params;
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState('');
//   const flatListRef = useRef(null);

//   const currentUserId = 'admin' // hoặc truyền từ props

//   useEffect(() => {
//     const unsubscribe = listenMessages(chatId, (msgs) => {
//       setMessages(msgs);
//       const unread = msgs.filter(m => !m.isRead && m.senderId === otherId).map(m => m.id);
//       if (unread.length > 0) markMessagesAsRead(chatId, unread);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleSend = () => {
//     sendMessage(chatId, currentUserId, text);
//     setText('');
//   };

//   const renderItem = ({ item }) => (
//     <View style={{ padding: 8, alignSelf: item.senderId === currentUserId ? 'flex-end' : 'flex-start', backgroundColor: '#eee', borderRadius: 10, marginVertical: 4 }}>
//       <Text>{item.content}</Text>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
//       />
//       <View style={{ flexDirection: 'row', padding: 8 }}>
//         <TextInput
//           style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12 }}
//           value={text}
//           onChangeText={setText}
//           placeholder="Nhập tin nhắn..."
//         />
//         <Button title="Gửi" onPress={handleSend} />
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default AdminChatScreen;

import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { sendMessage, listenMessages, markMessagesAsRead, ChatAdminId } from '../../config/Chat';
import { useRoute } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminChatScreen = ({route}) => {
  const { chatId, senderId } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentUser,setCurrentUser] = useState(null)
  const flatListRef = useRef(null);

    
      // Lắng nghe tin nhắn khi đã có chatId và currentUser
      useEffect(() => {
        if (!chatId || !senderId) return;
    
        const unsubscribe = listenMessages(chatId, async (msgs) => {
          setMessages(msgs);
    
          const unreadIds = msgs
            .filter(m => !m.isRead && m.senderId === 'admin') // admin là người còn lại
            .map(m => m.id);
    
          if (unreadIds.length) {
            await markMessagesAsRead(chatId, unreadIds);
          }
        });
    
        return unsubscribe;
      }, []);
//   useEffect(() => {
//     getID();
//     console.log(currentUser)
//     const unsubscribe = listenMessages(chatId, async (msgs) => {
//       setMessages(msgs);

//       const unreadIds = msgs
//         .filter(m => !m.isRead && m.senderId === otherId)
//         .map(m => m.id);

//       if (unreadIds.length) await markMessagesAsRead(chatId, unreadIds);
//     });

//     return unsubscribe;
//   }, []);

  const handleSend = async () => {
      if (!input.trim()){
        console.log('vào')
        return;
    } 
    await sendMessage(chatId, senderId, input);
    setInput('');
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        alignSelf: item.senderId === senderId ? 'flex-end' : 'flex-start',
        backgroundColor: item.senderId === senderId ? '#DCF8C6' : '#EEE',
        borderRadius: 10,
        padding: 10,
        marginVertical: 4,
        maxWidth: '75%'
      }}
    >
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 10 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
        <SafeAreaView style={{flex:1}}>

        <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 10 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        </SafeAreaView>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#CCC', borderRadius: 20, padding: 10, marginRight: 8 }}
          value={input}
          onChangeText={setInput}
          placeholder="Nhắn tin..."
        />
        <TouchableOpacity onPress={handleSend} style={{ padding: 10, backgroundColor: '#2196F3', borderRadius: 20 }}>
          <Text style={{ color: '#FFF' }}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AdminChatScreen;
