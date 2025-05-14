import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { endpoints } from '../../../config/Apis';
import AdminStyles from '../../../styles/AdminStyles';
import { RoomContext } from './roomContext';

const RoomChangeDetail = ({ route, navigation }) => {
    const { request } = route.params;
    const { loading, fetchWithToken } = useFetchWithToken();
    const [currentRoom, setCurrentRoom] = useState({});
    const [requestedRoom, setRequestedRoom] = useState({});
    const { setSelectedRoom } = useContext(RoomContext);
    const [isHandle, setIsHandle] =useState(false);

    const loadRequestDetail = async () => {
        if(request.status.toLowerCase() !='pending') setIsHandle(true)
        try {
            const currentRoomData = await fetchWithToken({
                url: `${endpoints['rooms']}/${request.current_room}/`,
            });

            const requestedRoomData = await fetchWithToken({
                url: `${endpoints['rooms']}/${request.requested_room}/`,
            });

            if (currentRoomData) setCurrentRoom(currentRoomData);
            if (requestedRoomData) setRequestedRoom(requestedRoomData);
        } catch (error) {
            console.log('Error loading room details:', error);
        }
    };

    const handleUpdateStatus = async (status) => {
        const data = await fetchWithToken({
            url:`${endpoints['room-change-requests']}${request.id}/`,
            method:"PATCH",
            data:{status}
        })
        if(data){
            Alert.alert('Thành công', `Trạng thái đã được cập nhật thành: ${status}`);
            navigation.goBack();
        }else{
            Alert.alert('Lỗi', 'Không thể cập nhật trạng thái.');
        }
        
    };

    useEffect(() => {
        loadRequestDetail();
    }, []);

    if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

    return (
        <SafeAreaView style={[AdminStyles.container, AdminStyles.flex_1]}>
            <ScrollView contentContainerStyle={[styles.contentContainer]}>
                <View style={AdminStyles.flex_1}>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Thông Tin Yêu Cầu</Text>
                        <Text style={styles.label}>Lý do thay đổi:</Text>
                        <Text style={styles.value}>{request.reason}</Text>
                        <Text style={styles.label}>Người yêu cầu:</Text>
                        <Text style={styles.value}>{request.student?.first_name || request.student?.last_name 
              ? `${request.student?.first_name || ''} ${request.student?.last_name || ''}`.trim() 
              : request.student?.username || 'Không rõ'}</Text>
                    </View>

                    <TouchableOpacity style={styles.section} onPress={()=>{
                                setSelectedRoom(currentRoom)
                                navigation.navigate("roomMember")
                            
                            }
                        }>
                        <Text style={styles.sectionTitle}>Phòng Hiện Tại</Text>
                        <Text style={styles.value}>Số phòng: {currentRoom.room_number}</Text>
                        <Text style={styles.value}>Loại phòng: {currentRoom.room_type}</Text>
                        <Text style={styles.value}>Giường: {currentRoom.total_beds}</Text>
                        <Text style={styles.value}>Tình trạng: {currentRoom.status}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.section} onPress={()=>{
                                setSelectedRoom(requestedRoom)
                                navigation.navigate("roomMember")
                            
                            }
                        }>
                        <Text style={styles.sectionTitle}>Phòng Yêu Cầu</Text>
                        <Text style={styles.value}>Số phòng: {requestedRoom.room_number}</Text>
                        <Text style={styles.value}>Loại phòng: {requestedRoom.room_type}</Text>
                        <Text style={styles.value}>Giường: {requestedRoom.total_beds}</Text>
                        <Text style={styles.value}>Tình trạng: {requestedRoom.status}</Text>
                    </TouchableOpacity>
                    {isHandle ? <Text>Đã Giải Quyết</Text>: (<View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.button, styles.approveButton]}
                            onPress={() => handleUpdateStatus('Approved')}
                        >
                            <Text style={styles.buttonText}>Chấp nhận</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.rejectButton]}
                            onPress={() => handleUpdateStatus('Rejected')}
                        >
                            <Text style={styles.buttonText}>Từ chối</Text>
                        </TouchableOpacity>
                    </View>)
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RoomChangeDetail;

const styles = StyleSheet.create({
    contentContainer: {
        padding: 16,
    },
    section: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    value: {
        fontSize: 15,
        color: '#333',
        marginBottom: 4,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 0.48,
        padding: 15,
        borderRadius: 8,
    },
    approveButton: {
        backgroundColor: '#4CAF50',
    },
    rejectButton: {
        backgroundColor: '#F44336',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
