import React, { useState,useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AdminStyles from '../../../styles/AdminStyles';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { endpoints } from '../../../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';



export default  function UpdateRoom() {
    const route = useRoute();
    const navigation = useNavigation();
    const { room,title,onRoomUpdated } = route.params;
    const { loading, fetchWithToken } = useFetchWithToken();
    const [formData, setFormData] = useState({
        room_number:room?.room_number?.toString() || '',
        total_beds: room?.total_beds?.toString() || '',
        available_beds: room?.available_beds?.toString() || '',
        status: room?.status || '',
        floor: room?.floor?.toString() || '',
        monthly_fee: room?.monthly_fee?.toString() || '',
    });
    
    useEffect(() => {
            navigation.setOptions({ title: title || 'UpDate' });
        }, [navigation, title]);

    const handleUpdate = async () => {
        const token = await AsyncStorage.getItem("access-token");
        let url = `${endpoints["rooms"]}/${room.id}/`
        const res = await fetchWithToken({
            url,
            method: "PATCH",
            data: {
                ...formData,
                total_beds: parseInt(formData.total_beds),
                available_beds: parseInt(formData.available_beds),
                floor: parseInt(formData.floor),
                monthly_fee: parseFloat(formData.monthly_fee),
            },
            headers: {
                Authorization: `Bearer ${token}`,
        }
        })

        
        if (res && res.id) {
            if (onRoomUpdated) onRoomUpdated(res);
            navigation.goBack(); 
        
        } else {
            alert('Cập nhật thất bại. Vui lòng kiểm tra lại.');
        }
    };

    return (
        <View style={[styles.container, AdminStyles.roomBgColor]}>
            <Text>Tên phòng</Text>
            <TextInput style={styles.input} value={formData.room_number} onChangeText={(text) => setFormData({ ...formData, room_number: text })} />
            
            <Text>Số giường</Text>
            <TextInput style={styles.input} value={formData.total_beds} onChangeText={(text) => setFormData({ ...formData, total_beds: text })} keyboardType="number-pad" />

            <Text>Giường trống</Text>
            <TextInput style={styles.input} value={formData.available_beds} onChangeText={(text) => setFormData({ ...formData, available_beds: text })} keyboardType="number-pad" />

            <Text>Tầng</Text>
            <TextInput style={styles.input} value={formData.floor} onChangeText={(text) => setFormData({ ...formData, floor: text })} keyboardType="number-pad" />

            <Text>Trạng thái</Text>
            <TextInput style={styles.input} value={formData.status} onChangeText={(text) => setFormData({ ...formData, status: text })} />

            <Text>Tiền phòng</Text>
            <TextInput style={styles.input} value={formData.monthly_fee} onChangeText={(text) => setFormData({ ...formData, monthly_fee: text })} keyboardType="decimal-pad" />

            {loading ? <ActivityIndicator/>:<Button title="Cập nhật" onPress={handleUpdate} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
});
