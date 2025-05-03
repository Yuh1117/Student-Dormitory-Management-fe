import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotiMain from '../../components/notifications/client/NotiMain';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../../components/auth/Account';
import StudentChatScreen from '../../services/user/ChatScreen';
import UserHome from '../../components/home/user/UserHome';
import Profile from '../../components/auth/Profile';
import RoomDetails from '../../components/room/client/RoomDetails';
import RoomInvoice from '../../components/billing/client/RoomInvoice';
import Rules from '../../components/home/user/Rules';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackHomeNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="UserHome">
            <Stack.Screen
                name="UserHome"
                component={UserHome}
                options={{ headerShown: false, title: "Trang chủ" }}
            />
            <Stack.Screen
                name="RoomDetails"
                component={RoomDetails}
                options={{ headerShown: true, title: "Thông tin phòng" }}
            />
            <Stack.Screen
                name="RoomInvoice"
                component={RoomInvoice}
                options={{ headerShown: true, title: "Hóa đơn" }}
            />
            <Stack.Screen
                name="Rules"
                component={Rules}
                options={{ headerShown: true, title: "Nội quy ký túc xá" }}
            />
        </Stack.Navigator>
    )
}

const StackAccountNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Account">
            <Stack.Screen
                name="Account"
                component={Account}
                options={{ headerShown: false, title: "Tài khoản" }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: true, title: "Thông tin cá nhân" }}
            />
        </Stack.Navigator>
    )
}

const StackNotiNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="NotiMain">
            <Stack.Screen
                name="NotiMain"
                component={NotiMain}
                options={{ headerShown: false, title: "Thông báo" }}
            />
        </Stack.Navigator>
    )
}

export function UserHomeMain() {
    return (
        <Tab.Navigator ScreenOptions={
            {
                headerShown: false,
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
            }
        }>
            <Tab.Screen name="Trang chủ" component={StackHomeNavigator} options={
                {
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }
            }></Tab.Screen>

            <Tab.Screen name="Thông Báo" component={StackNotiNavigator} options={
                {
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                }
            }></Tab.Screen>

            <Tab.Screen name="chat" component={StudentChatScreen} options={
                {
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="chat" color={color} size={size} />
                    ),

                }
            }></Tab.Screen>

            <Tab.Screen name="Tài khoản" component={StackAccountNavigator} options={
                {
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
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