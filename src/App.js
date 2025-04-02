import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/auth/login';
import {UserHomeMain,AdminHomeMain} from './screens/home/main';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
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
          options={{headerShown: false }} // Tạo nút back về Login
        />
        <Stack.Screen 
          name="AdminHome" 
          component={AdminHomeMain} 
          options={{headerShown: false }} // Tạo nút back về Login
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
