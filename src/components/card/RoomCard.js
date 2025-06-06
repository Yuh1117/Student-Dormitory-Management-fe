import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { useState } from 'react';
import AdminStyles from '../../styles/AdminStyles';

export const RoomCard = ({room}) => {
  const isAvailable = room.status === 'Empty';
  return (
    <Card
      key={room.id}
      style={[
        styles.container,
        isAvailable && {...AdminStyles.roomBgColor },
      ]}
    >
      <Card.Title
        title = {`Phòng ${room.room_number}`}
        subtitle={`Phòng máy lạnh, ${room.total_beds} giường`}
        left={(props) => <Avatar.Icon {...props} icon="home" style={AdminStyles.iconRoomColor}/>}
        right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
      />
      <Card.Content>
        <Text>{`Giá: ${room.monthly_fee}đ/tháng`}</Text>
        <Text>{isAvailable ? 'Trạng thái: Còn trống': 'Trạng thái: Đã đủ'}</Text>
      </Card.Content>
    </Card>
  )
};
const styles = StyleSheet.create({
  container: {
    width: 350,
    marginTop: 20,
  },
  icon:{
    color: 'red',
  }
  
})

