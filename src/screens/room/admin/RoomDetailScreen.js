// import { View } from "react-native";
import { useRoute,useNavigation,useFocusEffect } from '@react-navigation/native';
import { useEffect, useCallback, useState } from 'react';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; // hoặc 'react-native-vector-icons'
import AdminStyles from '../../../styles/AdminStyles';

export default function RoomDetail() {
    const route = useRoute();
    const navigation = useNavigation();
    const { room, title } = route.params;
const [currentRoom, setCurrentRoom] = useState(room);
    useEffect(() => {
        navigation.setOptions({ title: title || 'Chi tiết phòng' });
    }, [navigation, title]);
    

    const InforBar = ({name,size,color,label,value })=>{
      return(
        <TouchableOpacity>

          <View style={[styles.row,AdminStyles.roomBgColor]}>
            <FontAwesome name={name} size={size} color={color} />
            <Text style={styles.label}> {label}</Text>
            <Text style={styles.value}>{value }</Text>
          </View>
        </TouchableOpacity>
      );
    }
    
    return (
        <View style={styles.container}>
          
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={[styles.infoBlock]}>
              
              <InforBar name="home" size={24} color="black" label="Số phòng" value={currentRoom.room_number} />
              <InforBar name="bed" size={24} color="black" label="Số giường" value={currentRoom.total_beds} />
              <InforBar name="home" size={24} color="black" label="Tầng" value={currentRoom.floor} />
              <InforBar name="bed" size={24} color="black" label="Còn trống" value={currentRoom.available_beds} />
              <InforBar name="bed" size={24} color="black" label="Tình trạng" value={currentRoom.status} />
              <InforBar name="money" size={24} color="black" label="Tiền phòng" value={currentRoom.monthly_fee} />
    
              
            </View>
    
            <View >
              <TouchableOpacity onPress={()=>navigation.navigate("updateRoom",{room:currentRoom,
                                                                                title : `Cập nhật phòng ${currentRoom.room_number}`,
                                                                                onRoomUpdated: (updatedRoom) => {
                                                                                  setCurrentRoom(updatedRoom); //  cập nhật state tại RoomDetail
                                                                                },
                                                                              }
                )} style={[styles.button,AdminStyles.successColor,]}>
                <Text style={styles.buttonText}>Cập nhật</Text>
              </TouchableOpacity>
              
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
      backgroundColor:"#4F959D",
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
      backgroundColor:"#4F959D",
      borderRadius: 10,
    },
    button: {
      backgroundColor: '#aed1fc',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      flex:1,
      // justifyContent: "center",
      alignItems: "center"
    },
    buttonText: {
      fontWeight: '600',
      color: '#000',
    },
  });