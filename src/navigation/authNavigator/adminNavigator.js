import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons } from "@expo/vector-icons";
import AdminHome from '../../components/home/admin/adminHome';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ListRoomsScreen from '../../components/room/admin/ListRoomsScreen';
import RoomDetail from '../../components/room/admin/RoomDetailScreen';
import AdminStyles from '../../styles/AdminStyles';
import UpdateRoom from '../../components/room/admin/UpdateRoomScreen';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const getTabBarIcon = (name) => ({ color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
//chuyêm
const  StackRoomNavigater =() =>{
    return(
            <Stack.Navigator initialRouteName = "listRooms">
                <Stack.Screen name="listRooms" component={ListRoomsScreen} options={
                    { 
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                          ),
                        
                    }
                }/>
                <Stack.Screen name="roomDetail" component={RoomDetail}  options={
                    { 
                        // headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                          ),
                        
                    }
                }/>
                <Stack.Screen name="updateRoom" component={UpdateRoom}  options={
                    { 
                        // headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                          ),
                        
                    }
                }/>
            </Stack.Navigator>
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
            <Tab.Screen name = "Các Phòng" component = {StackRoomNavigater} options={
                { 
                    headerShown: false,
                    tabBarIcon: getTabBarIcon('home'),
                    
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