import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { endpoints } from '../../../config/Apis';
import AdminStyles from '../../../styles/AdminStyles';
import { useFocusEffect } from '@react-navigation/native';

const ComplaintList = ({ navigation }) => {
  const { loading, fetchWithToken } = useFetchWithToken();
  const [complaints, setComplaints] = useState([]);
  const [page,setPage] = useState(1)

  const loadComplaints = async () => {
    if(page>0){
        const data = await fetchWithToken({ 
            url: `${endpoints['complaints']}?page=${page}`
        });
        if (data?.results) {
            setComplaints([...complaints,...data.results]);
        }
        if(data.next === null) setPage(0)
    }
        
  };

  useEffect(() => {
    loadComplaints();
  }, [page]);
  useFocusEffect(
    useCallback(() => {
      setComplaints([])
      setPage(1)
      loadComplaints();
    }, [])
  );

  const loadMore = () =>{
    if(!loading && complaints.length > 0 && page>0)
    setPage(page+1)
  }
const renderItem = ({ item }) => {
    const isPending = item.status?.toLowerCase() === 'pending';
    const isResolved = item.status?.toLowerCase() === 'resolved';
  
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          AdminStyles.invoiceCard,
          isPending && styles.pendingBackground,
          isResolved && styles.resolvedBackground,
          AdminStyles.mb
        ]}
        onPress={() => navigation.navigate('complaintDetail', { complaint: item })}
      >
        <Ionicons
          name={isResolved ? "checkmark-circle-outline" : "warning-outline"}
          size={24}
          color={isResolved ? "#34C759" : "#FF3B30"}
          style={styles.icon}
        />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.title}>{item.description}</Text>
          <Text style={styles.subtitle}>
            Người gửi: {item.student?.first_name || item.student?.last_name 
              ? `${item.student?.last_name || ''} ${item.student?.first_name || ''}`.trim() 
              : item.student?.username || 'Không rõ'}
          </Text>
          <Text style={styles.subtitle}>Phòng: {item.room.room_number}</Text>
          <Text style={[styles.status, isPending && styles.pendingText, isResolved && styles.resolvedText]}>
            Trạng thái: {isPending ? "chưa giải quyết":"giải quyết"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  


  return (
    <SafeAreaView style={[AdminStyles.container, AdminStyles.flex_1]}>
      <FlatList
        data={complaints}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Không có khiếu nại nào.</Text>
        )}
        onEndReached={loadMore}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
    </SafeAreaView>
  );
};

export default ComplaintList;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  status: {
    marginTop: 2,
    color: '#007AFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 16,
  },
  pendingBackground: {
    backgroundColor: '#FFF5F5',
  },
  resolvedBackground: {
    backgroundColor: '#F0FFF4',
  },
  pendingText: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  resolvedText: {
    color: '#34C759',
    fontWeight: 'bold',
  },

});
