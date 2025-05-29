import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export const registerForPushNotificationsAsync = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Không có quyền gửi thông báo!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token; 
  }
};

