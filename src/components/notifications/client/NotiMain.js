import { View } from 'react-native';
import { Avatar, Divider, List, Menu, SegmentedButtons, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AccountStyles from '../../auth/AccountStyles';
import { useState } from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';


const notifications = [
  {
    id: '1',
    type: 'all',
    title: 'Chấp nhận khiếu nại',
    content: 'Đơn khiếu nại về vấn đề sửa chữa...',
    date: 'Thứ 2, 08/2',
  },
  {
    id: '2',
    type: 'electricity',
    title: 'Đóng tiền điện',
    content: 'Đã đến kỳ thanh toán hóa đơn điện...',
    date: 'Chủ nhật, 07/2',
  },
  {
    id: '3',
    type: 'water',
    title: 'Đóng tiền nước',
    content: 'Đã đến kỳ thanh toán hóa đơn nước...',
    date: 'Thứ 6, 05/2',
  },
];

const NotiMain = () => {
  const [selectedType, setSelectedType] = useState('all')

  const filtered = selectedType === 'all'
    ? notifications
    : notifications.filter(n => n.type === selectedType);

  return (
    <SafeAreaView style={AccountStyles.container}>
      <Text style={AccountStyles.headerTitle}>Thông báo</Text>

      <SegmentedButtons
        value={selectedType}
        onValueChange={setSelectedType}
        buttons={[
          { value: 'all', label: 'Tất cả' },
          { value: 'admin', label: 'Ban quản lý' },
          { value: 'support', label: 'Hỗ trợ' }
        ]}
        style={styles.m}
      />

      <FlatList
        style={styles.m}
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <>
            <List.Item
              title={item.title}
              description={item.content}
              left={props => (
                <Avatar.Icon
                  icon='message'
                />
              )}
              right={() => <Text style={{ alignSelf: 'center', fontSize: 12 }}>{item.date}</Text>}
            />
            {index < filtered.length - 1 && <Divider />}
          </>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  m: {
    margin: 7
  }
});

export default NotiMain