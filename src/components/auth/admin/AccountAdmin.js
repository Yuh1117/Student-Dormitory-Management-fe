import { View, ScrollView } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Text } from 'react-native-paper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AccountStyles from './../AccountStyles';
import { useContext } from 'react';
import { MyDispatchContext, MyUserContext } from '../../../config/MyContexts';
import MenuItem from '../MenuItem';

const AccountAdmin = () => {
    const nav = useNavigation()
    const dispatch = useContext(MyDispatchContext)


    const logout = () => {
        dispatch({
            "type": "logout"
        });

        nav.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
            })
        )
    }

    return (
        <SafeAreaView style={[AccountStyles.container, { padding: 12 }]}>
            <Text style={AccountStyles.headerTitle}>Tài khoản</Text>

            <ScrollView>
                <MenuItem
                    icon={<Feather name="log-out" size={22} color="#FF3B30" />}
                    title="Đăng xuất"
                    titleColor="#FF3B30"
                    onPress={logout}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccountAdmin;