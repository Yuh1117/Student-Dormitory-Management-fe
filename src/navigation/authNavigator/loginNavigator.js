import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from '../../components/auth/login';
import { UserHomeMain } from './UserNavigator';
import { AdminHomeMain } from './adminNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../../components/auth/Profile';

const Stack = createStackNavigator();

export default function LoginNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login" // trang hiện lên đầu tiên là trang admin
          component={LoginScreen}
          options={{ headerShown: false }} // Ẩn thanh tiêu đề nếu cần
        />
        <Stack.Screen
          name="UserHome"
          component={UserHomeMain}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminHome"
          component={AdminHomeMain}
          options={{ headerShown: false }}
        /><Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: true, title: "Thông tin cá nhân" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});