// import { View } from "react-native";
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useEffect, useCallback, useState, useContext } from 'react';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AdminStyles from '../../../styles/AdminStyles';
import { RoomContext } from './roomContext';

export default function RoomDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  //     const { room, title } = route.params;
  // const [currentRoom, setCurrentRoom] = useState(room);
  const { selectedRoom, setSelectedRoom } = useContext(RoomContext);
  let currentRoom = selectedRoom
  useEffect(() => {
    navigation.setOptions({ title: `Phòng ${currentRoom.room_number}` });
  }, [navigation, currentRoom.room_number]);


  const InforBar = ({ name, size, color, label, value }) => {
    return (
      <TouchableOpacity>

        <View style={[styles.row, {
          backgroundColor: "white",
          borderWidth: 1
        }]}>
          <FontAwesome name={name} size={size} color={color} />
          <Text style={styles.label}> {label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={[styles.scrollContainer]}>
        <View style={[styles.infoBlock, AdminStyles.mb]}>

          <InforBar name="home" size={24} color="black" label="Số phòng" value={currentRoom.room_number} />
          <InforBar name="bed" size={24} color="black" label="Số giường" value={currentRoom.total_beds} />
          <InforBar name="home" size={24} color="black" label="Tầng" value={currentRoom.floor} />
          <InforBar name="bed" size={24} color="black" label="Còn trống" value={currentRoom.available_beds} />
          <InforBar name="money" size={24} color="black" label="Tiền phòng" value={currentRoom.monthly_fee} />


          <TouchableOpacity onPress={() => navigation.navigate("updateRoom")} style={[styles.button, AdminStyles.successColor,]}>
            <Text style={styles.buttonText}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
        

          <View style={[AdminStyles.flex_1, AdminStyles.row]}>

            <View style={[AdminStyles.flex_05,AdminStyles.ml,AdminStyles.mr]}>
              <TouchableOpacity onPress={() => navigation.navigate("roomInvoices")} style={[styles.button, AdminStyles.successColor,]}>
                <Text>Hóa Đơn</Text>
              </TouchableOpacity>
            </View>
            <View style={[AdminStyles.flex_05,AdminStyles.ml,AdminStyles.mr]}>
              <TouchableOpacity onPress={() => navigation.navigate("roomMember")} style={[styles.button, AdminStyles.successColor,]}>
                <Text>Thành viên</Text>
              </TouchableOpacity>
            </View>
          </View>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  infoBlock: {
    // backgroundColor:"#3A59D1",
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
    // marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    marginVertical: 6,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  value: {
    fontWeight: 'bold',
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: "#4F959D",
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#aed1fc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    // justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontWeight: '600',
    color: '#000',
  },
});