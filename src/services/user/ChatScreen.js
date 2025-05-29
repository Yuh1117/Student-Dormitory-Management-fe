

import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { sendMessage, listenMessages, markMessagesAsRead, ChatAdminId } from '../../config/Chat';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const StudentChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatId, setChatId] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [senderId, setSenderId] = useState('');
  const [fullName, setFullName] = useState('')
  const flatListRef = useRef(null);
  const { t } = useTranslation()

  useEffect(() => {
    const init = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        console.log(user)
        setCurrentUser(user);
        setSenderId(user.id);
        const id = ChatAdminId(user.id);
        setChatId(id);
        setFullName(`${user.first_name} ${user.last_name}`)
      }
      console.log(fullName)

    };
    init();
  }, []);
  const fetchMessages = async () => {
    const unsubscribe = listenMessages(chatId, async (msgs) => {
      setMessages(msgs);
      // console.log(unsubscribe)
      const unreadIds = msgs
        .filter((m) => !m.isRead && m.senderId === 'admin')
        .map((m) => m.id);

      if (unreadIds.length) {
        await markMessagesAsRead(chatId, unreadIds);
      }
    });

    return unsubscribe;
  }
  useEffect(() => {
    if (!chatId || !currentUser) return;
    fetchMessages();
    
  }, [chatId, currentUser]);

  const handleSend = async () => {
    if (!input.trim()) return;

    await sendMessage(chatId, senderId, fullName, "admin", "Admin", input);
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
        maxWidth: '75%',
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
          placeholder={t('chat')}
        />
        <TouchableOpacity onPress={handleSend} style={{ padding: 10, backgroundColor: '#2196F3', borderRadius: 20 }}>
          <Text style={{ color: '#FFF' }}>{t('send')}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default StudentChatScreen;

