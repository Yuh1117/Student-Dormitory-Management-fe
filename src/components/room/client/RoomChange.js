import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import BuildingSelector from './BuildingSelector';
import AccountStyles from '../../auth/AccountStyles';

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
    const [loading, setLoading] = useState(false)


    const filteredRooms = allRooms.filter(
        room => room.floor === selectedFloor && room.building === selectedBuilding
    );

    const renderRoom = ({ item }) => (
        <TouchableOpacity style={[styles.roomBox, item.available && styles.availableRoom]}>
            <Text style={[styles.roomText, { color: item.available ? 'white' : 'dark' }]}>{item.number}</Text>
            <Text style={[styles.roomText, { color: item.available ? 'white' : 'dark' }]}>Loại: {item.type}</Text>
        </TouchableOpacity>
    );

    const handleSubmit = () => {

    }

    return (
        <View style={[AccountStyles.container, { justifyContent: '' }]}>
            <Text style={styles.header}>Chọn phòng muốn đổi</Text>

            <View style={{ padding: 7, flex: 1 }}>
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

                <View>
                    <Text style={styles.header}>Lý do đổi phòng</Text>

                    <TextInput
                        label="Lý do"
                        mode="outlined"
                        style={[AccountStyles.input, { padding: 0, borderWidth: 0, height: 150, backgroundColor: 'white' }]}
                        multiline
                        numberOfLines={4}
                        theme={{
                            roundness: 8,
                        }}
                    />
                </View>
            </View>

            <TouchableOpacity style={[AccountStyles.button, { backgroundColor: '#376be3', margin: 7 }]} disabled={loading}
                onPress={handleSubmit}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={AccountStyles.buttonText}>Gửi</Text>}
            </TouchableOpacity>
        </View>
    );
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