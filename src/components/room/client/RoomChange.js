import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import BuildingSelector from './BuildingSelector';
import AccountStyles from '../../auth/AccountStyles';
import { authApis, endpoints } from '../../../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoomChange = () => {
    const [selectedBuilding, setSelectedBuilding] = useState("East Wing")
    const [floors, setFloors] = useState([])
    const [buildings, setBuildings] = useState([])
    const [selectedFloor, setSelectedFloor] = useState(1)
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState([])
    const [page, setPage] = useState(1)

    const loadRooms = async () => {
        try {
            setLoading(true);

            const token = await AsyncStorage.getItem("access-token");
            const url = `${endpoints["rooms"]}?page=${page}`;

            console.info(url)

            const res = await authApis(token).get(url);

            setRooms(res.data.results)

        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
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
        <TouchableOpacity
            style={[styles.roomBox, item.status === "Empty" && styles.availableRoom]}
        >
            <Text style={[styles.roomText, { color: item.status === "Empty" ? 'white' : 'dark' }]}>
                {item.room_number}
            </Text>
            <Text style={[styles.roomText, { color: item.status === "Empty" ? 'white' : 'dark' }]}>
                Loại: {item.room_type}
            </Text>
            <Text style={[styles.roomText, { color: item.status === "Empty" ? 'white' : 'dark' }]}>
                Giá: {item.monthly_fee} VND
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
            <Text style={styles.header}>Chọn phòng muốn đổi</Text>

            <View style={{ padding: 7, flex: 1 }}>
                <BuildingSelector buildings={buildings.map(building => ({
                    label: building.building_name,
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
                                Tầng {floor}
                            </Button>
                        ))}
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color="#376be3" />
                    ) : (
                        <FlatList
                            data={filteredRooms}
                            keyExtractor={item => item.id.toString()}
                            renderItem={renderRoom}
                            scrollEnabled={true}
                            contentContainerStyle={styles.roomGrid}
                        />
                    )}
                </View>
            </View>
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
    },
    floorList: {
        marginRight: 10,
    },
    floorButton: {
        marginVertical: 5,
        borderRadius: 8,
    },
    roomGrid: {
        flex: 1,
        justifyContent: 'flex-start',
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