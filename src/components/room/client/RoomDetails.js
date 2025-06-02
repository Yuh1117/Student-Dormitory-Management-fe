import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import AccountStyles from '../../auth/AccountStyles';
import RoommateItem from './RoommateItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../../config/Apis';
import { ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { MyRoomContext, MyUserContext } from '../../../config/MyContexts';

const RoomDetails = () => {
    const roomData = useContext(MyRoomContext)
    const [room, setRoom] = useState(roomData._j);
    const [roommates, setRoommates] = useState([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const user = useContext(MyUserContext)

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
                            <Text style={roomStyles.title}>
                                {t('roomDetails.title')}
                            </Text>

                            <View style={roomStyles.row}>
                                <Text style={roomStyles.subtitle}>
                                    {t('roomDetails.building')} {room.building.building_name} | { }
                                </Text>
                                <Text style={roomStyles.subtitle}>
                                    {t('roomDetails.floor')} {room.floor} | { }
                                </Text>
                                <Text style={roomStyles.subtitle}>
                                    {t('roomDetails.room_number')} {room.room_number}
                                </Text>
                            </View>

                            <View style={[roomStyles.row, { gap: 5 }]}>
                                <View style={[roomStyles.capacityBox, { backgroundColor: '#FFF3E0' }]}>
                                    <Text style={[roomStyles.capacityText, { color: "#FF9800" }]}>
                                        {room.room_type}
                                    </Text>
                                </View>
                                <View style={roomStyles.capacityBox}>
                                    <Text style={roomStyles.capacityText}>
                                        {t('roomDetails.total_beds')}: {room.total_beds}
                                    </Text>
                                </View>
                                <View style={roomStyles.availableBox}>
                                    <Text style={roomStyles.availableText}>
                                        {t('roomDetails.available_beds', { count: room.available_beds })}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={AccountStyles.card}>
                            <Text style={roomStyles.title}>{t('roomDetails.roommates_title')}</Text>
                            {roommates.length > 0 ? (
                                roommates.map(r => (
                                    r.student_detail.id !== user?._j?.id && <RoommateItem key={r.id} item={r.student_detail} />
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

export const roomStyles = StyleSheet.create({
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
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 7
    },
});

export default RoomDetails;