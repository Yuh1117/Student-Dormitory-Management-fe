import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import BuildingSelector from './BuildingSelector';
import AccountStyles from '../../auth/AccountStyles';
import { authApis, endpoints } from '../../../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyRoomContext } from '../../../config/MyContexts';
import RoomChangeRequest from './RoomChangeRequest';
import { useTranslation } from 'react-i18next';

const RoomChange = () => {
    const [selectedBuilding, setSelectedBuilding] = useState("East Wing")
    const [floors, setFloors] = useState([])
    const [buildings, setBuildings] = useState([])
    const [selectedFloor, setSelectedFloor] = useState(1)
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState([])
    const [page, setPage] = useState(1)
    const room = useContext(MyRoomContext)
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const { t } = useTranslation()

    const loadRooms = async () => {
        if (page > 0) {
            try {
                setLoading(true);

                const token = await AsyncStorage.getItem("access-token");
                const url = `${endpoints["rooms"]}?page=${page}`;

                console.info(url)

                const res = await authApis(token).get(url);

                setRooms([...rooms, ...res.data.results])

                if (res.data.next === null) {
                    setPage(0)
                }

            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    }

    const loadBuildings = async () => {
        try {
            setLoading(true);

            const token = await AsyncStorage.getItem("access-token");
            const res = await authApis(token).get(endpoints["buildings"])

            setBuildings(res.data)

        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    const filteredRooms = rooms.filter(
        room => room.floor === selectedFloor && room.building.building_name === selectedBuilding
    )

    const renderRoom = ({ item }) => (
        <TouchableOpacity disabled={item.status === "Full" || item.room_number === room?._j?.room_number}
            style={[styles.roomBox, item.status === "Empty" && styles.availableRoom]}
            onPress={() => {
                setSelectedRoom(item);
                setShowRequestModal(true);
            }}
        >
            <Text style={[styles.roomText, { color: item.status === "Empty" ? 'white' : 'dark' }]}>
                {item.room_number}
            </Text>

            {item.room_number === room?._j?.room_number &&
                <Text style={[styles.roomText, { color: item.status === "Empty" ? 'white' : 'dark', fontWeight: '900' }]}>
                    ({t('roomChange.current_room')})
                </Text>
            }

            <Text style={[styles.roomText, { color: item.status === "Empty" ? 'white' : 'dark' }]}>
                {t('roomDetails.room_type')}: {item.room_type}
            </Text>
            <Text style={[styles.roomText, { color: item.status === "Empty" ? 'white' : 'dark' }]}>
                {t('roomChange.monthly_fee')}: {item.monthly_fee} VND
            </Text>
        </TouchableOpacity>
    );

    const loadMore = () => {
        if (!loading && page > 0) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        loadRooms();
    }, [page]);

    useEffect(() => {
        loadBuildings()
    }, [])

    useEffect(() => {
        if (buildings.length === 0) return;

        const selectedBuildingData = buildings.find(building => building.building_name === selectedBuilding);
        if (selectedBuildingData) {
            const totalFloors = selectedBuildingData.total_floors;
            setFloors(Array.from({ length: totalFloors }, (_, index) => index + 1))
        }
    }, [selectedBuilding, buildings]);

    return (
        <View style={[AccountStyles.container, { justifyContent: '' }]}>
            <Text style={styles.header}>{t('roomChange.room_selector')}</Text>

            <View style={{ padding: 7, flex: 1 }}>
                <BuildingSelector buildings={buildings.map(building => ({
                    label: `${t('roomDetails.building')} ${building.building_name}`,
                    value: building.building_name,
                }))}
                    onSelect={(value) => setSelectedBuilding(value)}
                />

                <View style={styles.floorRow}>
                    <View style={styles.floorList}>
                        {floors.map(floor => (
                            <Button
                                key={floor}
                                mode={selectedFloor === floor ? 'contained' : 'outlined'}
                                onPress={() => setSelectedFloor(floor)}
                                style={styles.floorButton}
                            >
                                {t('roomDetails.floor')} {floor}
                            </Button>
                        ))}
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color="#376be3" />
                    ) : (
                        <FlatList
                            onEndReached={loadMore}
                            data={filteredRooms}
                            keyExtractor={item => item.id.toString()}
                            renderItem={renderRoom}
                            scrollEnabled={true}
                        />
                    )}
                </View>
            </View>

            <RoomChangeRequest
                visible={showRequestModal}
                onClose={() => setShowRequestModal(false)}
                room={selectedRoom}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    floorRow: {
        flexDirection: 'row',
        flex: 1
    },
    floorList: {
        marginRight: 10,
    },
    floorButton: {
        marginVertical: 5,
        borderRadius: 8,
    },
    roomBox: {
        backgroundColor: '#cccc',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        margin: 5,
    },
    availableRoom: {
        backgroundColor: '#4CAF50',
    },
    roomText: {
        fontWeight: 'bold',
    },
});

export default RoomChange;