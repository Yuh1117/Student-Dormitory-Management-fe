import LoginScreen from '../../components/auth/Login';
import { UserHomeMain } from './UserNavigator';
import { AdminHomeMain } from './AdminNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChangPasswordScreen from '../../components/auth/ChangePasswordScreen';
import MyUserReducer from "../../reducers/MyUserReducer";
import MyRoomReducer from "../../reducers/MyRoomReducer";
import { useReducer } from 'react';
import { MyDispatchContext, MyRoomContext, MyRoomDispatchContext, MyUserContext } from '../../config/MyContexts';

const Stack = createStackNavigator();

export default function LoginNavigator() {
  const [user, dispatch] = useReducer(MyUserReducer, null)
  const [room, roomDispatch] = useReducer(MyRoomReducer, null)

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
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
    </MyUserContext.Provider>
  );
}