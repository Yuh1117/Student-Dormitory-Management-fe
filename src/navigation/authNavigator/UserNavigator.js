import { Alert, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotiMain from '../../components/notifications/client/NotiMain';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../../components/auth/Account';
import StudentChatScreen from '../../services/user/ChatScreen';
import UserHome from '../../components/home/client/UserHome';
import Profile from '../../components/auth/Profile';
import RoomDetails from '../../components/room/client/RoomDetails';
import RoomInvoice from '../../components/billing/client/RoomInvoice';
import Rules from '../../components/home/client/Rules';
import Support from '../../components/support/Support';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import SendSupport from '../../components/support/SendSupport';
import Survey from '../../components/surveys/Survey';
import RoomChange from '../../components/room/client/RoomChange';
import SurveyQuestions from '../../components/surveys/SurveyQuestions';
import SurveyHistory from '../../components/surveys/SurveyHistory';
import InvoiceDetails from '../../components/billing/client/InvoiceDetails';
import SupportDetail from '../../components/support/SupportDetail';
import Settings from '../../components/settings/Settings';
import Language from '../../components/settings/Language';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';
import { MyRoomDispatchContext } from '../../config/MyContexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../config/Apis';
import RoomChangeHistory from '../../components/room/client/RoomChangeHistory';
import MapScreen from '../../components/home/client/MapScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackHomeNavigator = ({ t }) => {
    return (
        <Stack.Navigator initialRouteName="UserHome">
            <Stack.Screen
                name="UserHome"
                component={UserHome}
                options={{ headerShown: false, title: `${t('home')}` }}
            />

            <Stack.Screen
                name="RoomDetails"
                component={RoomDetails}
                options={{ headerShown: true, title: `${t('room')}` }}
            />

            <Stack.Screen
                name="RoomChange"
                component={RoomChange}
                options={({ navigation }) => ({
                    headerShown: true, title: `${t('roomChange.title')}`,
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ marginRight: 20 }}
                            onPress={() => navigation.navigate("RoomChangeHistory")}
                        >
                            <MaterialCommunityIcons name="history" size={30} />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="RoomChangeHistory"
                component={RoomChangeHistory}
                options={{ headerShown: true, title: `${t('roomChangeHistory.title')}` }}
            />

            <Stack.Screen
                name="RoomInvoice"
                component={RoomInvoice}
                options={{ headerShown: true, title: `${t('invoice')}` }}
            />
            <Stack.Screen
                name="InvoiceDetail"
                component={InvoiceDetails}
                options={{ headerShown: true, title: `${t('invoiceDetails.title')}`, }}
            />

            <Stack.Screen
                name="Support"
                component={Support}
                options={{ headerShown: true, title: `${t('support.title')}` }}
            />
            <Stack.Screen
                name="SendSupport"
                component={SendSupport}
                options={{ headerShown: true, title: `${t('sendSupport.title')}` }}
            />
            <Stack.Screen
                name="SupportDetail"
                component={SupportDetail}
                options={{ headerShown: true, title: `${t('supportDetail.title')}` }}
            />

            <Stack.Screen
                name="Survey"
                component={Survey}
                options={({ navigation }) => ({
                    headerShown: true,
                    title: `${t('survey.title')}`,
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
                options={{ headerShown: true, title: `${t('surveyQuestions')}` }}
            />
            <Stack.Screen
                name="SurveyHistory"
                component={SurveyHistory}
                options={{ headerShown: true, title: `${t('surveyHistory')}` }}
            />

            <Stack.Screen
                name="Rules"
                component={Rules}
                options={{ headerShown: true, title: `${t('rules')}` }}
            />
        </Stack.Navigator>
    )
}

const StackAccountNavigator = ({ t }) => {
    return (
        <Stack.Navigator initialRouteName="AccountMain">
            <Stack.Screen
                name="AccountMain"
                component={Account}
                options={{ headerShown: false, title: "Tài khoản" }}
            />

            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: true, title: t('profile.title') }}
            />

            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ headerShown: true, title: t('settings') }}
            />
            <Stack.Screen
                name="Language"
                component={Language}
                options={{ headerShown: true, title: `${t('language')}` }}
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
    const { t } = useTranslation()
    const roomDispatch = useContext(MyRoomDispatchContext)

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const token = await AsyncStorage.getItem("access-token");
                const res = await authApis(token).get(endpoints['my-room']);

                roomDispatch({
                    type: "login",
                    payload: res.data,
                })

            } catch (err) {
                Alert.alert(err.response?.data?.error || "Có lỗi xảy ra");
            }
        }

        fetchRoomData()
    }, [])

    return (
        <PaperProvider theme={customTheme}>
            <Tab.Navigator ScreenOptions={
                {
                    headerShown: false,
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "gray",
                }
            }>
                <Tab.Screen name="Home" children={() => <StackHomeNavigator t={t} />} options={
                    {
                        title: t('home'),
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }
                }></Tab.Screen>

                <Tab.Screen name="Notifications" children={() => <StackNotiNavigator t={t} />} options={
                    {
                        title: t('notifications.title'),
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="bell" color={color} size={size} />
                        ),
                    }
                }></Tab.Screen>

                <Tab.Screen name="Chat" component={StudentChatScreen} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="chat" color={color} size={size} />
                        ),

                    }
                }></Tab.Screen>

                <Tab.Screen name="Map" component={MapScreen} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="map" color={color} size={size} />
                        ),

                    }
                }></Tab.Screen>

                <Tab.Screen name="Account" children={() => <StackAccountNavigator t={t} />} options={
                    {
                        title: t('account'),
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