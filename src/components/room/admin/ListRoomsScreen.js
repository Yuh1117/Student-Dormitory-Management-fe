
import { useState, useEffect, useCallback, useContext } from 'react';
import { ActivityIndicator, View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { RoomCard } from '../../../components/card/RoomCard';

import { SafeAreaView } from 'react-native-safe-area-context';
import Apis, { endpoints } from '../../../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyStyles from '../../../styles/MyStyles';
import BuildingsSegmentedButtons from '../../../components/SegmentedButtons/BuildingsSegmentedButtons';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AdminStyles from '../../../styles/AdminStyles';
import { RoomContext } from './roomContext';





export default function ListRoomsScreen() {
  const navigation = useNavigation();
  const { loading, fetchWithToken } = useFetchWithToken();
  const [rooms, setRooms] = useState([]);
  const [buildings, setBuilding] = useState([]);
  const [page, setPage] = useState(1);
  const [buildindId, setBuildingId] = useState(null);
  const [roomNumber, setRoomNumber] = useState(null);
  const { setSelectedRoom } = useContext(RoomContext);
  const [refreshing, setRefreshing] = useState(false);

  // hàm lấy các phòng
  const loadRooms = async (isRefreshing = false) => {
    const token = await AsyncStorage.getItem('access-token');
    let url = `${endpoints['listRooms']}?page=${isRefreshing ? 1 : page}`;

    if (buildindId) {
      url = `${url}&building_id=${parseInt(buildindId)}`;
    }
    if (roomNumber) {
      url = `${url}&room_number=${roomNumber}`;
    }
    if (isRefreshing) {
      setPage(1);
    }

    if (page > 0) {
      const data = await fetchWithToken({
        url,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data?.results) {
        setRooms(isRefreshing ? data.results : [...rooms, ...data.results]);
        if (data.next === null) setPage(0);
      }
    }
  };

  // hàm lấy id của building
  const loadBuilding = async (isRefreshing = false) => {
    //lấy token
    const token = await AsyncStorage.getItem("access-token");
    //lấy url
    const url = endpoints['buildings']
    //gọi api
    const data = await fetchWithToken(
      {
        url,
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    if (data) setBuilding(data);
    setBuildingId(data[0].id) // lấy mặc định là tòa đầu tiên
  }

  //hiển thị danh sách các tòa 
  useEffect(() => {
    loadBuilding();
  }, [])

  // hiển thị danh sách phòng khi có building và page thay đổi
  useEffect(() => {
    if (buildindId) {
      loadRooms();
    }
  }, [buildindId, page]);

  // hàm load thêm trang nữa
  const loadMore = () => {
    if (!loading && rooms.length > 0 && page > 0)
      setPage(page + 1)
  }

  // hàm khi thay đổi chọn tòa
  const changeBuilding = (val, callback) => {
    setPage(1)
    setRooms([])
    if(val == buildindId){
      onRefresh();
    }
    callback(val)
  }

  // khi back từ detail trở về laod lại các room
  // useFocusEffect(
  //   useCallback(() => {
  //     // Reset lại rooms, page và gọi lại loadRooms
  //     setRooms([]);
  //     setPage(1); // Triggers useEffect to reload rooms
  //     loadRooms()
  //   }, [buildindId]) // khi tòa nhà đổi thì cũng chạy lại
  // );
  const onRefresh = async () => {
    setRefreshing(true);
    await loadRooms(true);
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={[AdminStyles.bgc,AdminStyles.flex_1]}>
        <ScrollView contentContainerStyle={[MyStyles.ml, MyStyles.mr,AdminStyles.mb,AdminStyles.mt]}>
          <BuildingsSegmentedButtons buildings={buildings} value={buildindId} onValueChange={val => changeBuilding(val, setBuildingId)} buildingId={buildindId} />
        </ScrollView>
      <FlatList
  contentContainerStyle={[styles.container, MyStyles.pbFlatList]}
  data={rooms}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedRoom(item);
        navigation.navigate('roomDetail', { title: `Phòng ${item.room_number}` });
      }}
    >
      <RoomCard room={item} />
    </TouchableOpacity>
  )}
  keyExtractor={(item) => item.id.toString()}
  onEndReached={loadMore}
  ListFooterComponent={loading ? <ActivityIndicator size="large" color="#2196F3" /> : null}
  refreshControl={
    <RefreshControl
      onRefresh={onRefresh}
      colors={['#2196F3']}
      tintColor="#2196F3"
    />
  }
/>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});



