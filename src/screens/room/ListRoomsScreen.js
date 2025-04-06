import  { useState, useEffect } from 'react';
import {ActivityIndicator, View, StyleSheet, ScrollView } from 'react-native';
import {RoomCard } from '../../components/card/RoomCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Apis, { endpoints } from '../../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyStyles from '../../styles/MyStyles';
import BuildingsSegmentedButtons from '../../components/SegmentedButtons/BuildingsSegmentedButtons';


  
export default function ListRoomsScreen() {

  const [rooms,setRooms] = useState([])
  const [buildings,setBuilding] = useState([])
  const [loading, setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [buildindId,setBuildingId] = useState(null)
  const [roomNumber,setRoomNumber] = useState(null)


  const loadRooms = async () => {  
      try {
        //set loadinggg
        setLoading(true); 

        //lấy token
        const token = await AsyncStorage.getItem("access-token");

        const url = `${endpoints['listRooms']}?page=${page}`
        if (buildindId) {
        url = `${url}&building_id=${buildind}`
        }

        if(roomNumber){
          url = `${url}&room_number=${roomNumber}`
        }

        //gọi api
        const res = await Apis.get(url,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // console.info(res.data)
        setRooms(res.data.results)
    
        
      } catch (error) {
        console.log(error.response ? error.response.data : error);
        Alert.alert('Error', error.response?.data?.error_description || 'Error');
      }finally {
        setLoading(false); // Ẩn spinner khi xong
      }
  };

  const loadBuilding = async ()=>{
    try {
      //set loadinggg
      setLoading(true); 

      //lấy token
      const token = await AsyncStorage.getItem("access-token");

      
      //gọi api
      const res = await Apis.get(endpoints['buildings'],{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setBuilding(res.data)
  
      
    } catch (error) {
      console.log(error.response ? error.response.data : error);
      Alert.alert('Error', error.response?.data?.error_description || 'Error');
    }finally {
      setLoading(false); // Ẩn spinner khi xong
    }
  }

  useEffect(()=>{
    loadRooms();
  },[])
  useEffect(()=>{
    loadBuilding();
  },[])

  return (
    <SafeAreaView > 
      <ScrollView contentContainerStyle={[styles.container,MyStyles.pb]}>
        
      
      {loading ? <ActivityIndicator color="white" /> : <BuildingsSegmentedButtons buildings={buildings}/>}
      
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