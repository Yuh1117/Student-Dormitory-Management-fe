import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import BuildingSelector from './BuildingSelector';

const allRooms = [
    { id: '1-1', number: '101', type: 'abc', floor: 1, building: 'A', available: false },
    { id: '1-2', number: '102', type: 'abc', floor: 1, building: 'A', available: true },
    { id: '1-3', number: '101', type: 'abc', floor: 1, building: 'A', available: false },
    { id: '1-4', number: '102', type: 'abc', floor: 1, building: 'A', available: true },
    { id: '1-5', number: '101', type: 'abc', floor: 1, building: 'A', available: false },
    { id: '1-2', number: '102', type: 'abc', floor: 1, building: 'A', available: true },

    { id: '1-3', number: '201', type: 'abc', floor: 2, building: 'A', available: false },
    { id: '1-4', number: '202', type: 'abc', floor: 2, building: 'B', available: true },
];

const floors = [...new Set(
    Object.values(allRooms)
        .flat()
        .map(room => room.floor)
)].sort((a, b) => a - b);



const RoomChange = () => {
    const [selectedBuilding, setSelectedBuilding] = useState('A');
    const [selectedFloor, setSelectedFloor] = useState(1);

    const filteredRooms = allRooms.filter(
        room => room.floor === selectedFloor && room.building === selectedBuilding
    );

    const renderRoom = ({ item }) => (
        <TouchableOpacity style={[styles.roomBox, item.available && styles.availableRoom]}>
            <Text style={[styles.roomText, { color: item.available ? 'white' : 'dark' }]}>{item.number}</Text>
            <Text style={[styles.roomText, { color: item.available ? 'white' : 'dark' }]}>Loại: {item.type}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chọn phòng muốn đổi</Text>

            <BuildingSelector onSelect={(value) => setSelectedBuilding(value)} />

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

                <FlatList
                    data={filteredRooms}
                    numColumns={3}
                    keyExtractor={item => item.id}
                    renderItem={renderRoom}
                    scrollEnabled={true}
                    contentContainerStyle={styles.roomGrid}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 17,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    roomBox: {
        backgroundColor: '#cccc',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        margin: 5,
        flex: 1,
    },
    availableRoom: {
        backgroundColor: '#4CAF50',
    },
    roomText: {
        fontWeight: 'bold',
    },
});

export default RoomChange;