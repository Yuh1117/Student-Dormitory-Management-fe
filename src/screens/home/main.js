import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHome from './userHome';
import NotiMain from '../notifications/main';
import {MaterialCommunityIcons } from "@expo/vector-icons";
import AdminHome from './adminHome';


const Tab = createBottomTabNavigator();

//chia thành 2 giao diện cho người dùng admin và user thường

// UserHome main chứa các tab cho user thường dùng
export function UserHomeMain(){
    return (
        <Tab.Navigator ScreenOptions ={
            {
                headerShown: false,
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
            }
        }>
            <Tab.Screen name = "Phòng" component = {UserHome} options={
                { 
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                      ),
                }
                }></Tab.Screen>
            <Tab.Screen name = "Thông Báo" component = {NotiMain} options={
                {
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                      ),
                }
                }></Tab.Screen>
        </Tab.Navigator>  
    )
}


// trang AdminHomeMain chứa các tab cho admin dùng
export function AdminHomeMain(){
    return (
        <Tab.Navigator ScreenOptions ={
            {
                headerShown: false,
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
            }
        }>
            <Tab.Screen name = "Các Phòng" component = {AdminHome} options={
                { 
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                      ),
                }
            }></Tab.Screen>
            
        </Tab.Navigator> 
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });