import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotiMain from '../../components/notifications/client/NotiMain';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../../components/auth/Account';
import StudentChatScreen from '../../services/user/ChatScreen';
import UserHome from '../../components/home/user/userHome';
import Profile from '../../components/auth/Profile';
import RoomDetails from '../../components/room/client/RoomDetails';
import RoomInvoice from '../../components/billing/client/RoomInvoice';
import Rules from '../../components/home/user/Rules';
import Support from '../../components/support/Support';
import { BottomNavigation, DefaultTheme, PaperProvider } from 'react-native-paper';
import SendSupport from '../../components/support/SendSupport';
import Survey from '../../components/surveys/Survey';
import RoomChange from '../../components/room/client/RoomChange';
import SurveyQuestions from '../../components/surveys/SurveyQuestions';
import { useNavigation } from '@react-navigation/native';
import SurveyHistory from '../../components/surveys/SurveyHistory';
import InvoiceDetails from '../../components/billing/client/InvoiceDetails';

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
                name="RoomChange"
                component={RoomChange}
                options={{ headerShown: true, title: "Đổi phòng" }}
            />

            <Stack.Screen
                name="RoomInvoice"
                component={RoomInvoice}
                options={{ headerShown: true, title: "Hóa đơn" }}
            />
            <Stack.Screen
                name="InvoiceDetail"
                component={InvoiceDetails}
                options={{ headerShown: true, title: "Thông tin hóa đơn" }}
            />

            <Stack.Screen
                name="Support"
                component={Support}
                options={{ headerShown: true, title: "Hỗ trợ" }}
            />
            <Stack.Screen
                name="SendSupport"
                component={SendSupport}
                options={{ headerShown: true, title: "Gửi yêu cầu hỗ trợ" }}
            />

            <Stack.Screen
                name="Survey"
                component={Survey}
                options={({ navigation }) => ({
                    headerShown: true,
                    title: "Khảo sát",
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ marginRight: 20 }}
                            onPress={() => navigation.navigate("SurveyHistory")}
                        >
                            <MaterialCommunityIcons name="history" size={30} />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="SurveyQuestions"
                component={SurveyQuestions}
                options={{ headerShown: true, title: "Câu hỏi khảo sát" }}
            />
            <Stack.Screen
                name="SurveyHistory"
                component={SurveyHistory}
                options={{ headerShown: true, title: "Lịch sử khảo sát" }}
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

const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        secondaryContainer: '#376be3',
        onSecondaryContainer: 'white',
        primary: '#376be3'
    },
};

export function UserHomeMain() {
    return (
        <PaperProvider theme={customTheme}>
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
        </PaperProvider>
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