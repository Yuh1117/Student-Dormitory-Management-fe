import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import AccountStyles from '../../auth/AccountStyles';
import RoommateItem from './RoommateItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../../config/Apis';
import { ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { MyRoomContext } from '../../../config/MyContexts';

const RoomDetails = () => {
    const roomData = useContext(MyRoomContext)
    const [room, setRoom] = useState(roomData._j);
    const [roommates, setRoommates] = useState([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const loadRoom = async () => {
        try {
            setLoading(true);

            const token = await AsyncStorage.getItem("access-token");
            const res = await authApis(token).get(endpoints["get-room-assignments"](room.id));

            setRoommates(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (room) {
            loadRoom();
        }
    }, []);

    return (
        <View style={[AccountStyles.container, { justifyContent: '' }]}>
            <ScrollView>
                {loading ? (
                    <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={40} />
                    </View>
                ) : room !== null ? (
                    <>
                        <View style={AccountStyles.card}>
                            <View style={styles.row}>
                                <Text style={styles.title}>
                                    {t('roomDetails.building')} {room.building.building_name} - { }
                                </Text>
                                <Text style={styles.title}>
                                    {t('roomDetails.floor')} {room.floor}
                                </Text>

                            </View>
                            
                            <Text style={styles.title}>
                                {t('roomDetails.room_number')} {room.room_number}
                            </Text>

                            <View style={styles.row}>
                                <View style={[styles.capacityBox, { backgroundColor: '#FFF3E0' }]}>
                                    <Text style={[styles.capacityText, { color: "#FF9800" }]}>
                                        {room.room_type}
                                    </Text>
                                </View>
                                <View style={styles.capacityBox}>
                                    <Text style={styles.capacityText}>
                                        {t('roomDetails.total_beds')}: {room.total_beds}
                                    </Text>
                                </View>
                                <View style={styles.availableBox}>
                                    <Text style={styles.availableText}>
                                        {t('roomDetails.available_beds', { count: room.available_beds })}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={AccountStyles.card}>
                            <Text style={styles.title}>{t('roomDetails.roommates_title')}</Text>
                            {roommates.length > 0 ? (
                                roommates.map(r => (
                                    <RoommateItem key={r.id} item={r.student_detail} />
                                ))
                            ) : (
                                <Text style={{ color: '#999' }}>
                                    {t('roomDetails.no_roommates')}
                                </Text>
                            )}
                        </View>
                    </>
                ) : (
                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{t('roomDetails.no_room')}</Text>
                    </View>
                )}
            </ScrollView>
        </View>
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
        alignItems: 'center',
    },
    capacityBox: {
        backgroundColor: '#E6EEFF',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginRight: 10,
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
    },
});

export default RoomDetails;