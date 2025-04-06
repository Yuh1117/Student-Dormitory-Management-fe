import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHome from '../../components/home/user/userHome';
import NotiMain from '../../components/notifications/notiMainScreen';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// UserHome main chứa các tab cho user thường dùng
export function UserHomeMain() {
    return (
        <Tab.Navigator ScreenOptions={
            {
                headerShown: false,
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
            }
        }>
            <Tab.Screen name="Phòng" component={UserHome} options={
                {
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }
            }></Tab.Screen>
            <Tab.Screen name="Thông Báo" component={NotiMain} options={
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});