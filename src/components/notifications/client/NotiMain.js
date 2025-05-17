import { View } from 'react-native';
import { ActivityIndicator, Avatar, Divider, List, SegmentedButtons, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import AccountStyles from '../../auth/AccountStyles';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../../config/Apis';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import NotiDetail from './NotiDetail';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const NotiMain = () => {
  const [selectedType, setSelectedType] = useState('all')
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [selectedNoti, setSelectedNoti] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const loadNotis = async () => {
    if (loading || page === 0) return

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("access-token");
      let url = `${endpoints['notifications']}?page=${page}`;

      const res = await authApis(token).get(url);

      setNotifications(prev => {
        const newIds = new Set(prev.map(n => n.id));
        const uniqueResults = res.data.results.filter(n => !newIds.has(n.id));
        return [...prev, ...uniqueResults];
      });

      if (res.data.next === null) {
        setPage(0)
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && page > 0) {
      setPage(page + 1)
    }
  }

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      const token = await AsyncStorage.getItem("access-token");
      const url = `${endpoints['notifications']}?page=1`;

      const res = await authApis(token).get(url);

      setNotifications(res.data.results);
      setPage(res.data.next ? 2 : 0);

    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      loadNotis()
    }, 500);

    return () => clearTimeout(timer)
  }, [page, selectedType])

  useEffect(() => {
    setPage(1);
  }, [selectedType]);


  const filtered = selectedType === 'all'
    ? notifications
    : notifications.filter(n => n.announcement_type === selectedType)

  return (
    <SafeAreaView style={[AccountStyles.container, { justifyContent: '' }]}>
      <Text style={AccountStyles.headerTitle}>Thông báo</Text>

      <SegmentedButtons
        value={selectedType}
        onValueChange={setSelectedType}
        buttons={[
          { value: 'all', label: 'Tất cả' },
          { value: 'Maintenance', label: 'Bảo trì' },
          { value: 'Billing', label: 'Hóa đơn' }
        ]}
        style={{ margin: 7, marginBottom: 0 }}
      />

      {loading && notifications.length === 0 ? (
        <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={40} />
        </View>) : notifications.length > 0 ? (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListFooterComponent={loading && <ActivityIndicator size={30} />}
            onEndReached={loadMore}
            style={{ margin: 7, padding: 5 }}
            data={filtered}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item, index }) => (
              <>
                <List.Item
                  title={item.title}
                  description={item.content}
                  left={props => (
                    <Avatar.Icon
                      icon={item.is_urgent ? 'alert-circle' : 'message'}
                      size={45}
                    />
                  )}
                  right={() => (
                    <Text style={{ alignSelf: 'center', fontSize: 12 }}>
                      {dayjs(item.created_date).fromNow()}
                    </Text>
                  )}
                  onPress={() => {
                    setSelectedNoti(item);
                    setShowDetail(true);
                  }}
                />
                {index < filtered.length - 1 && <Divider />}
              </>
            )}
          />
        )
        : (
          <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Không có thông báo nào</Text>
          </View>
        )
      }

      <NotiDetail
        visible={showDetail}
        onClose={() => setShowDetail(false)}
        notification={selectedNoti}
      />

    </SafeAreaView>
  );
}

export default NotiMain