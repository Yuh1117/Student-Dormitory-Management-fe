import LoginScreen from '../../components/auth/Login';
import { UserHomeMain } from './UserNavigator';
import { AdminHomeMain } from './AdminNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChangPasswordScreen from '../../components/auth/ChangePasswordScreen';
import MyUserReducer from "../../reducers/MyUserReducer";
import MyRoomReducer from "../../reducers/MyRoomReducer";
import { useEffect, useReducer, useState } from 'react';
import { MyDispatchContext, MyRoomContext, MyRoomDispatchContext, MyUserContext } from '../../config/MyContexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Stack = createStackNavigator();

export default function LoginNavigator() {
  const [user, dispatch] = useReducer(MyUserReducer, null)
  const [room, roomDispatch] = useReducer(MyRoomReducer, null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');

        if (savedUser) {
          dispatch({ type: 'login', payload: JSON.parse(savedUser) });
        }
      } catch (e) {
        console.error('Failed to load user from storage:', e);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser()
  }, []);

  if (isLoading) return <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size={40} />
  </View>;

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={
            user?._j
              ? user._j.is_staff
                ? "AdminHome"
                : user._j.is_first_access
                  ? "Login"
                  : "UserHome"
              : "Login"
          }>
            <Stack.Screen
              name="UserHome"
              options={{ headerShown: false }}
            >
              {() => (
                <MyRoomContext.Provider value={room}>
                  <MyRoomDispatchContext.Provider value={roomDispatch}>
                    <UserHomeMain />
                  </MyRoomDispatchContext.Provider>
                </MyRoomContext.Provider>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChangePass"
              component={ChangPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AdminHome"
              component={AdminHomeMain}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider >
  );
}