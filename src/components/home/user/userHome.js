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
import { useTranslation } from 'react-i18next';
import { capitalizeFirstWord } from '../../../utils/utils';


const UserHome = () => {
  const nav = useNavigation()
  const { t } = useTranslation()

  return (
    <SafeAreaView style={AccountStyles.container}>
      <Text style={AccountStyles.headerTitle}>{t('home')}</Text>

      <ScrollView>
        <View style={styles.grid}>

          <View style={styles.gridItem}>
            <MenuItem
              icon={<Feather name="home" size={22} color="#333" />}
              title={t('room')}
              onPress={() => nav.navigate("RoomDetails")}
            />
          </View>
          <View style={styles.gridItem}>
            <MenuItem
              icon={<MaterialIcons name="swap-horiz" size={22} color="#333" />}
              title={t('roomChange.title')}
              onPress={() => nav.navigate('RoomChange')}
            />
          </View>

          <View style={styles.gridItem}>
            <MenuItem
              icon={<MaterialIcons name="receipt-long" size={22} color="#333" />}
              title={t('invoice')}
              onPress={() => nav.navigate("RoomInvoice")}
            />
          </View>

          <View style={styles.gridItem}>

            <MenuItem
              icon={<Ionicons name="megaphone-outline" size={22} color="#333" />}
              title={capitalizeFirstWord(`${t('send')} ${t('support.title')}`)}
              onPress={() => nav.navigate("Support")}
            />
          </View>

          <View style={styles.gridItem}>
            <MenuItem
              icon={<Feather name="clipboard" size={22} color="#333" />}
              title={t('survey.title')}
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
  gridItem: {
    width: '50%'
  },
});

export default UserHome;