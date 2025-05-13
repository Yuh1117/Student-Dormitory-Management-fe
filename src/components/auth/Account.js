import { View, ScrollView } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MenuItem from './MenuItem';
import styles from './AccountStyles';
import { useContext } from 'react';
import { MyDispatchContext, MyUserContext } from '../../config/MyContexts';

const Account = () => {
  const nav = useNavigation()
  const user = useContext(MyUserContext)
  const dispatch = useContext(MyDispatchContext)

  const logout = () => {
    dispatch({
      "type": "logout"
    });
    nav.navigate("Login");
  }

  return (
    <SafeAreaView style={[styles.container, { padding: 12 }]}>
      <Text style={styles.headerTitle}>Tài khoản</Text>

      <ScrollView>

        <MenuItem
          onPress={() => nav.navigate('Profile')}
          icon={<Avatar.Image size={50} source={user?._j?.avatar ? { uri: user?._j?.avatar } : require('../../assets/batman.png')} />}
          title={user?._j?.username}
        />

        <View style={[styles.card, { paddingHorizontal: 0 }]}>
          <MenuItem custom={{ elevation: 0, paddingVertical: 7, }}
            icon={<Feather name="home" size={22} color="#333" />}
            title="Phòng"
          />
          <MenuItem custom={{ elevation: 0, paddingVertical: 8,  }}
            icon={<MaterialIcons name="payment" size={24} color="black" />}
            title="Phương thức thanh toán"
          />
          <MenuItem custom={{ elevation: 0, paddingVertical: 8 }}
            icon={<MaterialIcons name="receipt-long" size={22} color="#333" />}
            title="Lịch sử thanh toán"
          />
        </View>

        <View style={[styles.card, { paddingHorizontal: 0 }]}>
          <MenuItem custom={{ elevation: 0, paddingVertical: 8 }}
            icon={<Ionicons name="headset" size={22} color="#333" />}
            title="Hỗ trợ"
          />
          <MenuItem custom={{ elevation: 0, paddingVertical: 8 }}
            icon={<Ionicons name="settings-outline" size={22} color="#333" />}
            title="Cài đặt"
          />
          <MenuItem custom={{ elevation: 0, paddingVertical: 8 }}
            icon={<Feather name="file-text" size={22} color="#333" />}
            title="Thời hạn & chính sách"
          />
        </View>

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

export default Account;