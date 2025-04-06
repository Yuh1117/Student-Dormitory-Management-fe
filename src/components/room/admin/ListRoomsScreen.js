import  { useState, useEffect } from 'react';
import {ActivityIndicator, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Apis, { endpoints } from '../../../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyStyles from '../../../styles/MyStyles';
import useFetchWithToken from '../../../config/UserFetchWithToken';
import BuildingsSegmentedButtons from '../../SegmentedButtons/BuildingsSegmentedButtons';
import { RoomCard } from '../../card/RoomCard';


  
export default function ListRoomsScreen() {
  const {loading, fetchWithToken} = useFetchWithToken();
  const [rooms,setRooms] = useState([]);
  const [buildings,setBuilding] = useState([]);
  // const [loading, setLoading] = useState(true)
  const [page,setPage] = useState(1);
  const [buildindId,setBuildingId] = useState(null);
  const [roomNumber,setRoomNumber] = useState(null);


  const loadRooms = async () => {  
//  lấy token
    const token = await AsyncStorage.getItem("access-token");
    let url = `${endpoints['listRooms']}?page=${page}`
    if (buildindId) {
      console.log("vào")
      url = `${url}&building_id=${parseInt(buildindId)}`
    }
    if(roomNumber){
      url = `${url}&room_number=${roomNumber}`
    }
    console.info(url)
    //gọi api
    const data = await fetchWithToken(
      { 
        url, 
        headers : {Authorization: `Bearer ${token}`} 
      }
    );
    // console.info(url)
    if (data?.results) setRooms(data.results);
 
  };
 

  const loadBuilding = async ()=>{
    //lấy token
    const token = await AsyncStorage.getItem("access-token");
    //lấy url
    const url = endpoints['buildings']
    //gọi api
    const data = await fetchWithToken(
      { 
        url, 
        headers : {Authorization: `Bearer ${token}`} 
      }
    );
    console.info(data)
    if (data) setBuilding(data);
  }
  useEffect(()=>{
    loadBuilding();
  },[])
  useEffect(() => {
    console.log('Building ID changed:===', buildindId);
    if (buildindId !== null) {
      loadRooms();  // Gọi loadRooms mỗi khi buildindId thay đổi
    }
  }, [buildindId]);
  

  return (
    <SafeAreaView > 
      <ScrollView contentContainerStyle={[styles.container,MyStyles.pb]}>
        
        <BuildingsSegmentedButtons buildings={buildings} value={buildindId} onValueChange={setBuildingId} buildingId={buildindId}/>
        
        {loading ? <ActivityIndicator color="white" /> : rooms.map(r => <RoomCard key={r.id} room={r}/>)}
      
      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});