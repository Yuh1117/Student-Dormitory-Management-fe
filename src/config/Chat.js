
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
import { getAuth } from "firebase/auth";
const auth = getAuth();
console.log("User:", auth.currentUser);

/**
 * Gửi tin nhắn mới và cập nhật lastMessage
 * @param {string} chatId
 * @param {string} senderId
 * @param {string} content
 */
export const sendMessage = async (chatId, senderId, senderName, receiverId, receiverName, content) => {
  if (!content.trim()) return;

  const messageData = {
    senderId,
    senderName,
    content,
    timestamp: serverTimestamp(),
    isRead: false,
  };

  // Gửi tin nhắn
  await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);

  // Cập nhật tin nhắn cuối (lastMessage) và thông tin đối phương
  await setDoc(doc(db, 'chats', chatId), {
    lastMessage: {
      ...messageData,
    },
    participants: {
      [senderId]: senderName,
      [receiverId]: receiverName,
    },
    updatedAt: serverTimestamp(),
  }, { merge: true });
};


/**
 * Lắng nghe tin nhắn trong 1 chat
 * @param {string} chatId
 * @param {function} callback
 */
// export const listenMessagesAdmin = async (chatId, callback) => {
//   const q = query(
//     collection(db, 'chats', chatId, 'messages'),
//     orderBy('timestamp', 'asc'),
//     limit(30)
//   );

//   const chatDoc = await getDoc(doc(db, 'chats', chatId));
//   const chatData = chatDoc.data();
  
//   // Xác định người đối thoại (student) dựa vào ID
//   const participants = Object.keys(chatData.participants);
//   const studentId = participants.find(id => id !== adminId);
//   const receiverName = chatData.participants[studentId];

//   await updateDoc(doc(db, 'chats', chatId), {
//       "lastMessage.isRead": true
//     });
  

//   return onSnapshot(q, (snapshot) => {
//     const messages = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     callback(messages,receiverName);
//   });
// };
export const listenMessagesAdmin = async (chatId, callback) => {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('timestamp', 'asc'),
    limit(30)
  );

  const chatDoc = await getDoc(doc(db, 'chats', chatId));
  const chatData = chatDoc.data();

  // Xác định người đối thoại (student) dựa vào ID
  const participants = Object.keys(chatData.participants);
  const studentId = participants.find(id => id !== 'admin'); // Ở đây bạn không có biến `adminId`, mình sửa lại là 'admin'
  const receiverName = chatData.participants[studentId];

  // Cập nhật lastMessage.isRead = true
  await updateDoc(doc(db, 'chats', chatId), {
    "lastMessage.isRead": true
  });

  // Bắt đầu lắng nghe tin nhắn mới
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages, receiverName);
  });
};

export const listenMessages = async (chatId, callback) => {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('timestamp', 'asc'),
    limit(30)
  );

  const chatDoc = await getDoc(doc(db, 'chats', chatId));
  const chatData = chatDoc.data();
  
  // Xác định người đối thoại (student) dựa vào ID
  // const participants = Object.keys(chatData.participants);
  // const studentId = participants.find(id => id !== adminId);
  // const receiverName = chatData.participants[studentId];

  // Cập nhật lastMessage.isRead = true
  await updateDoc(doc(db, 'chats', chatId), {
    "lastMessage.isRead": true
  });

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
// export const listenToChatList = (adminId, callback) => {
//   const q = query(collection(db, 'chats'), orderBy('updatedAt', 'desc'));

//   return onSnapshot(q, (snapshot) => {
//     const chats = snapshot.docs.map((docSnap) => {
//       const chat = docSnap.data();
//       const chatId = docSnap.id;

//       // Tìm ID của đối phương
//       const participants = Object.keys(chat.participants);
//       const otherUserId = participants.find(id => id !== adminId);
//       const otherUserName = chat.participants[otherUserId];

//       return {
//         id: chatId,
//         lastMessage: chat.lastMessage,
//         otherUserId,
//         otherUserName,
//         updatedAt: chat.updatedAt,
//       };
//     });

//     callback(chats);
//   });
// };

export const listenToChatList = (adminId, callback) => {
  const q = query(collection(db, 'chats'), orderBy('updatedAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const chats = snapshot.docs.map((docSnap) => {
      const chat = docSnap.data();
      const chatId = docSnap.id;

      // Tìm ID của đối phương
      const participants = Object.keys(chat.participants);
      const otherUserId = participants.find(id => id !== adminId);
      const otherUserName = chat.participants[otherUserId];

      // Kiểm tra xem có tin nhắn chưa đọc không
      const hasUnreadMessages = chat.lastMessage.senderId !== adminId && !chat.lastMessage.isRead;

      return {
        id: chatId,
        lastMessage: chat.lastMessage,
        otherUserId,
        otherUserName,
        updatedAt: chat.updatedAt,
        hasUnreadMessages
      };
    });

    callback(chats);
  });
};

export const ChatAdminId = (id)=>{
  return `admin_${id}`;
}
