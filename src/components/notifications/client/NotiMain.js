import { FlatList, View } from 'react-native';
import { ActivityIndicator, Avatar, Divider, List, SegmentedButtons, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AccountStyles from '../../auth/AccountStyles';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../../config/Apis';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { useTranslation } from 'react-i18next';
import NotiDetail from './NotiDetail';

dayjs.extend(relativeTime);

const NotiMain = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedNoti, setSelectedNoti] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dayjs.locale(i18n.language)
  }, [i18n.language])

  const loadNotis = async () => {
    if (page > 0) {
      try {
        setLoading(true);

        const token = await AsyncStorage.getItem("access-token");
        let url = `${endpoints['notifications']}?page=${page}`;

        if (selectedType !== 'All') {
          url += `&q=${selectedType}`
        }

        console.log(url)

        const res = await authApis(token).get(url);
        setNotifications([...notifications, ...res.data.results]);

        if (res.data.next === null) {
          setPage(0);
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setLoading(false);
      }
    }
  };

  const loadMore = () => {
    if (!loading && page > 0) {
      setPage(page + 1);
    }
  };

  const onRefresh = () => {
    try {
      setRefreshing(true);

      setNotifications([])
      setPage(0);
      setTimeout(() => setPage(1), 0);

    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSelectedTypeChange = (value) => {
    setSelectedType(value)
    setNotifications([]);
    setPage(0);
    setTimeout(() => setPage(1), 0);
  }

  useEffect(() => {
    loadNotis();
  }, [page]);

  return (
    <SafeAreaView style={[AccountStyles.container, { justifyContent: '' }]}>
      <Text style={AccountStyles.headerTitle}>{t('notifications.title')}</Text>

      <SegmentedButtons
        value={selectedType}
        onValueChange={(value) => handleSelectedTypeChange(value)}
        buttons={[
          { value: 'All', label: t('notifications.types.all') },
          { value: 'Maintenance', label: t('notifications.types.Maintenance') },
          { value: 'Billing', label: t('notifications.types.Billing') }
        ]}
        style={{ margin: 7, marginBottom: 0 }}
      />

      {loading && notifications.length === 0 ? (
        <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={40} />
        </View>
      ) : notifications.length > 0 ? (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListFooterComponent={loading && <ActivityIndicator size={30} />}
          onEndReached={loadMore}
          style={{ margin: 7, padding: 5 }}
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
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
              {index < notifications.length - 1 && <Divider />}
            </>
          )}
        />
      ) : (
        <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Text>{t('notifications.no_notifications')}</Text>
        </View>
      )}

      <NotiDetail
        visible={showDetail}
        onClose={() => setShowDetail(false)}
        notification={selectedNoti}
      />
    </SafeAreaView>
  );
};

export default NotiMain