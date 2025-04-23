import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { RoomContext } from "./roomContext";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';
import useFetchWithToken from "../../../config/UseFetchWithToken";
import { endpoints } from "../../../config/Apis";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function AddRoomMember() {
    const { selectedRoom,setSelectedRoom } = useContext(RoomContext);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [bedNumber, setBedNumber] = useState("");
    const [open, setOpen] = useState(false);
    const {loading,fetchWithToken} = useFetchWithToken();
    const navigation = useNavigation();


    const loadAvailableStudent = async () => {
        const data = await fetchWithToken({
            method: 'GET',
            url: `${endpoints['available-student']}`
        })
        setStudents(data)
    }
    useEffect(() => {
        // Gọi API lấy danh sách sinh viên chưa có phòng
        loadAvailableStudent()
    }, []);

    const  handleAdd = async () => {
        if (!selectedStudent || !bedNumber) {
            Alert.alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        const data = await fetchWithToken({
            method: 'POST',
            url: `${endpoints['rooms']}/${selectedRoom.id}/register-member/`,
            data : {
                student_id: selectedStudent,
                room: selectedRoom.id,
                bed_number: parseInt(bedNumber)
            }
        })

        const updatedRoom = await fetchWithToken({
            method: 'GET',
            url: `${endpoints['rooms']}/${selectedRoom.id}/`
        });
        if(updatedRoom.available_beds !== selectedRoom.available_beds){

            setSelectedRoom(updatedRoom);  // Cập nhật selectedRoom sau khi thành công
    
            Alert.alert("Đăng kí thành công", "", [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.goBack();  // Quay lại màn hình trước khi điều hướng
                    }
                }
            ]);
        }
        
    };

    return (
        <SafeAreaView>

        <View style={{ padding: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18,marginBottom: 10 }}>Thêm thành viên vào phòng {selectedRoom?.room_number}</Text>

            
            <DropDownPicker
                placeholder="Chọn sinh viên"
                open={open}
                setOpen={setOpen}
                items={students.map(s => ({ label: s.username, value: s.id }))}
                setValue={setSelectedStudent}
                value={selectedStudent}
                style={{ marginBottom: open ? 50 : 10 }}
            />
            {/* <SafeAreaView> */}

            <Text>Số giường:</Text>
            <TextInput
                value={bedNumber}
                onChangeText={setBedNumber}
                keyboardType="number-pad"
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            {/* </SafeAreaView> */}

            <Button title="Thêm vào phòng" onPress={handleAdd} />
        </View>
        </SafeAreaView>
    );
}