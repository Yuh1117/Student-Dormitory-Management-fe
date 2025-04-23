import {
  collection,
  doc,
  addDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  getDoc,
  limit
} from 'firebase/firestore';
import { db } from './FireBase';

/**
 * Gửi tin nhắn mới và cập nhật lastMessage
 * @param {string} chatId
 * @param {string} senderId
 * @param {string} content
 */
export const sendMessage = async (chatId, senderId, content) => {
  if (!content.trim()) return;

  const messageData = {
    senderId,
    content,
    timestamp: serverTimestamp(),
    isRead: false,
  };

  // Gửi tin nhắn
  await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);

  // Cập nhật tin nhắn cuối (lastMessage)
  await setDoc(doc(db, 'chats', chatId), {
    lastMessage: {
      ...messageData,
      senderId,
    },
    updatedAt: serverTimestamp(),
  }, { merge: true });
};

/**
 * Lắng nghe tin nhắn trong 1 chat
 * @param {string} chatId
 * @param {function} callback
 */
export const listenMessages = (chatId, callback) => {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('timestamp', 'asc'),
    limit(30)
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });
};

/**
 * Cập nhật trạng thái đã đọc tin nhắn
 * @param {string} chatId
 * @param {Array} messageIds
 */
export const markMessagesAsRead = async (chatId, messageIds) => {
  for (const msgId of messageIds) {
    const msgRef = doc(db, 'chats', chatId, 'messages', msgId);
    await updateDoc(msgRef, {
      isRead: true,
    });
  }
};

/**
 * Lắng nghe danh sách các cuộc trò chuyện (dùng cho admin)
 * @param {function} callback
 */
export const listenToChatList = (callback) => {
  const q = query(collection(db, 'chats'), orderBy('updatedAt', 'desc'));

  return onSnapshot(q, async (snapshot) => {
    const chats = await Promise.all(snapshot.docs.map(async (docSnap) => {
      const chat = docSnap.data();
      const chatId = docSnap.id;

      // Có thể tách studentId từ chatId nếu bạn dùng cấu trúc như: `adminId_studentId`
      const participants = chatId.split('_'); 

      if (!participants.includes('admin')) return null;

      return {
        id: chatId,
        ...chat,
        participants,
      };
    }));

    // Lọc bỏ những phần tử null
    const filteredChats = chats.filter(Boolean);
    console.log(filteredChats)

    callback(filteredChats);
  });
};

export const ChatAdminId = (id)=>{
  return `admin_${id}`;
}
