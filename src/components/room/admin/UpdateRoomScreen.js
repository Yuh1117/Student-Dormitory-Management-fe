import React, { useState,useEffect, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AdminStyles from '../../../styles/AdminStyles';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { endpoints } from '../../../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { RoomContext } from './roomContext';
import { SafeAreaView } from 'react-native-safe-area-context';




export default  function UpdateRoom() {
    const route = useRoute();
    const navigation = useNavigation();
    const { selectedRoom,setSelectedRoom } = useContext(RoomContext);
    // const { room,title,onRoomUpdated } = route.params;
    let room = selectedRoom;
    const { loading, fetchWithToken } = useFetchWithToken();
    const [formData, setFormData] = useState({
        room_number:room?.room_number?.toString() || '',
        total_beds: room?.total_beds?.toString() || '',
        available_beds: room?.available_beds?.toString() || '',
        // status: room?.status || '',
        floor: room?.floor?.toString() || '',
        monthly_fee: room?.monthly_fee?.toString() || '',
    });
     
    
    useEffect(() => {
            navigation.setOptions({ title: `Cập nhật phòng ${room.room_number}` });
        }, [navigation, room.room_number]);

    const handleUpdate = async () => {
        const token = await AsyncStorage.getItem("access-token");
        let url = `${endpoints["rooms"]}${room.id}/`
        const res = await fetchWithToken({
            url,
            method: "PATCH",
            data: {
                ...formData,
                total_beds: parseInt(formData.total_beds),
                floor: parseInt(formData.floor),
                monthly_fee: parseFloat(formData.monthly_fee),
            },
            headers: {
                Authorization: `Bearer ${token}`,
        }
        })

        
        if (res && res.id) {
            // if (onRoomUpdated) onRoomUpdated(res);
            setSelectedRoom(res);
            navigation.goBack(); 
        
        } else {
            alert('Cập nhật thất bại. Vui lòng kiểm tra lại.');
        }
    };

    return (
        // <SafeAreaView>
            
        <SafeAreaView style={[styles.container]}>
            <Text>Tên phòng</Text>
            <TextInput style={styles.input} value={formData.room_number} onChangeText={(text) => setFormData({ ...formData, room_number: text })} />
            
            <Text>Số giường</Text>
            <TextInput style={styles.input} value={formData.total_beds} onChangeText={(text) => setFormData({ ...formData, total_beds: text })} keyboardType="number-pad" />

            {/* <Text>Giường trống</Text> */}
            {/* <TextInput style={styles.input} value={formData.available_beds} onChangeText={(text) => setFormData({ ...formData, available_beds: text })} keyboardType="number-pad" /> */}

            <Text>Tầng</Text>
            <TextInput style={styles.input} value={formData.floor} onChangeText={(text) => setFormData({ ...formData, floor: text })} keyboardType="number-pad" />

            {/* <Text>Trạng thái</Text>
            <TextInput style={styles.input} value={formData.status} onChangeText={(text) => setFormData({ ...formData, status: text })} /> */}

            <Text>Tiền phòng</Text>
            <TextInput style={styles.input} value={formData.monthly_fee} onChangeText={(text) => setFormData({ ...formData, monthly_fee: text })} keyboardType="decimal-pad" />

            {loading ? <ActivityIndicator/>:
            <TouchableOpacity onPress={handleUpdate} style={[styles.button, AdminStyles.successColor,]}>
                        <Text >Cập nhật</Text>
                      </TouchableOpacity>}
        </SafeAreaView>
        // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex:1,backgroundColor:"#fff" },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
    button: {
    backgroundColor: '#aed1fc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },
});
