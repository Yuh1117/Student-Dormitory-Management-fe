import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import { RoomContext } from "./roomContext";
import AdminStyles from "../../../styles/AdminStyles";
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { endpoints } from "../../../config/Apis";


export default function RoomMember({ navigation ,route}) {
  const { selectedRoom,setSelectedRoom } = useContext(RoomContext);
  const{loading,fetchWithToken} = useFetchWithToken();
  const [roomAssignments,setRoomAssignments] = useState([]);
  // const tempRoom = route?.params?.tempRoom;


  // useEffect(() => {
  //   // Nếu tempRoom tồn tại thì set lại selectedRoom, nếu không thì giữ nguyên
  //   if (tempRoom) {
  //     setSelectedRoom(tempRoom);
  //   }
  // }, [tempRoom, setSelectedRoom]);
  const handleRemoveMember = async (item) => {
    try {
      const student = item.student_detail;
      const confirm = await new Promise((resolve) => {
        Alert.alert(
          "Xác nhận",
          `Bạn có chắc muốn xóa ${student.first_name} khỏi phòng không?`,
          [
            { text: "Hủy", style: "cancel", onPress: () => resolve(false) },
            { text: "Xóa", style: "destructive", onPress: () => resolve(true) },
          ]
        );
      });

      if (!confirm) return;
      
      await fetchWithToken({
        method: "PATCH", // hoặc DELETE tùy API
        url: `${endpoints['remove-member'](selectedRoom.id)}`,
        data: { 
          room: selectedRoom.id,
          student_id : item.student_detail.id,
        }, 
      });


      
      const updatedRoom = await fetchWithToken({
        method: 'GET',
        url: `${endpoints['rooms']}/${selectedRoom.id}/`
      });
      
      if (updatedRoom) {
        setSelectedRoom(updatedRoom);
        Alert.alert("Đã xóa thành viên khỏi phòng");
      } else {
        Alert.alert("Không có thay đổi", "Không thể xóa thành viên hoặc thành viên đã bị xóa trước đó.");
      }
    } catch (error) {
      console.log(error.response?.data || error);
      Alert.alert("Lỗi", error.response?.data?.error || "Xóa thất bại");
    }
  };
  const renderMember = ({ item }) => {
    const student = item.student_detail;
    return (
      <View style={[styles.memberItem, AdminStyles.roomBgColor, AdminStyles.row]}>
        <View style={{ flex: 1 }}>

          <Text style={styles.memberName}>
            {student?.first_name} {student?.last_name || student?.username}
          </Text>
          <Text style={styles.memberInfo}>MSSV: {student?.student_code}</Text>
          <Text style={styles.memberInfo}>Giường số: {item.bed_number}</Text>
          <Text style={styles.memberInfo}>Trạng thái: {item.active ? "Đang ở" : "Đã chuyển"}</Text>
        </View>
        <View>

          <TouchableOpacity
            onPress={() => handleRemoveMember(item)}
            style={[styles.button, { marginTop: 8 }]}
          >
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const loadRoomMembers = async () =>{
    const data = await fetchWithToken({
      url:endpoints['get-room-assignments'](selectedRoom.id),
      method:"GET"
    })
    if(data) {
      // console.log(data)
      setRoomAssignments(data)
      console.log("daay lad roomassignment: ",roomAssignments)
    }
  };
  useEffect(() => {
    loadRoomMembers();
  }, [selectedRoom])
  return (
    <SafeAreaView style={[AdminStyles.container, { flex: 1 }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>Danh sách thành viên phòng {selectedRoom?.room_number}</Text>

        <FlatList
          data={roomAssignments}
          renderItem={renderMember}
          keyExtractor={(item, index) => index.toString()}
        />

        <View>
          <TouchableOpacity
            disabled={selectedRoom.available_beds === 0}
            onPress={() => navigation.navigate("addRoomMember")}
            style={[styles.button, AdminStyles.successColor, selectedRoom.available_beds === 0 && { opacity: 0.5 }]}>
            <Text style={styles.buttonText}>Thêm thành viên</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  memberItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  memberName: {
    fontWeight: 'bold',
  },
  memberInfo: {
    fontSize: 14,
  },
  button: {
    // backgroundColor: '#aed1fc',
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontWeight: '600',
    color: '#000',
  },
});