import { View, ScrollView } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MenuItem from './MenuItem';
import styles from './AccountStyles';
import { useContext } from 'react';
import { MyDispatchContext, MyRoomDispatchContext, MyUserContext } from '../../config/MyContexts';
import { useTranslation } from 'react-i18next';

const Account = () => {
  const nav = useNavigation()
  const user = useContext(MyUserContext)
  const dispatch = useContext(MyDispatchContext)
  const roomDispatch = useContext(MyRoomDispatchContext)
  const { t } = useTranslation()

  const logout = () => {
    dispatch({
      "type": "logout"
    });

    roomDispatch({
      "type": "logout"
    })

    nav.navigate("Login");
  }

  return (
    <SafeAreaView style={[styles.container, { padding: 12 }]}>
      <Text style={styles.headerTitle}>{t('account')}</Text>

      <ScrollView>

        <MenuItem
          onPress={() => nav.navigate('Profile')}
          icon={<Avatar.Image size={50} source={user?._j?.avatar ? { uri: user?._j?.avatar } : require('../../assets/batman.png')} />}
          title={`${user?._j?.last_name} ${user?._j?.first_name}`}
        />

        <View style={[styles.card, { paddingHorizontal: 0 }]}>
          <MenuItem custom={{ elevation: 0, paddingVertical: 7, }}
            icon={<Feather name="home" size={22} color="#333" />}
            title={t('room')}
          />
          <MenuItem custom={{ elevation: 0, paddingVertical: 10, }}
            icon={<MaterialIcons name="payment" size={24} color="black" />}
            title={t('paymentMethod')}
          />
        </View>

        <View style={[styles.card, { paddingHorizontal: 0 }]}>
          <MenuItem custom={{ elevation: 0, paddingVertical: 10 }}
            icon={<Ionicons name="headset" size={22} color="#333" />}
            title={t('support.title')}
          />
          <MenuItem custom={{ elevation: 0, paddingVertical: 10 }}
            icon={<Ionicons name="settings-outline" size={22} color="#333" />}
            title={t('settings')}
            onPress={() => nav.navigate('Settings')}
          />
          <MenuItem custom={{ elevation: 0, paddingVertical: 10 }}
            icon={<Feather name="file-text" size={22} color="#333" />}
            title={t('policy')}
          />
        </View>

        <MenuItem
          icon={<Feather name="log-out" size={22} color="#FF3B30" />}
          title={t('logout')}
          titleColor="#FF3B30"
          onPress={logout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;