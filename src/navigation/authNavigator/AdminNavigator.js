import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AdminHome from '../../components/home/admin/AdminHome';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ListRoomsScreen from '../../components/room/admin/ListRoomsScreen';
import RoomDetail from '../../components/room/admin/RoomDetailScreen';
import AdminStyles from '../../styles/AdminStyles';
import UpdateRoom from '../../components/room/admin/UpdateRoomScreen';
import RoomInvoiceList from '../../components/billing/admin/RoomInvoiceListScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Drawer } from 'react-native-paper';

import CreateInvoice from '../../components/billing/admin/CreateInvoiceScreen';
import { RoomProvider } from '../../components/room/admin/roomContext';
import UpdateInvoice from '../../components/billing/admin/UpdateInvoicesScreens';
import UserManage from '../../components/auth/admin/UserManagetScreen';
import RegisterScreen from '../../components/auth/Register';
import RoomMember from '../../components/room/admin/RoomMemberScreen';
import AddRoomMember from '../../components/room/admin/AddRoomMemberScreen';
import CreateNotification from '../../components/notifications/admin/CreateNotiScreen';
import ChatListScreen from '../../services/admin/AdminChatList';
import StudentChatScreen from '../../services/user/ChatScreen';
import AdminChatScreen from '../../services/admin/AdminChatScreen';
import CreateSurvey from '../../components/surveys/admin/CreateSurveyScreen'
import SurveyList from '../../components/surveys/admin/ListvurveysScreen';
import SurveyDetail from '../../components/surveys/admin/SurveyDetailScreen';
import SurveyResponses from '../../components/surveys/admin/ResponseSurveysScreen';
import ComplaintList from '../../components/support/admin/ComplaintListScreen';
import ComplaintDetail from '../../components/support/admin/ComplaintDetailScreen';
import RoomChangeRequest from '../../components/room/admin/RoomChangeRequestScreen';
import RoomChangeDetail from '../../components/room/admin/RequestDetailScreen';
import Statistics from '../../components/surveys/admin/statistics/StatisticsScreen';
import StudentList from '../../components/auth/admin/StudentListScreen'
import StudentDetail from '../../components/auth/admin/StudentDetaiScreen';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const getTabBarIcon = (name) => ({ color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
);
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="invoicesList">
            <Drawer.Screen name="invoicesList" component={RoomInvoiceList} options={{
                title: 'Danh sách hóa đơn',
                drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="file-document-outline" size={size} color={color} />
                ),
            }} />
            <Drawer.Screen name="createInvoice" component={CreateInvoice} options={{
                title: 'Tạo hóa đơn',
                drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="creation" size={size} color={color} />
                ),
            }} />
            <Drawer.Screen name="updateInvoice" component={UpdateInvoice} options={{
                title: 'Cập nhật hóa đơn',
                drawerItemStyle: { display: 'none' },

            }} />

        </Drawer.Navigator>
    );
}



const StackRoomNavigater = () => {
    return (


        <RoomProvider>
            <Stack.Navigator initialRouteName="listRooms">
                <Stack.Screen name="listRooms" component={ListRoomsScreen} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="roomDetail" component={RoomDetail} options={
                    {
                        // headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="updateRoom" component={UpdateRoom} options={
                    {
                        // headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="roomInvoices" component={DrawerNavigator} options={
                    {
                        headerShown: false,
                        title: "Hóa Đơn",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="roomMember" component={RoomMember} options={
                    {
                        headerShown: false,
                        title: "Hóa Đơn",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="addRoomMember" component={AddRoomMember} options={
                    {
                        headerShown: false,
                        title: "Hóa Đơn",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />

            </Stack.Navigator>
        </RoomProvider>
    )
}

const StackSurveysNavigator =() =>{
    return(
        <Stack.Navigator initialRouteName="surveyList">
                
                <Stack.Screen name="surveyList" component={SurveyList} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="surveyDetail" component={SurveyDetail} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="createSurvey" component={CreateSurvey} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="surveyResponses" component={SurveyResponses} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                
              
            </Stack.Navigator>
    );
}

const StackComplaintNavigator =() =>{
    return(
        <Stack.Navigator initialRouteName="complaintsList">
                
                <Stack.Screen name="complaintsList" component={ComplaintList} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="complaintDetail" component={ComplaintDetail} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                
                
              
            </Stack.Navigator>
    );
}

const StackRoomChangeRequestNavigator =() =>{
    return(
        <RoomProvider>

        <Stack.Navigator initialRouteName="requestsList">
                
                <Stack.Screen name="requestsList" component={RoomChangeRequest} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="requestDetail" component={RoomChangeDetail} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="roomMember" component={RoomMember} options={
                    {
                        headerShown: false,
                        title: "Hóa Đơn",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="addRoomMember" component={AddRoomMember} options={
                    {
                        headerShown: false,
                        title: "Hóa Đơn",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                
              
            </Stack.Navigator>
        </RoomProvider>
    );
}

const StackUserNavigater = () =>{
    return(
        <Stack.Navigator initialRouteName="userManageMainScreen">
            <Stack.Screen name="userManageMainScreen" component={UserManage} options={
                {
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),

                }
            } />
            <Stack.Screen name="register" component={RegisterScreen} options={
                {
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),

                }
            } />
            <Stack.Screen name="createNoti" component={CreateNotification} options={
                {
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),

                    }
                } />
                <Stack.Screen name="surveyStack" component={StackSurveysNavigator} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="complaintsStack" component={StackComplaintNavigator} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="roomChangeRequestStack" component={StackRoomChangeRequestNavigator} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="studentList" component={StudentList} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                <Stack.Screen name="studentDetail" component={StudentDetail} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }
                } />
                
              
            </Stack.Navigator>
    );
}

const AdminChatStack = () => {
    return (
        <Stack.Navigator initialRouteName="listChat">
            <Stack.Screen name="listChat" component={ChatListScreen} options={
                {
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),

                }
            } />
            <Stack.Screen name="pesonalChat" component={AdminChatScreen} options={
                {
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),

                }
            } />



        </Stack.Navigator>
    );
}

export function AdminHomeMain() {
    return (
        <Tab.Navigator ScreenOptions={
            {
                headerShown: false,
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
            }
        }>
            <Tab.Screen name="Các Phòng" component={StackRoomNavigater} options={
                {
                    headerShown: false,
                    tabBarIcon: getTabBarIcon('home'),

                }
            }></Tab.Screen>
            <Tab.Screen name="Sinh Viên" component={StackUserNavigater} options={
                {
                    headerShown: false,
                    tabBarIcon: getTabBarIcon('account-multiple'),

                }
            }></Tab.Screen>
            <Tab.Screen name="chat" component={AdminChatStack} options={
                {
                    headerShown: false,
                    tabBarIcon: getTabBarIcon('chat'),

                }
            }></Tab.Screen>
            <Tab.Screen name="Thống kê" component={Statistics} options={
                {
                    headerShown: false,
                    tabBarIcon: getTabBarIcon('chart-box-outline'),

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