
import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { sendMessage, listenMessages, markMessagesAsRead, listenMessagesAdmin } from '../../config/Chat';
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminChatScreen = ({ route }) => {
  const { chatId, senderId,receiverId } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [receiverName,setReceiverName] = useState('')
  const flatListRef = useRef(null);


  const fetchMessages = async () => {
    const unsubscribe = listenMessagesAdmin(chatId, async (msgs,rName) => {
      setMessages(msgs);
      setReceiverName(rName)
      const unreadIds = msgs
        .filter(m => !m.isRead && m.senderId !== 'admin') // admin là người nhận, kiểm tra tin nhắn chưa đọc
        .map(m => m.id);

      if (unreadIds.length) {
        await markMessagesAsRead(chatId, unreadIds);
      }
    });

    return unsubscribe;
  }

  // Lắng nghe tin nhắn khi đã có chatId và senderId
  useEffect(() => {
    if (!chatId || !senderId) return;

    fetchMessages();
    
  }, [chatId, senderId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(chatId, 'admin',"Admin",receiverId,receiverName, input); // Gửi tin nhắn với senderId là 'admin'
    setInput('');
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        alignSelf: item.senderId === 'admin' ? 'flex-end' : 'flex-start',
        backgroundColor: item.senderId === 'admin' ? '#DCF8C6' : '#EEE',
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
      <SafeAreaView style={{ flex: 1 }}>
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

