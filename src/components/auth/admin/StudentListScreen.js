import { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import { ActivityIndicator, Avatar, Card, Drawer, Searchbar } from 'react-native-paper'
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetchWithToken from "../../../config/UseFetchWithToken";
import AdminStyles from "../../../styles/AdminStyles";
import { endpoints } from "../../../config/Apis";



const StudentList = () => {
    // const { selectedRoom, setSelectedRoom, setSelectedInvoice } = useContext(RoomContext)
    const { loading, fetchWithToken } = useFetchWithToken();
    const [page, setPage] = useState(1);
    const [studentList, setStudentList] = useState([]);
    const navigation = useNavigation();
    const [q, setQ] = useState();

    const loadStudents = async () => {
        if (page > 0) {
          let url = `${endpoints['users']}?page=${page}`;
          if(q){
            url = `${url}&name=${q}`;
          }
          const data = await fetchWithToken({
              url: url,
              method: "GET"
          })
          if (data?.results) setStudentList([...studentList, ...data.results]);
          if (data.next === null) setPage(0);
        }

    };
    // useEffect(() => {
    //     loadStudents()
    // }, [page])
    useEffect(() => {
        let timer = setTimeout(() => {
            loadStudents();
        }, 500);

        return () => clearTimeout(timer);
    }, [q, page]);
    
    const search = (value, callback) => {
        setPage(1);
        setStudentList([]);
        callback(value);
    }

    const loadMore = () => {
        if (!loading && studentList.length > 0 && page > 0)
            setPage(page + 1)
    }
    const handleRemoveMember = async (item) => {
        try {
          const student = item;
          const confirm = await new Promise((resolve) => {
            Alert.alert(
              "Xác nhận",
              `Bạn có chắc muốn xóa ${student.first_name} ${student.last_name} không?`,
              [
                { text: "Hủy", style: "cancel", onPress: () => resolve(false) },
                { text: "Xóa", style: "destructive", onPress: () => resolve(true) },
              ]
            );
          });
    
          if (!confirm) return;
          
          const deactivate = await fetchWithToken({
            method: "PATCH", 
            url: `${endpoints['deactivate-student'](student.id)}`
          });
          setStudentList([])
          setPage(1)
          
          if (deactivate) {
            Alert.alert("Đã xóa sinh viên");
          } else {
            Alert.alert("Không có thay đổi", "Không thể xóa sinh viên.");
          }
        } catch (error) {
          console.log(error.response?.data || error);
          Alert.alert("Lỗi", error.response?.data?.error || "Xóa thất bại");
        }
      };
    
    

    const renderMember = ({ item }) => {
        const student = item;
        return (
            <TouchableOpacity
                onPress={()=>navigation.navigate("studentDetail",{student:student})}
             style={[styles.memberItem, AdminStyles.row, AdminStyles.invoiceCard, AdminStyles.center]}>
                <View style={AdminStyles.flex_025}>
                    <View style={styles.avatar}>
                        <TouchableOpacity>
                            <Avatar.Image
                                size={100}
                                style={{ resizeMode: 'cover' }}
                                source={student.avatar?.uri ? { uri: student.avatar.uri } : student.avatar ? { uri: student.avatar } : require('../../../assets/batman.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={AdminStyles.flex_05}>

                    <Text style={styles.memberName}>
                        {student?.first_name} {student?.last_name || student?.username}
                    </Text>
                    <Text style={styles.memberInfo}>MSSV: {student?.student_code}</Text>
                    <Text style={styles.memberInfo}>Trường: {item.university}</Text>
                </View>
                <View style={[styles.deleteButton, AdminStyles.flex_025]}>

                    <TouchableOpacity
                        onPress={() => handleRemoveMember(item)}
                        style={[styles.button]}
                    >
                        <Text style={styles.buttonText}>x</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (

        <SafeAreaView style={[AdminStyles.container, { flex: 1 }]}>
            <View style={{ flex: 1 }}>
              <View style={[AdminStyles.center,AdminStyles.mb]}>

                <Text style={styles.header}>Danh sách sinh viên</Text>
              </View>
              <View style={[AdminStyles.mb]}>
                <Searchbar style={{backgroundColor: '#f0f0f0', }}  placeholder="Tìm sinh viên..." onChangeText={t => search(t, setQ)} value={q} />
              </View>
                <FlatList
                    data={studentList}
                    renderItem={renderMember}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={loadMore}
                    ListFooterComponent={loading&& <ActivityIndicator />}
                    ListEmptyComponent={!loading && <View style={AdminStyles.row_center_start}><Text>không có sinh viên</Text></View>}
                />


            </View>
        </SafeAreaView>

    );
}
export default StudentList
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
    backgroundColor:"#FFF4EA"
  },
  memberName: {
    fontWeight: 'bold',
  },
  memberInfo: {
    fontSize: 14,
  },
  button: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#EF5A6F",
    paddingHorizontal:15,
    paddingVertical:10,
    borderWidth:0.5
  },
  deleteButton :{
    alignItems:"center",
    justifyContent:"center",
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    
  },
  avatar:{
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    overflow: 'hidden',
    borderRadius: 60,
  }
})