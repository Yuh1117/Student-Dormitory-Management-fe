import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuItem from '../../auth/MenuItem';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AccountStyles from '../../auth/AccountStyles';
import { useNavigation } from '@react-navigation/native';
import PricingList from './PricingList';


const UserHome = () => {
  const nav = useNavigation()

  return (
    <SafeAreaView style={AccountStyles.container}>
      <Text style={AccountStyles.headerTitle}>Trang chủ</Text>

      <ScrollView>
        <View style={styles.grid}>

          <View style={{ width: '50%' }}>
            <MenuItem
              icon={<Feather name="home" size={22} color="#333" />}
              title="Phòng"
              onPress={() => nav.navigate("RoomDetails")}
            />
          </View>
          <View style={{ width: '50%' }}>
            <MenuItem
              icon={<MaterialIcons name="swap-horiz" size={22} color="#333" />}
              title="Đổi phòng"
              onPress={() => nav.navigate('RoomChange')}
            />
          </View>

          <View style={{ width: '50%' }}>
            <MenuItem
              icon={<MaterialIcons name="receipt-long" size={22} color="#333" />}
              title="Hóa đơn"
              onPress={() => nav.navigate("RoomInvoice")}
            />
          </View>

          <View style={{ width: '50%' }}>

            <MenuItem
              icon={<Ionicons name="megaphone-outline" size={22} color="#333" />}
              title="Hỗ trợ"
              onPress={() => nav.navigate("Support")}
            />
          </View>

          <View style={{ width: '50%' }}>
            <MenuItem
              icon={<Feather name="clipboard" size={22} color="#333" />}
              title="Khảo sát"
              onPress={() => nav.navigate("Survey")}
            />
          </View>

        </View>

        <PricingList />

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default UserHome;