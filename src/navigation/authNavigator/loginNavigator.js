import { StyleSheet } from 'react-native';
import LoginScreen from '../../components/auth/Login';
import { UserHomeMain } from './UserNavigator';
import { AdminHomeMain } from './adminNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChangPasswordScreen from '../../components/auth/changePasswordScreen';
import MyUserReducer from "../../reducers/MyUserReducer";
import { useReducer } from 'react';
import { MyDispatchContext, MyUserContext } from '../../config/MyContexts';

const Stack = createStackNavigator();

export default function LoginNavigator() {
  const [user, dispatch] = useReducer(MyUserReducer, null)

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
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
              name="UserHome"
              component={UserHomeMain}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});