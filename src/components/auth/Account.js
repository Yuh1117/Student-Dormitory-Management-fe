import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MenuItem from './MenuItem';
import styles from './styles';
import { useContext, useEffect, useState } from 'react';
import { UserContext, UserProvider } from './UserContext';

const Account = () => {

  return (
    <UserProvider>
      <AccountContent />
    </UserProvider>
  );
};

const AccountContent = () => {
  const nav = useNavigation()
  const {user} = useContext(UserContext)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headerTitle}>Tài khoản</Text>

        <View style={styles.card}>
          <MenuItem
            onPress={() => nav.navigate('Profile')}
            icon={<Avatar.Image size={50} source={require('../../assets/batman.png')} />}
            title={user.username}
          />
        </View>

        <View style={styles.card}>
          <MenuItem
            icon={<Feather name="home" size={22} color="#333" />}
            title="Phòng"
          />
          <MenuItem
            icon={<MaterialIcons name="payment" size={24} color="black" />}
            title="Phương thức thanh toán"
          />
          <MenuItem
            icon={<MaterialIcons name="receipt-long" size={22} color="#333" />}
            title="Lịch sử thanh toán"
          />
        </View>

        <View style={styles.card}>
          <MenuItem
            icon={<Ionicons name="headset" size={22} color="#333" />}
            title="Hỗ trợ"
          />
          <MenuItem
            icon={<Ionicons name="settings-outline" size={22} color="#333" />}
            title="Cài đặt"
          />
          <MenuItem
            icon={<Feather name="file-text" size={22} color="#333" />}
            title="Thời hạn & chính sách"
          />
        </View>

        <View style={styles.card}>
          <MenuItem
            icon={<Feather name="log-out" size={22} color="#FF3B30" />}
            title="Đăng xuất"
            titleColor="#FF3B30"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;