import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from 'react-native-paper';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { endpoints } from '../../../config/Apis';
import { useFocusEffect } from '@react-navigation/native';
import AdminStyles from '../../../styles/AdminStyles'

const RoomChangeRequest = ({ navigation }) => {
  const { loading, fetchWithToken } = useFetchWithToken();
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);

  const loadRequests = async () => {
    if (page > 0) {
      const data = await fetchWithToken({
        url: endpoints['room-change-requests'],
      });
      if (data?.results) {
        setRequests([...requests, ...data.results]);
      }
      if (data.next === null) setPage(0);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [page]);

  useFocusEffect(
    useCallback(() => {
      loadRequests();
    }, [])
  );

  const loadMore = () => {
    if (!loading && requests.length > 0 && page > 0) setPage(page + 1);
  };

  const renderItem = ({ item }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'pending':
          return '#FFA500';
        case 'approved':
          return '#34C759';
        case 'rejected':
          return '#FF3B30';
        default:
          return '#999999';
      }
    };
    const getStatusName = (status) => {
      switch (status.toLowerCase()) {
        case 'pending':
          return 'Đang chờ';
        case 'approved':
          return 'Chấp nhận';
        case 'rejected':
          return 'Từ chối';
        default:
          return '#999999';
      }
    };

    return (
      <TouchableOpacity
        style={[styles.itemContainer,AdminStyles.invoiceCard,AdminStyles.mb]}
        onPress={() => navigation.navigate('requestDetail', { request: item })}
      >
        <View style={[styles.statusContainer,{backgroundColor: getStatusColor(item.status)},AdminStyles.flex_025,AdminStyles.center]}>
          <View style={[{backgroundColor: getStatusColor(item.status)},AdminStyles.flex_1,AdminStyles.center]}>
            <Badge
            size={24}
            style={{ backgroundColor: getStatusColor(item.status) }}
          >
            {getStatusName(item.status)}
          </Badge>
          </View>
          
        </View>
        <View style={{ flex: 0.75 }}>
          <Text numberOfLines={1} style={styles.title}>Lý do: {item.reason}</Text>
          <Text style={styles.subtitle}>Người yêu cầu: {item.student?.first_name || item.student?.last_name 
              ? `${item.student?.first_name || ''} ${item.student?.last_name || ''}`.trim() 
              : item.student?.username || 'Không rõ'}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="#999" />
      </TouchableOpacity>
    );
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <SafeAreaView style={[styles.container,AdminStyles.container]}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Không có yêu cầu thay đổi phòng.</Text>
        )}
        onEndReached={loadMore}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
    </SafeAreaView>
  );
};

export default RoomChangeRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  statusContainer: {
    padding:10,
    marginRight:5,
    borderRadius:6
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 16,
  },
});

