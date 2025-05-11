import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginNavigator from './navigation/authNavigator/loginNavigator';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Nhận thông báo khi app đang mở
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification received (foreground):", notification);
    });

    // Nhấn vào thông báo (kể cả app đã đóng)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification clicked:", response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

    
  }, []);
  
  return (
    <LoginNavigator/>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
