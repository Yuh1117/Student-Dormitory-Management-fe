import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import AccountStyles from '../../auth/AccountStyles';
import RoommateItem from './RoommateItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../../config/Apis';
import { ActivityIndicator } from 'react-native-paper';

const RoomDetails = () => {
    const [room, setRoom] = useState(null)
    const [roommates, setRoommates] = useState([])
    const [loading, setLoading] = useState(false)

    const loadRoom = async () => {
        try {
            setLoading(true)

            const token = await AsyncStorage.getItem("access-token")
            const res = await authApis(token).get(endpoints['my-room'])

            setRoom(res.data)
            setRoommates(res.data.room_assignments)
        } catch (ex) {
            console.error(ex)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadRoom()
    }, [])

    return (
        <ScrollView contentContainerStyle={[AccountStyles.container, { justifyContent: '' }]}>
            {loading ? <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={40} />
            </View> : room !== null ?
                <>
                    <View style={AccountStyles.card}>
                        <View style={styles.row}>
                            <Text style={styles.title}>Toà {room.building} - </Text>
                            <Text style={styles.title}>Tầng {room.floor} - </Text>
                            <Text style={styles.title}>Phòng {room.room_number}</Text>
                        </View>



                        <View style={styles.row}>
                            <View style={[styles.capacityBox, { backgroundColor: '#FFF3E0' }]}>
                                <Text style={[styles.capacityText, { color: "#FF9800" }]}>{room.room_type}</Text>
                            </View>
                            <View style={styles.capacityBox}>
                                <Text style={styles.capacityText}>Số chỗ: {room.total_beds}</Text>
                            </View>
                            <View style={styles.availableBox}>
                                <Text style={styles.availableText}>Còn {room.available_beds} chỗ</Text>
                            </View>
                        </View>
                    </View>

                    <View style={AccountStyles.card}>
                        <Text style={styles.title}>Bạn cùng phòng</Text>
                        {roommates.length > 0 ? (
                            roommates.map(r => <RoommateItem key={r.id} item={r.student_detail} />))
                            : (
                                <Text style={{ color: '#999' }}>Chưa có bạn cùng phòng nào.</Text>
                            )}
                    </View>
                </> : (
                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Chưa có phòng</Text>
                    </View>
                )}
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center'
    },
    capacityBox: {
        backgroundColor: '#E6EEFF',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginRight: 10
    },
    capacityText: {
        color: '#3366CC',
        fontWeight: 'bold',
        fontSize: 14,
    },
    availableBox: {
        backgroundColor: '#E6F4EA',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    availableText: {
        color: '#2E7D32',
        fontWeight: 'bold',
        fontSize: 14,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    }
});

export default RoomDetails